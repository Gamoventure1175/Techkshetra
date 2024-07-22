import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';

import prisma from '@/libs/prisma';

import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { compare } from 'bcryptjs';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your-email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorizing credentials:', credentials);
        
        // Check if user exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('No user found with the given email');
          throw new Error('No user found with the given email');
        }

        // Compare passwords
        const isValidPassword = await compare(credentials.password, user.password);

        if (!isValidPassword) {
          console.log('Invalid credentials');
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    newUser: '/auth/signup',  // Will disable new account creation
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'database',
  },
  callbacks: {
    async session({ session, user }) {
      console.log('Session callback:', { session, user });
      if (user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { user, account, profile });
      // Handle user creation for OAuth providers
      if (account?.provider === 'google' && user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
  
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: user.emailVerified || null,
            },
          });
        }
      }
      return true;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };

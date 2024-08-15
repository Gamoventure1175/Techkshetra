import { getServerSession } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            userType: true,
            studentId: true,
            emailVerified: true,
          },
        });

        if (user) {
          if (!user.emailVerified) {
            throw new Error('Email not verified');
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return user;
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('User does not exist');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.emailVerified = token.emailVerified;
      session.user.userType = token.userType;
      session.user.studentId = token.studentId;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.userType = user.userType;
        token.studentId = user.studentId;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function POST(request) {
  try {
    const { currentPassword, newPassword } = await request.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return NextResponse.json({ message: 'Current password is incorrect' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

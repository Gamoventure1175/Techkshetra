'use server'

import bcrypt from 'bcryptjs';
import prisma from '@/libs/prisma';
import { sendVerificationEmail } from '@/libs/email';

export async function signUp({ email, password }) {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      emailVerified: false,  // Set email as unverified
    },
  });

  // Send verification email
  await sendVerificationEmail(user.email);

  return user;
}

'use server'

import bcrypt from 'bcryptjs';
import prisma from '@/libs/prisma';

export async function signIn({ email, password }) {
  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Incorrect password');
  }

  // Check if email is verified
  if (!user.emailVerified) {
    throw new Error('Email not verified');
  }

  return user;
}

'use server'

import prisma from '@/libs/prisma';

export async function verifyEmail(token, email) {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token,
    },
  });

  if (!verificationToken) {
    throw new Error('Invalid or expired verification token');
  }

  // Update user emailVerified status
  await prisma.user.update({
    where: { email },
    data: { emailVerified: true },
  });

  // Delete the verification token after verification
  await prisma.verificationToken.delete({
    where: {
      identifier: email,
    },
  });
}

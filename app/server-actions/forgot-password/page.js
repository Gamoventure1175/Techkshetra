'use server';

import prisma from '@/libs/prisma';
import { sendPasswordResetEmail } from '@/libs/email';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const token = crypto.randomBytes(20).toString('hex');
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordTokenExpiry: new Date(resetTokenExpiry),
    },
  });

  await sendPasswordResetEmail(email, token);

  return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
}

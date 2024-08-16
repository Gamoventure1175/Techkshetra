'use server';

import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { token, password } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'Token is invalid or expired' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  });

  return NextResponse.json({ message: 'Password has been reset' }, { status: 200 });
}

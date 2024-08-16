'use server';

import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { currentPassword, newPassword } = await request.json();
    const session = await getServerSession();

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

import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'; // Import if using Next.js 13+ (for API routes)



export async function POST(req) {
    

  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ error: 'User already exists' }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    return new NextResponse(
      JSON.stringify({ message: 'User created', user: newUser }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}

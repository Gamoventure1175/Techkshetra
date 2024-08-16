import bcrypt from 'bcrypt';
import prisma from '@/libs/prisma';

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createPasswordResetToken = async (email) => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(token, 10);

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpires: new Date(Date.now() + 3600000), 
    },
  });

  return token;
};

export const resetPassword = async (token, newPassword) => {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordTokenExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error('Token is invalid or has expired');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpires: null,
    },
  });
};

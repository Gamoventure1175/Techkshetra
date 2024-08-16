'use server'

import { sendResetPasswordEmail } from '@/libs/email';
import { getUserByEmail, createPasswordResetToken } from '@/libs/user';

export async function sendForgotPasswordEmail(email) {
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: 'User does not exist' };
  }

  const token = await createPasswordResetToken(user.id);
  await sendResetPasswordEmail(email, token);

  return { success: true };
}

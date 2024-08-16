'use server'

import { resetPassword } from '@/libs/user';

export async function handleResetPassword(token, password) {
  const result = await resetPassword(token, password);

  if (result.error) {
    return { error: result.error };
  }

  return { success: true };
}

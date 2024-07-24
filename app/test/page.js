// app/components/ClientComponent.js
"use client";

import { useSession } from 'next-auth/react';

export default function ClientComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      {session ? (
        <p>Welcome back, {session.user.email}!</p>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
};
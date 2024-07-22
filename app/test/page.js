'use client'

import { useSession } from "next-auth/react";

const MyComponent = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not signed in</div>;

  return <div>Welcome, {session.user.email} </div>;
};

export default MyComponent;

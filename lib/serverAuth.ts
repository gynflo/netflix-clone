import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

export async function serverAuth(req: NextApiRequest) {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error("Vous n'etes pas connecté");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Vous n'etes pas connecté");
  }

  return { currentUser };
}

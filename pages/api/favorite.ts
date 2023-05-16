import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import { serverAuth } from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);
      const { movieId: id } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id,
        },
      });
      if (!existingMovie) {
        throw new Error("Invalide ID");
      }
      //Push movieId in User FavoriteIds
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: id,
          },
        },
      });

      return res.status(201).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);
      const { movieId: id } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id,
        },
      });
      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, id);
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(202).json(updatedUser);
    }
    
    // if req.method !== "DELETE & POST"
    return res.status(405).end();
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}

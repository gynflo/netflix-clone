import axios from "axios";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFavorites } from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { useCallback, useMemo } from "react";
import clsx from "clsx";

interface FavoriteButtonProps {
  movieId: string;
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFavorites } = useFavorites();

  const isFavoriteMovie = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavoriteMovie) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }
    const updateFavoriteIds = response?.data?.favoriteIds;

    mutateCurrentUser({
      ...currentUser,
      favoritesIds: updateFavoriteIds,
    });

    mutateFavorites();
  }, [
    isFavoriteMovie,
    movieId,
    currentUser,
    mutateCurrentUser,
    mutateFavorites,
  ]);

  const Icon = isFavoriteMovie ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
      onClick={() => {
        toggleFavorites();
      }}
    >
      <Icon
        className={(clsx(isFavoriteMovie && "text-green"), "text-white")}
        size={25}
      />
    </div>
  );
}

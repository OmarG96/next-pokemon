import { SmallPokemon } from "../interfaces";

const toggleFavoritePokemon = (data: SmallPokemon) => {
  const favorites: SmallPokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "{}"
  );

  if (favorites[data.id]) {
    delete favorites[data.id];
  } else {
    favorites[data.id] = data;
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const isFavoritePokemon = (id: number) => {
  if (typeof window === "undefined") return false;

  const favorites: SmallPokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "{}"
  );

  return !!favorites[id];
};

const favoritesPokemon = (): SmallPokemon[] => {
  if (typeof window === "undefined") return [];

  const favorites: SmallPokemon[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  return Object.values(favorites);
};

export { toggleFavoritePokemon, isFavoritePokemon, favoritesPokemon };

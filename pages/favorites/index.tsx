import { ReactElement, useEffect, useState } from "react";
import { Page } from "../../types";
import { Layout } from "../../components/layouts";
import { EmptyFavorites } from "../../components/ui";
import { favoritesPokemon } from "../../utils";
import { SmallPokemon } from "../../interfaces";
import { PokemonList } from "../../components/pokemon";

const Favorites: Page = () => {
  const [pokemons, setPokemons] = useState<SmallPokemon[]>([]);

  useEffect(() => {
    setPokemons(favoritesPokemon());
  }, []);

  return (
    <>
      {pokemons.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </>
  );
};

Favorites.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Pokémon List">{page}</Layout>;
};

export default Favorites;

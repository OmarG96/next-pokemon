import { ReactElement } from "react";
import { Layout } from "../components/layouts";
import { GetStaticProps } from "next";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { Page } from "../types";
import { PokemonList } from "../components/pokemon";

interface HomeProps {
  pokemons: SmallPokemon[];
}

const Home: Page<HomeProps> = ({ pokemons }) => {
  return <PokemonList pokemons={pokemons} />;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    data: { results },
  } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = results.map((element, index) => ({
    ...element,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Pokémon List">{page}</Layout>;
};

export default Home;

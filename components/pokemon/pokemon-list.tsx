import { Grid } from "@nextui-org/react";
import { FC } from "react";
import { SmallPokemon } from "../../interfaces";
import { PokemonItem } from "./pokemon-item";

interface PokemonList {
  pokemons: SmallPokemon[];
}

export const PokemonList: FC<PokemonList> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((element) => (
        <PokemonItem key={element.id} {...element} />
      ))}
    </Grid.Container>
  );
};

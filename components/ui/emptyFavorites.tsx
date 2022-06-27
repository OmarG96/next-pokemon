import { Container, Image, Text } from "@nextui-org/react";

export const EmptyFavorites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        alt="app icon"
        width={150}
      />
      <Text h1> You did not add any Pokémon to favorites </Text>
    </Container>
  );
};

import { ReactElement, useEffect, useState } from "react";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps } from "next";
import confetti from "canvas-confetti";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { Page } from "../../types";
import { isFavoritePokemon, toggleFavoritePokemon } from "../../utils";
import { getPokemonInfo } from "../../utils/getPokemonInfo";

const Pokemon: Page<Pokemon> = (data) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isFavoritePokemon(data.id));
  }, [data.id]);

  const onToggleFavorite = () => {
    toggleFavoritePokemon({
      id: data.id,
      image: data.sprites.other?.dream_world.front_default || "",
      name: data.name,
      url: data.species.url,
    });
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Grid.Container
      css={{
        marginTop: "5px",
      }}
      gap={2}
    >
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{ padding: "30px" }}>
          <Card.Body>
            <Card.Image
              src={
                data.sprites.other?.dream_world.front_default || "/no-image.png"
              }
              alt={data.name}
              width="100%"
              height="200px"
            />
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={8}>
        <Card css={{ padding: "12px 32px" }}>
          <Card.Header
            css={{ display: "flex", justifyContent: "space-between" }}
          >
            <Text h1 transform="capitalize">
              {data.name}
            </Text>
            <Button
              color="gradient"
              ghost={!isFavorite}
              onClick={onToggleFavorite}
            >
              {isFavorite ? " Favorite Pok??mon" : "Add to favorites"}
            </Button>
          </Card.Header>
          <Card.Body>
            <Text size={30}>Sprites</Text>
            <Container display="flex" direction="row">
              <Image
                src={data.sprites.front_default}
                alt={data.name}
                width="100px"
                height="100px"
              />
              <Image
                src={data.sprites.back_default}
                alt={data.name}
                width="100px"
                height="100px"
              />
              <Image
                src={data.sprites.front_shiny}
                alt={data.name}
                width="100px"
                height="100px"
              />
              <Image
                src={data.sprites.back_shiny}
                alt={data.name}
                width="100px"
                height="100px"
              />
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

Pokemon.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={page.props.children.props.name || "Pok??mon App"}>
      {page}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const pokemonIds = Array(151)
    .fill(null)
    .map((element, index) => `${index + 1}`);

  return {
    paths: pokemonIds.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemonInfo = await getPokemonInfo(id);

  if (!pokemonInfo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: pokemonInfo,
    revalidate: 3000,
  };
};

export default Pokemon;

import { FC, ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<LayoutProps> = ({
  children,
  title = "Pokémon App",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Omar Garay" />
        <meta
          name="description"
          content={`Information about the pokémon ${title}`}
        />
        <meta name="keywords" content={`XXXX, pokémon, pokedex, ${title}`} />

        <meta
          property="og:title"
          content={`Information about the pokémon ${title}`}
        />
        <meta
          property="og:description"
          content={`Information about the pokémon ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};

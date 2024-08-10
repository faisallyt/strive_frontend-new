import Container from "@/app/components/Common/Container";
import React, { useEffect } from "react";

export default function Home({ setLoader = (t: boolean) => {} }) {
  useEffect(() => {
    setLoader(false);
    return () => {
      setLoader(true);
    };
  }, []);
  return (
    <>
      <Container
        showStories={true}
      />
      <Container
        height="100%"
        title="Games for you"
        showGames={true}
      />
    </>
  );
}

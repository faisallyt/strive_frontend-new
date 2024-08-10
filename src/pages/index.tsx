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
        height="16rem"
        width="100%"
        imageUrl="/landingPagePoster.png" // updated prop name
        
      />
      <Container
        height="32rem"
        width="100%"
        title="Games For You"
        //content="Content for the second container goes here..."
        showGames={true}
        style={{backgroundColor:'#12141C'}}
      />
    </>
  );
}

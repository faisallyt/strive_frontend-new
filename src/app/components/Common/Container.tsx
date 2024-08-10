import React from 'react';
import Image from "next/image";
import landingPagePoster from '../../../app/assets/landingPagePoster/landingPagePoster.png';
import mines from '../../../app/assets/games/mines.png';
import nimo from '../../../app/assets/games/nimo.png';
import crash from '../../../app/assets/games/crash.png';
import dicey from '../../../app/assets/games/dicey.png';
import Link from 'next/link';

interface ContainerProps {
  title?: string;
  height?: string;
  width?: string;
  content?: string;
  showStories?: boolean;
  showGames?: boolean;
  imageUrl?: string; // updated prop name
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  title = "",
  height = "auto",
  width = "auto",
  content = "",
  showStories = false,
  showGames = false,
  imageUrl = "",
  style ={},
}) => {
  const gameImages = [
    {src:mines, link: "/games/mines"},
    {src:nimo, link:"/games/nimo"},
    {src:crash, link:"/games/crash"},
    {src:dicey, link:"/games/dicey"}
  ];

  return (
    <div className="rounded-xl p-1 mt-[-0.75rem] " style={{ ...style, height, width }}>
      <h2 className="text-white text-lg font-bold ">{title}</h2>
      {imageUrl && <Image src={landingPagePoster} alt="logo"  />}
      <p className="text-white">{content}</p>
      {showStories && (
        <div className="flex flex-row justify-around gap-2 mt-2 ">
          {[...Array(10)].map((_, index) => (
            <div 
            key={index} 
            className="h-23 w-23 bg-[#11112B] rounded-full border-2 border-[#9562FF] flex items-center justify-center"
          >
              <div
                key={index}
                className="h-21 w-21 bg-[#34374E] rounded-full flex items-center justify-center" 
                >

              </div>  
            
          </div>
          ))}
        </div>
      )}
      {showGames && (
        <div className="flex flex-row justify-around gap-2 mt-2">
        {gameImages.map((game, index) => (
          <Link href={game.link} key={index}>
            <div className="relative h-60 w-60 bg-[#34374E] rounded-lg m-1 cursor-pointer">
              <Image
                src={game.src}
                alt={`Game ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </Link>
        ))}
      </div>
    )}
    </div>
  );
};

export default Container;

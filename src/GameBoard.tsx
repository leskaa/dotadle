import React from "react";
import BoardRow from "./BoardRow";
import Hero from "./types/hero";
import EmptyBoardRow from "./EmptyBoardRow";

type GameBoardProps = {
  guessedHeroes: Hero[];
};

const GameBoard = ({ guessedHeroes }: GameBoardProps) => {
  return (
    <div className="mt-4 mb-8">
      <div className="flex place-content-center">
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Hero
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Attribute
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Gender
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Range Type
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Races
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Legs
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Release Year
        </h2>
      </div>
      {guessedHeroes.length === 0 && <EmptyBoardRow />}
      {guessedHeroes // Create a shallow copy of prop and reverse order
        .slice(0)
        .reverse()
        .map((hero) => (
          <BoardRow
            key={hero.id}
            heroName={hero.heroName}
            imageName={hero.heroImageName}
            attribute={hero.attribute}
            gender={hero.gender}
            rangeType={hero.rangeType}
            race={hero.race}
            legs={hero.legs}
            releaseYear={hero.releaseYear}
          />
        ))}
    </div>
  );
};

export default GameBoard;

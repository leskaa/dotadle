import React from "react";
import BoardRow from "./BoardRow";
import Hero from "./types/hero";
import EmptyBoardRow from "./EmptyBoardRow";

type GameBoardProps = {
  guessedHeroes: Hero[];
};

const GameBoard = ({ guessedHeroes }: GameBoardProps) => {
  return (
    <div className="mt-4 mb-4">
      <div className="flex place-content-center">
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Hero
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Attribute
        </h2>
        <div className="relative group">
          <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
            Lane(s)<div className="ordinal text-slate-400">&nbsp;*</div>
          </h2>
          <div className="absolute hidden group-hover:block duration-200 -right-6 -top-2 z-10 text-white border bg-slate-800 text-xs p-1 w-40 rounded-md">
            Lanes in which the hero appears in over <strong>20%</strong> of
            matches (Patch 7.32)
          </div>
        </div>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Gender
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Range Type
        </h2>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Species
        </h2>
        <div className="relative group">
          <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
            Complexity<div className="ordinal text-slate-400">&nbsp;*</div>
          </h2>
          <div className="absolute hidden group-hover:block duration-200 -right-10 -top-2 z-10 text-white border bg-slate-800 text-xs p-1 w-48 rounded-md">
            Valve determined complexity rating from 1-3 (Easy, Medium, Hard)
          </div>
        </div>
        <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
          Legs
        </h2>
        <div className="relative group">
          <h2 className="text-slate-200 whitespace-nowrap font-bold text-sm w-28 m-1 p-1 border-b-4 flex justify-center items-center">
            Release Year<div className="ordinal text-slate-400">&nbsp;*</div>
          </h2>
          <div className="absolute hidden group-hover:block duration-200 pl-2 -right-2 -top-2 z-10 text-white border bg-slate-800 text-xs p-1 w-36 rounded-md">
            Year the hero first appeared in a dota game (2004 -{" "}
            {new Date().getFullYear()})
          </div>
        </div>
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
            lanes={hero.lanes}
            gender={hero.gender}
            rangeType={hero.rangeType}
            race={hero.race}
            complexity={hero.complexity}
            legs={hero.legs}
            releaseYear={hero.releaseYear}
          />
        ))}
    </div>
  );
};

export default GameBoard;

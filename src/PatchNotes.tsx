import React, { useState } from "react";
import upDownArrow from "./assets/up-down-arrow.svg";

const PatchNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-[390px]:hidden">
      <a
        className={`${
          isOpen ? "right-[186px]" : "-right-[69px]"
        } absolute z-10 pt-1 pr-4 pl-2 pb-0 top-16 transform -rotate-90 text-slate-200 select-none text-lg font-semibold border-l border-t bg-slate-800 rounded-tl-md hover:bg-slate-700`}
        onClick={() => setIsOpen(!isOpen)}
      >
        PATCH NOTES
        <span className="absolute right-0 -translate-x-2 translate-y-[0.45rem]">
          <img src={upDownArrow} className="w-3 h-3" />
        </span>{" "}
        &nbsp;
      </a>
      <div
        className={`${
          isOpen ? "right-0" : "-right-64"
        } absolute z-10 top-0 w-64 h-[34rem] px-4 text-slate-200 border-l border-b border-slate-200 rounded-bl-md bg-slate-800`}
      >
        <h2 className="mt-3 text-md text-center font-semibold underline">
          Wednesday, April 12
        </h2>
        <ul className="text-center">
          <li className="text-xs m-1">
            Start of{" "}
            <em className="text-xs font-bold italic text-red-600 mr-1">
              DOTADLE
            </em>
            <strong>Season 1</strong>
          </li>
          <li className="text-xs m-1">
            New heroes each day from{" "}
            <strong>
              April 12<sup>th</sup>
            </strong>{" "}
            to{" "}
            <strong>
              August 14<sup>th</sup>
            </strong>
          </li>
          <li className="text-xs m-1">
            <strong>Lane(s)</strong> has been replaced with{" "}
            <strong>Position(s)</strong>
          </li>
        </ul>
        <h2 className="text-md text-center font-semibold underline">
          Thursday, April 13
        </h2>
        <ul className="text-center">
          <li className="text-xs m-1">
            <strong>Death Prophet</strong> is now <strong>Elf Undead</strong>{" "}
            (formerly <strong>Human Undead</strong>)
          </li>
        </ul>
        <h2 className="text-md text-center font-semibold underline">
          Tuesday, April 18
        </h2>
        <ul className="text-center">
          <li className="text-xs m-1">
            Removed <strong>Range Type</strong> from categories to increase
            difficulty
          </li>
        </ul>
        <h2 className="text-md text-center font-semibold underline">
          Thursday, April 20
        </h2>
        <ul className="text-center">
          <li className="text-xs m-1">
            Daily question now rotates at <strong>Midnight Central Time</strong>
          </li>
          <li className="text-xs m-1">
            <strong>Luna</strong> is now <strong>Human, Beast, Cat</strong>{" "}
            (formerly <strong>Human</strong>)
          </li>
          <li className="text-xs m-1">
            <strong>Phantom Assassin</strong> is now <strong>Human</strong>{" "}
            (formerly <strong>Elf</strong>)
          </li>
          <li className="text-xs m-1">
            <strong>31</strong> heroes are now <strong>Universal</strong>{" "}
            Attribute
          </li>
          <li className="text-xs m-1">
            <strong>Ogre Magi</strong> is now <strong>Strength</strong>{" "}
            Attribute (formerly <strong>Intelligence</strong>)
          </li>
        </ul>
        <h2 className="text-md text-center font-semibold underline">
          Tuesday, May 2
        </h2>
        <ul className="text-center">
          <li className="text-xs m-1">
            <strong>Position(s)</strong> updated to match initial 7.33
            Dota2ProTracker release
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatchNotes;

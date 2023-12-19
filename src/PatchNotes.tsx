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
        } absolute z-10 top-0 w-64 h-[16rem] px-4 text-slate-200 border-l border-b border-slate-200 rounded-bl-md bg-slate-800`}
      >
        <h2 className="mt-5 text-md text-center font-semibold underline">
          Tuesday, December 19
        </h2>
        <ul className="text-center">
          <li className="text-xs m-1">
            Start of{" "}
            <em className="text-xs font-bold italic text-red-600 mr-1">
              DOTADLE
            </em>
            <strong>Season 3</strong>
          </li>
          <li className="text-xs m-1">
            New heroes each day from{" "}
            <strong>
              December 19<sup>th</sup>
            </strong>{" "}
            to{" "}
            <strong>
              April 25<sup>th</sup> 2025
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PatchNotes;

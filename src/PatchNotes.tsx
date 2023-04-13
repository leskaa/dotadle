import React, { useState } from "react";

const PatchNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <a
        className={`${
          isOpen ? "right-[188px]" : "-right-[68px]"
        } absolute z-10 pt-1 pr-0 pl-2 pb-0 top-16 transform -rotate-90 text-slate-200 select-none text-lg font-semibold border-l border-t bg-slate-800 rounded-tl-md hover:bg-slate-700`}
        onClick={() => setIsOpen(!isOpen)}
      >
        PATCH NOTES &#8597; &nbsp;
      </a>
      <div
        className={`${
          isOpen ? "right-0" : "-right-64"
        } absolute z-10 top-0 w-64 h-52 px-4 text-slate-200 border-l border-b border-slate-200 rounded-bl-md bg-slate-800`}
      >
        <h2 className="mt-2 text-md text-center font-semibold underline">
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
      </div>
    </div>
  );
};

export default PatchNotes;

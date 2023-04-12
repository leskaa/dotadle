import React from "react";

const PatchNotes = () => {
  return (
    <div className="absolute z-10 top-0 right-0 w-60 h-36 px-4 text-slate-200 border-l border-b border-slate-200 rounded-bl-md bg-slate-800">
      <h2 className="text-lg text-center m-2 font-semibold">Patch Notes</h2>
      <h2 className="text-md text-center font-semibold underline">
        Tuesday, April 12
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
      </ul>
    </div>
  );
};

export default PatchNotes;

import React from "react";

type BoxProps = {
  color: string;
  content: string;
  isImage?: boolean;
  isMultiline?: boolean;
  displayName?: string;
};

export const Box = ({
  color,
  content,
  isImage,
  isMultiline,
  displayName,
}: BoxProps) => {
  const imageURL = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${content}.png`;

  return (
    <div
      className={`border m-1 w-28 h-16 flex justify-center items-center text-slate-200 font-semibold leading-none ${color} ${
        isMultiline && "text-center"
      } ${isImage && "bg-slate-800"} ${
        // Resize text if it's multiline and has a line longer than 10 characters
        isMultiline &&
        content.split("\n").some((line) => line.length > 10) &&
        "text-sm"
      }`}
    >
      {isImage ? (
        <div className="relative m-0 p-0">
          <img
            src={imageURL}
            alt={content}
            className="object-cover z-10 hover:opacity-25 relative"
          ></img>
          <h3 className="absolute hover:z-20 top-1/2 left-0 right-0 -translate-y-1/2 text-center text-md text-white">
            {displayName}
          </h3>
        </div>
      ) : (
        content
      )}
    </div>
  );
};

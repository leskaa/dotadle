import React from "react";
import Colors from "./types/colors";
import { Box } from "./Box";

const EmptyBoardRow = () => {
  return (
    <div className="flex place-content-center">
      <div className="flex flex-row max-w-fit">
        <Box color={Colors.EMPTY} content="" />
        <Box color={Colors.EMPTY} content="" />
        <Box color={Colors.EMPTY} content="" />
        <Box color={Colors.EMPTY} content="" />
        <Box color={Colors.EMPTY} content="" />
        <Box color={Colors.EMPTY} content="" />
        <Box color={Colors.EMPTY} content="" />
        <Box color={Colors.EMPTY} content="" />
      </div>
    </div>
  );
};

export default EmptyBoardRow;

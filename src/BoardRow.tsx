import React from "react";
import { Box } from "./Box";
import Colors from "./types/colors";
import Hero from "./types/hero";
import options from "./datasets/heroData.json";
import answers from "./datasets/answerIds.json";

type BoardRowProps = {
  heroName: string;
  imageName: string;
  attribute: string;
  lanes: string[];
  gender: string;
  rangeType: string;
  race: string[];
  complexity: string;
  legs: number;
  releaseYear: number;
};

const correctAnswerId =
  answers[
    Math.floor(
      Math.abs(new Date().getTime() - new Date(2023, 3, 10).getTime()) /
        (1000 * 3600 * 24)
    )
  ];

const checkIfListsMatch = (
  correctList: string[],
  guessedList: string[]
): Colors => {
  if (correctList.sort().join(",") === guessedList.sort().join(",")) {
    return Colors.CORRECT;
  } else if (correctList.some((role) => guessedList.includes(role))) {
    return Colors.PARTIAL;
  } else {
    return Colors.INCORRECT;
  }
};

const getRelativeYearArrow = (
  correctReleaseYear: number,
  guessedReleaseYear: number
) => {
  if (correctReleaseYear === guessedReleaseYear) {
    return " ";
  } else if (correctReleaseYear > guessedReleaseYear) {
    return " ↑";
  } else {
    return " ↓";
  }
};

const convertListToString = (list: string[]) => {
  return list.toString().replaceAll(",", "\n");
};

const BoardRow = ({
  heroName,
  imageName,
  attribute,
  lanes,
  gender,
  rangeType,
  race,
  complexity,
  legs,
  releaseYear,
}: BoardRowProps) => {
  const correctAnswer: Hero = options[correctAnswerId];

  return (
    <div className="flex place-content-center">
      <div className="flex flex-row max-w-fit">
        <Box
          color={Colors.CORRECT}
          content={imageName}
          isImage={true}
          displayName={heroName}
        />
        <Box
          color={
            correctAnswer.attribute === attribute
              ? Colors.CORRECT
              : Colors.INCORRECT
          }
          content={attribute}
        />
        <Box
          color={checkIfListsMatch(correctAnswer.lanes, lanes)}
          content={convertListToString(lanes)}
          isMultiline={true}
        />
        <Box
          color={
            correctAnswer.gender === gender ? Colors.CORRECT : Colors.INCORRECT
          }
          content={gender}
        />
        <Box
          color={
            correctAnswer.rangeType === rangeType
              ? Colors.CORRECT
              : Colors.INCORRECT
          }
          content={rangeType}
        />
        <Box
          color={checkIfListsMatch(correctAnswer.race, race)}
          content={convertListToString(race)}
          isMultiline={true}
        />
        <Box
          color={
            correctAnswer.complexity === complexity
              ? Colors.CORRECT
              : Colors.INCORRECT
          }
          content={complexity}
        />
        <Box
          color={
            correctAnswer.legs === legs ? Colors.CORRECT : Colors.INCORRECT
          }
          content={legs.toString()}
        />
        <Box
          color={
            correctAnswer.releaseYear === releaseYear
              ? Colors.CORRECT
              : Colors.INCORRECT
          }
          content={
            releaseYear.toString() +
            getRelativeYearArrow(correctAnswer.releaseYear, releaseYear)
          }
        />
      </div>
    </div>
  );
};

export default BoardRow;

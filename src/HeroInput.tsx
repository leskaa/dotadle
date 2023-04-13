import React, { useState } from "react";
import options from "./datasets/heroData.json";
import Hero from "./types/hero";

type HeroInputProps = {
  handleGuessSubmission: (heroName: string) => void;
  guessedHeroes: Hero[];
};

type Option = {
  id: number;
  heroId: number;
  heroName: string;
  heroImageName: string;
  attribute: string;
  gender: string;
  roles: string[];
  rangeType: string;
  legs: number;
  releaseYear: number;
};

const convertHeroNameToImageURL = (heroImageName: string) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroImageName}.png`;
};

const HeroInput = ({
  handleGuessSubmission,
  guessedHeroes,
}: HeroInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filteredOptions = options.filter(
      (option) =>
        // Remove hereos that are already guessed from the suggestions
        !guessedHeroes.some((hero) => hero.id === option.id) &&
        // Filter options based on the input value
        option.heroName.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
  };

  const handleOnFocus = () => {
    const guessesRemovedOptions = filteredOptions.filter(
      (option) =>
        // Remove hereos that are already guessed from the suggestions
        !guessedHeroes.some((hero) => hero.id === option.id)
    );
    setFilteredOptions(guessesRemovedOptions);
    setShowOptions(true);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      options.filter(
        (option) => option.heroName.toLowerCase() === inputValue.toLowerCase()
      ).length > 0
    ) {
      const guessText = inputValue;
      setInputValue("");
      setShowOptions(false);
      handleGuessSubmission(guessText);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (
      options.filter(
        (option) => option.heroName.toLowerCase() === inputValue.toLowerCase()
      ).length > 0
    ) {
      const guessText = inputValue;
      setInputValue("");
      setShowOptions(false);
      handleGuessSubmission(guessText);
    } else {
      alert("Invalid hero name!");
    }
    event.preventDefault();
  };

  const handleOptionMouseDown = (event: React.MouseEvent<HTMLLIElement>) => {
    const optionValue = event.currentTarget.getAttribute("data-value")!;
    setInputValue(optionValue);
    setShowOptions(false);
    event.preventDefault();
  };

  const handleInputBlur = () => {
    setShowOptions(false);
  };

  return (
    <div className="mt-2 mb-2 mx-auto container flex justify-center items-center">
      <div className="flex items-center justify-center">
        <div className="w-64 sm:w-80 relative">
          <input
            type="text"
            value={inputValue}
            placeholder="Type hero name..."
            onChange={handleInputChange}
            onFocus={handleOnFocus}
            onKeyDown={handleOnKeyDown}
            onBlur={handleInputBlur}
            className="w-full h-10 px-4 py-2 border bg-slate-800 border-gray-300 text-slate-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-600 focus:border-amber-600 sm:text-sm"
          />
          <div className="absolute top-1 right-1">
            <a onClick={handleButtonClick}>
              <svg
                className="fill-slate-200 hover:fill-slate-300 active:fill-amber-600 w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
              </svg>
            </a>
          </div>
          {showOptions && (
            <ul className="absolute z-20 w-full py-1 mt-1 overflow-auto bg-slate-800 rounded-md shadow-lg max-h-60">
              {filteredOptions
                .sort((a, b) => ("" + a.heroName).localeCompare(b.heroName))
                .map((option) => (
                  <li
                    key={option.id}
                    data-value={option.heroName}
                    onMouseDown={handleOptionMouseDown}
                    className="px-4 py-1 text-sm text-slate-200 cursor-pointer hover:bg-slate-900"
                  >
                    <img
                      src={convertHeroNameToImageURL(option.heroImageName)}
                      alt={option.heroImageName}
                      className="object-cover w-12 pr-1 inline"
                    ></img>
                    {option.heroName}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroInput;

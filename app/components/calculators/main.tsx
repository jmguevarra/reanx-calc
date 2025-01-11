"use client";

import { evaluate, format } from "mathjs";
import React, { useContext, useState } from "react";
import CalculatorDrawerLogs from "./drawer-logs";
import {
  ARITHMETIC_OPERATORS,
  CALCULATOR_CHARACTERS,
  CALCULATOR_OPERATORS,
} from "@/app/utils/constant/calculator";
import CalculatorContext from "@/app/utils/context/calculator";
import { ICalculatorLog } from "@/app/utils/interfaces/calculator";

const CalculatorMain = () => {
  //descructuring context properties
  const {
    input,
    setInput,
    calculatedValue,
    setCalculatedValue,
    setLogs,
    logs,
  } = useContext(CalculatorContext);

  const [isComputed, setIsComputed] = useState<boolean>(false);

  const handleClick = (value: string) => {
    const lastChar = input.charAt(input.length - 1);

    // no number yet and clicked operator
    if (input.length < 1 && CALCULATOR_OPERATORS.includes(value)) return;

    //if lastcharter and inputted button is the same
    if (lastChar === value && CALCULATOR_OPERATORS.includes(lastChar))
      return null;

    //change arithmetic operator
    if (
      ARITHMETIC_OPERATORS.includes(value) &&
      ARITHMETIC_OPERATORS.includes(lastChar)
    ) {
      return setInput(input.slice(0, -1) + value);
    }

    // if the value is computed then set this actions
    if (isComputed && ARITHMETIC_OPERATORS.includes(value) && calculatedValue) {
      setIsComputed(false);
      setInput(calculatedValue + value);
      setCalculatedValue("");
      return;
    }

    //proceed to some action
    if (value === "=") {
      try {
        //empty the calculatedValue if input is become empty
        if (!input) return setCalculatedValue("");

        //check if the last character is operato except the module operator
        if (
          CALCULATOR_OPERATORS.includes(lastChar) &&
          !CALCULATOR_OPERATORS.includes("%")
        )
          return;

        //replace x string and divided symbol by real arithmetic characters
        let convertedString = input.replace(/×/g, "*").replace(/÷/g, "/");
        const result = evaluate(convertedString);

        //set percistion and formating to auto
        const precision = result % 1 === 0 ? 6 : 2;
        const formattedResult = format(result, {
          notation: "auto",
          precision: precision,
        });

        setCalculatedValue(formattedResult);
        const logInfo: ICalculatorLog = {
          input: input,
          computed: formattedResult,
          datetime: new Date(),
        };
        setLogs([...logs, logInfo]);
        setIsComputed(true);
      } catch (error) {
        console.error("Error: ", error);
      }
    } else if (value === "C") {
      // Clearing the input and calculated fields
      setInput("");
      setCalculatedValue("");
      setIsComputed(false);
    } else if (value === "⌫") {
      //remove last character
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="flex  flex-col justify-center items-center h-screen">
      <h1 className="text-orange-500 font-bold mb-10 text-4xl">
        Reanx Context Calculator
      </h1>
      <div className="w-80 px-6 pt-20 pb-2 rounded-2xl bg-black shadow-lg relative overflow-hidden min-h-[532px]">
        {/* Display */}
        <div className="text-right text-white mb-4">
          <div
            className={`${
              isComputed ? "scale-50 opacity-70" : "scale-100 opacity-100"
            } mb-1 text-4xl font-bold transform origin-right transition-transform duration-500`}
          >
            {input || "0"}
          </div>
          <div className="text-4xl font-bold transition duration-500">
            {calculatedValue || ""}
          </div>
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {CALCULATOR_CHARACTERS.map((btn: string) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`text-xl font-semibold w-14 h-14 rounded-full flex justify-center items-center ${
                btn === "="
                  ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                  : btn === "C"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
        <CalculatorDrawerLogs></CalculatorDrawerLogs>
      </div>
    </div>
  );
};

export default CalculatorMain;

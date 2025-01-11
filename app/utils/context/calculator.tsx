import React, { Dispatch, SetStateAction } from "react";
import { ICalculatorLog } from "../interfaces/calculator";

//initialize interface property
interface props {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  calculatedValue: string;
  setCalculatedValue: Dispatch<SetStateAction<string>>;
  logs: ICalculatorLog[];
  setLogs: Dispatch<SetStateAction<ICalculatorLog[]>>;
}

//create context and export it
const CalculatorContext = React.createContext<props>({
  input: "",
  setInput: () => {},
  calculatedValue: "",
  setCalculatedValue: () => {},
  logs: [],
  setLogs: () => {},
});

export default CalculatorContext;

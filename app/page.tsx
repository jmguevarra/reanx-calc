"use client";

import { useEffect, useState } from "react";
import { ICalculatorLog } from "./utils/interfaces/calculator";
import CircularLoader from "./components/Loaders/circular-loader";
import CalculatorContext from "./utils/context/calculator";
import CalculatorMain from "./components/calculators/main";

const Home = () => {
  const [input, setInput] = useState("");
  const [calculatedValue, setCalculatedValue] = useState("");
  const [logs, setLogs] = useState<ICalculatorLog[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <CircularLoader />;

  return (
    <>
      <CalculatorContext.Provider
        value={{
          input,
          setInput,
          calculatedValue,
          setCalculatedValue,
          logs,
          setLogs,
        }}
      >
        <CalculatorMain />
      </CalculatorContext.Provider>
    </>
  );
};

export default Home;

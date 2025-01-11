"use client";

import CalculatorContext from "@/app/utils/context/calculator";
import { ICalculatorLog } from "@/app/utils/interfaces/calculator";
import { format } from "date-fns";
import { Fragment, useContext, useState } from "react";

const CalculatorDrawerLogs = () => {
  const { logs } = useContext(CalculatorContext);
  const [showLogger, setShowLogger] = useState<boolean>(false);

  return (
    <div
      id="drawer-logs"
      className={`bg-black w-full transition duration-800  ${
        showLogger ? "absolute left-0 bottom-0 h-auto" : "h-[20px]"
      }`}
    >
      <div
        onClick={() => {
          setShowLogger(!showLogger);
        }}
        id="drawer-toggler"
        className="text-center mt-10 opacity-50 hover:opacity-100 cursor-pointer transform transition-transform duration-500 hover:-translate-y-2"
      >
        <div className="w-8 h-[2px] rounded-full bg-slate-400 mb-1 mx-auto"></div>
        <div className="w-12 h-1 rounded-full bg-slate-400 mx-auto"></div>
      </div>
      <div
        id="logs"
        className={`custom-scroll  px-3 transition-all duration-500 ${
          showLogger ? "max-h-72 py-3" : "max-h-0 p-0 overflow-hidden"
        }`}
      >
        {logs.length > 0 ? (
          logs.map((log: ICalculatorLog, index) => {
            const formattedDate = format(log.datetime, "MM/dd/yy | hh:mm a");
            return (
              <Fragment key={index}>
                <div className="log-card p-2 rounded-md bg-gray-800 mb-2">
                  <div className="flex justify-between">
                    <div className="text-[10px] text-gray-500 mt-b">
                      {log.input}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-b">
                      {formattedDate}
                    </div>
                  </div>
                  <div className="text-md text-white">{log.computed}</div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="log-card p-4 rounded-md bg-gray-800 mb-2">
            <div className="flex justify-center text-sm text-orange-500">
              No Logs
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorDrawerLogs;

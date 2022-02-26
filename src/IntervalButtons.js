import React, { useEffect } from "react";
import { useGLobalContext } from "./context";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

const IntervalButtons = () => {
  const { rest, season, isRunning, setRest, setSeason, setTime } =
    useGLobalContext();

  const handleClick = (type) => {
    if (!isRunning) {
      switch (type) {
        case "decBreak":
          if (rest > 1) {
            setRest(rest - 1);
          }
          break;
        case "incBreak":
          if (rest < 120) {
            setRest(rest + 1);
          }
          break;
        case "decSeason":
          if (season > 1) {
            setSeason(season - 1);
          }
          break;
        case "incSeason":
          if (season < 120) {
            setSeason(season + 1);
          }
          break;
        default:
          console.log("error");
      }
    }
  };

  useEffect(() => {
    setTime({ minutes: season, seconds: 0 });
  }, [season, setTime]);
  return (
    <div className="interval-btn">
      <div className="block-btn">
        <label htmlFor="break-length" id="break-label">
          Break Length
        </label>
        <div className="block-control">
          <button id="break-decrement" onClick={() => handleClick("decBreak")}>
            <HiArrowSmDown />
          </button>
          <h4 id="break-length">{rest}</h4>
          <button id="break-increment" onClick={() => handleClick("incBreak")}>
            <HiArrowSmUp />
          </button>
        </div>
      </div>
      <div className="block-btn">
        <label htmlFor="break-length" id="session-label">
          Season Length
        </label>
        <div className="block-control">
          <button
            id="session-decrement"
            onClick={() => handleClick("decSeason")}
          >
            <HiArrowSmDown />
          </button>
          <h4 id="session-length">{season}</h4>
          <button
            id="session-increment"
            onClick={() => handleClick("incSeason")}
          >
            <HiArrowSmUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntervalButtons;

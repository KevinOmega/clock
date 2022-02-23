import React, { useEffect } from "react";
import { useGLobalContext } from "./context";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaStopCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const Timer = () => {
  const {
    rest,
    season,
    currentType,
    time,
    isRunning,
    setSeason,
    setRest,
    setCurrentType,
    setIsRunning,
    setTime,
  } = useGLobalContext();

  const handleReset = () => {
    setSeason(25);
    setRest(5);
    setTime({ minutes: season, seconds: 0 });
  };

  const myTimer = () => {
    const countDown =
      new Date().getTime() + (time.minutes * 60000 + time.seconds * 6000);
    const myInterval = setInterval(() => {
      const now = new Date().getTime();
      const timeleft = countDown - now;
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      setTime({ minutes, seconds });
    }, 1000);
    return () => clearInterval(myInterval);
  };

  useEffect(() => {
    if (isRunning) {
      myTimer();
    }
  }, [isRunning]);

  return (
    <div className="timer-container">
      <div className="timer">
        <p>{currentType ? "Session" : "Break"}</p>
        <h4>
          {time.minutes}:{time.seconds}
        </h4>
      </div>
      <div className="timer-btn">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <FaStopCircle /> : <AiFillPlayCircle />}
        </button>
        <button onClick={handleReset}>
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
};

export default Timer;

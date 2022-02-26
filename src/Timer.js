import React, { useEffect, useState } from "react";
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

  const [beep, setBeep] = useState(false);

  const handleReset = () => {
    setIsRunning(false);
    setSeason(25);
    setRest(5);
    setTime({ minutes: season, seconds: 0 });
  };

  useEffect(() => {
    let timeOut = null;
    if (beep && isRunning) {
      let sound = document.getElementById("beep");
      sound.currentTime = 0;
      sound.volume = 75 / 100;
      sound.play();
      sound.setAttribute("autoplay", "autoplay");
      timeOut = setTimeout(() => setBeep(false), 9000);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [beep, isRunning]);

  useEffect(() => {
    setCurrentType(true);
    let countDown =
      new Date().getTime() +
      (time.minutes * 60000 + time.seconds * 1000) +
      1000;
    const myInterval = setInterval(() => {
      let now = new Date().getTime();
      let timeLeft = countDown - now;
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setTime({ minutes, seconds });

      if (minutes === 0 && seconds < 5) {
        setBeep(true);
      }

      if (minutes <= 0 && seconds <= 0) {
        setCurrentType(!currentType);
        let newTime = 0;
        if (currentType) {
          newTime = rest;
        } else {
          newTime = season;
        }
        countDown = new Date().getTime() + newTime * 60000;
      }
    }, 1000);

    if (!isRunning) {
      clearInterval(myInterval);
      countDown = 0;
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [
    isRunning,
    currentType,
    rest,
    season,
    setCurrentType,
    setTime,
    time.minutes,
    time.seconds,
  ]);

  return (
    <div className="timer-container">
      <div className="timer">
        <p id="timer-label">{currentType ? "Session" : "Break"}</p>
        <h4 id="time-left" className={time.minutes === 0 && "danger"}>
          {time.minutes}:{time.seconds}
        </h4>
        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          id="beep"
        ></audio>
      </div>
      <div className="timer-btn">
        <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? <FaStopCircle /> : <AiFillPlayCircle />}
        </button>
        <button id="reset" onClick={handleReset}>
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
};

export default Timer;

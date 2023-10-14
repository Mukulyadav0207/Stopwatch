import { FC, useState, useRef } from "react";

const Stopwatch: FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [run, setRun] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (!run) {
      setRun(true);
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }
  };

  const stop = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      setRun(false);
    }
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    setRun(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="flex-col bg-gray-300 border rounded-lg w-[200px] p-10">
        <h1 className="flex items-center justify-center mb-5">
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={start}
            className="border border-black px-2"
            hidden={run}
          >
            Start
          </button>
          <button
            onClick={stop}
            className="border border-black px-2"
            hidden={!run}
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="border border-black px-2"
            hidden={seconds === 0}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;

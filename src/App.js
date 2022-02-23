import IntervalButtons from "./IntervalButtons";
import Timer from "./Timer";

function App() {
  return (
    <div className="container">
      <div className="clock-container">
        <div className="title">
          <h1>25 + 5 Clock</h1>
        </div>
        <IntervalButtons />
        <Timer />
      </div>
    </div>
  );
}

export default App;

import "./App.scss";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <div>
      <Header />
      <RenderArray />
    </div>
  );
}

const Header = () => {
  return (
    <div className="header">
      <h1>Sorting visualizer</h1>
    </div>
  );
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(min, max) {
  let array = [];
  for (let i = 0; i < 50; i++) {
    array.push(getRandomArbitrary(min, max));
  }
  return array;
}

const RenderArray = () => {
  const [array, setArray] = useState(randomArray(5, 100));
  const [swap, setSwap] = useState([]);
  const [done, setDone] = useState([]);
  const refresh = () => window.location.reload();

  function Sort() {
    let temp = [...array];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        setTimeout(() => {
          const aux = [];
          aux.push(j);
          aux.push(j + 1);
          if (temp[j] > temp[j + 1]) {
            let t = temp[j];
            temp[j] = temp[j + 1];
            temp[j + 1] = t;
          }
          setSwap([...aux]);
          setArray([...temp]);
        }, 30 * i);
      }
      setTimeout(() => {
        let complete = [];
        for (let k = array.length; k >= array.length - i - 1; k--) {
          complete.push(k);
          setDone([...complete]);
        }
      }, 30 * i);
    }
    setTimeout(() => {
      setDone([]);
      setSwap([]);
    }, 100);
  }

  const bars = array.map((value, idx) => (
    <div
      className="arrayRectangle"
      key={idx}
      style={{
        height: `${(30 / 100) * value}vh`,
        width: `${1}vw`,
        margin: "0 0.2vw",
        backgroundColor: swap.includes(idx) ? "white" : "coral",
      }}
    />
  ));

  return (
    <div class="Container">
      <nav>
        <button onClick={Sort}>Sort</button>
        <button onClick={() => setArray(randomArray(5, 100))}>New array</button>
      </nav>
      <div className="arrayContainer">{bars}</div>
    </div>
  );
};

export default App;

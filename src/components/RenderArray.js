import React, { useState, useEffect } from "react";
import "./RenderArray.scss";

// Generate a random array of integers
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

// The component that renders arrays
const RenderArray = () => {
  const [array, setArray] = useState(randomArray(5, 100));
  const [swap, setSwap] = useState([]);
  const [done, setDone] = useState([]);

  // Function that waits inside loop
  // Allows the array swap to be seeable
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function newArray() {
    setArray(randomArray(5, 100));
    setDone([]);
    setSwap([]);
  }

  // Sorting algorithm
  async function Sort() {
    let arraySize = array.length;
    let temp = [...array];
    for (let i = 0; i <= arraySize - 1; i++) {
      for (let j = 0; j < arraySize - 1 - i; j++) {
        await sleep(15);
        // The aux variable stores the arrays that are currently
        // being compared, to be added to de swap state
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
      }
      await sleep(15);
      // Stores the arrays that are already in the correct order
      let complete = [];
      for (let k = arraySize; k >= arraySize - i - 1; k--) {
        complete.push(k);
      }
      setDone([...complete]);
    }
    setSwap([]);
  }

  const bars = array.map((value, idx) => (
    <div
      className="arrayRectangle"
      key={idx}
      style={{
        height: `${(30 / 100) * value}vh`,
        width: `${1}vw`,
        margin: "0 0.2vw",
        backgroundColor: swap.includes(idx)
          ? "white"
          : done.includes(idx)
          ? "green"
          : "coral",
      }}
    />
  ));

  return (
    <div class="Container">
      <nav>
        <button onClick={Sort}>Sort</button>
        <button onClick={newArray}>New array</button>
      </nav>
      <div className="arrayContainer">{bars}</div>
    </div>
  );
};

export default RenderArray;

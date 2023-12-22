import React, { useState } from 'react';
import Row from './Row';

const Grid = ({ won, setWon, setLost }) => {


  const [current, setCurrent] = useState(0)



  return (

    <div className="grid">


      <Row idx={0} max={5} won={won} setWon={setWon} current={current} setCurrent={setCurrent} setLost={setLost} />
      <Row idx={1} max={5} won={won} setWon={setWon} current={current} setCurrent={setCurrent} setLost={setLost} />
      <Row idx={2} max={5} won={won} setWon={setWon} current={current} setCurrent={setCurrent} setLost={setLost} />
      <Row idx={3} max={5} won={won} setWon={setWon} current={current} setCurrent={setCurrent} setLost={setLost} />
      <Row idx={4} max={5} won={won} setWon={setWon} current={current} setCurrent={setCurrent} setLost={setLost} />
      <Row idx={5} max={5} won={won} setWon={setWon} current={current} setCurrent={setCurrent} setLost={setLost} />

      {/* Your grid content goes here */}
    </div>
  );
};

export default Grid;

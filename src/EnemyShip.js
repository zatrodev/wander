import { useState, useEffect } from "react";

function EnemyShip(props) {
  const [top, setTop] = useState(props.top);
  const [isUp, setIsUp] = useState(true);
  const [changeDir, setChangeDir] = useState(
    Math.floor(Math.random() * 150) + 20
  );

  useEffect(() => {
    let move = setInterval(() => {
      if (isUp) {
        setTop((top) => top - 1);
        if (top < changeDir) {
          props.callback(top);
          setIsUp(false);
          setChangeDir(Math.floor(Math.random() * (280 - top)) + top);
        }
      } else {
        setTop((top) => top + 1);
        if (top > changeDir) {
          props.callback(top);
          setIsUp(true);
          setChangeDir(Math.floor(Math.random() * top) + 20)
        }
      }
    }, 5)
    return () => {
      clearInterval(move);
    }
  });

  return (
    <img
      className="enemy-ship"
      src={process.env.PUBLIC_URL + '/enemy_spaceship.png'}
      style={{
        top: top,
        width: props.width,
        height: props.width,
      }}
    ></img>
  );
}

export default EnemyShip;

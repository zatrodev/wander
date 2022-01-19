import React, { useState } from "react";

function Ship(props) {
  return (
    <img
      className="ship"
      src="./spaceship.png"
      style={{
        top: props.top,
        left: props.left,
      }}
    ></img>
  );
}

export default Ship;

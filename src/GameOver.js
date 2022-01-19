function GameOver(props) {
  return (
    <div className="game-over">
      <div className="text-container">
        <p className="lost">YOU LOST</p>
        <p className="asar">(haha iyak di marunong)</p>
        <p className="time">You lasted <b>{props.score * 1.1}s</b></p>
        <p className="restart">Press [R] to restart</p>
      </div>
    </div>
  );
}

function gameOver() {
  const ship = document.getElementsByClassName("ship")[0];
  document.getElementsByClassName("game-over")[0].style.opacity = 0.7;
  ship.classList.add("ship-game-over");

  return true;
}

export { GameOver, gameOver };

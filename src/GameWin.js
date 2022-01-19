function GameWin(props) {
  return (
    <div className="game-win">
      <div className="text-container">
        <p className="lost">YOU WON</p>
        <p className="asar">(wp wp fr fr)</p>
        <p className="time">
          You won in <b>{props.score * 1.1}s</b>
        </p>
        <p className="restart">Press [R] to restart</p>
      </div>
    </div>
  );
}

function gameWin() {
  const gameWinDoc = document.getElementsByClassName("game-win")[0];
  gameWinDoc.style.visibility = "visible";
  gameWinDoc.style.opacity = 0.7;

  return true;
}

export { GameWin, gameWin };

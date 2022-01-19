function EnemyShipsDisplay(props) {
  return (
    <div>
      {props.ships.map((ship) => {
        return ship;
      })}
    </div>
  );
}

export default EnemyShipsDisplay;

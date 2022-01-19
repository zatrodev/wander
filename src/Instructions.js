function Instructions() {
  return (
    <div className="instructions">
      <div
        className="text-container"
        style={{
          marginTop: 25,
        }}
      >
        <p className="lost">WANDER 3.0</p>
        <p className="asar">DESTROY THE ENEMY IN ORDER TO WIN</p>
        <p className="p">Press [P] to shoot down pipes (-1 ammo)</p>
        <p className="o">Press [O] to shoot down the enemy ship (-2 ammo)</p>
        <p className="i">
          Press [I] to obtain a shield for 3 seconds (-4 ammo)
        </p>
        <p className="play">
          Press <b>[Enter]</b> to play
        </p>
      </div>
    </div>
  );
}

export default Instructions;

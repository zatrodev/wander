import "./App.css";
import { useState, useEffect } from "react";
import Pipe from "./Pipe";
import PipesDisplay from "./PipesDisplay";
import Stars from "./Stars";
import Ship from "./Ship";
import EnemyShip from "./EnemyShip";
import CheckCollision from "./CheckCollision";
import Bullet from "./Bullet";
import Ammo from "./Ammo";
import Score from "./Score";
import { GameOver, gameOver } from "./GameOver";
import { GameWin, gameWin } from "./GameWin";
import EnemyShipsDisplay from "./EnemyShipsDisplay";
import Instructions from "./Instructions";

const HEIGHT = 300;
const WIDTH = 1250;
const PIPE_SPAWN_TIME = 1100;
const SHIP_SPEED = 20;

let count = 0;
let hasShield = true;
let canShield = true;
let GAME_OVER = true;

function App() {
  const [pipes, setPipes] = useState({ items: [] });
  const [shipTop, setShipTop] = useState(150);
  const [shipLeft, setShipLeft] = useState(100);
  const [enemyShips, setEnemyShips] = useState({ ships: [] });
  const [bullet, setBullet] = useState({ bullets: [] });
  const [enemyBullet, setEnemyBullet] = useState({ enemyBullets: [] });
  const [ammo, setAmmo] = useState(75);
  const [score, setScore] = useState(0);

  const pipeSetup = () => {
    const topHeight = Math.floor(Math.random() * (HEIGHT - 150)) + 30;
    const botHeight = HEIGHT - topHeight - 100;

    return {
      topHeight: topHeight,
      botHeight: botHeight,
    };
  };

  const addPipe = () => {
    let pipeArr = pipes["items"];
    let pipeHeights = pipeSetup();

    pipeArr.push(
      <Pipe
        top={true}
        height={pipeHeights.topHeight}
        key={Math.random()}
      ></Pipe>
    );
    pipeArr.push(
      <Pipe
        top={false}
        height={pipeHeights.botHeight}
        key={Math.random()}
      ></Pipe>
    );

    setPipes({ items: pipeArr });
    setTimeout(() => {
      pipes["items"].shift();
      pipes["items"].shift();
    }, 5000);
  };

  const addBullet = (bulletName) => {
    let bulletArr = bullet["bullets"];
    bulletArr.push(
      <div
        className={`bullet-group ${bulletName}`}
        style={{
          left: shipLeft,
          top: shipTop + 16,
        }}
        key={Math.random()}
      ></div>
    );
    setBullet({ bullets: bulletArr });
  };

  const addShield = () => {
    document.getElementsByClassName("ship")[0].classList.add("shield");
    hasShield = true;
    canShield = false;
    setTimeout(() => {
      hasShield = false;
      document.getElementsByClassName("ship")[0].classList.remove("shield");
      setTimeout(() => {
        canShield = true;
      }, 500);
    }, 3000);
  };

  const addEnemyBullet = (enemyShipTop) => {
    let enemyBulletArr = enemyBullet["enemyBullets"];
    enemyBulletArr.push(
      <div
        className="enemy-bullet"
        style={{
          top: enemyShipTop + 16,
        }}
        key={Math.random()}
      ></div>
    );
    setEnemyBullet({ enemyBullets: enemyBulletArr });
  };

  const addScore = () => {
    setScore((score) => score + 1);

    if (score % 2 === 0) setAmmo((ammo) => ammo + 1);
  };

  const splitEnemyShip = (index) => {
    count += 1;
    let enemyShipToBeDestroyed =
      document.getElementsByClassName("enemy-ship")[index];
    let enShip = enemyShips["ships"];

    if (enemyShipToBeDestroyed.clientWidth > 20) {
      for (let i = 0; i < 2; ++i) {
        enShip.push(
          <EnemyShip
            callback={addEnemyBullet}
            top={150}
            width={enemyShipToBeDestroyed.clientWidth - 5}
            key={Math.random()}
          ></EnemyShip>
        );
      }
    }

    enShip.splice(index, 1);
    setEnemyShips({ ships: enShip });

    if (enemyShips["ships"].length === 0) {
      GAME_OVER = gameWin();
    }
  };

  const keyPressHandler = (event) => {
    switch (event.key) {
      case "w":
        setShipTop((shipTop) => shipTop - SHIP_SPEED);
        break;
      case "s":
        setShipTop((shipTop) => shipTop + SHIP_SPEED);
        break;
      case "a":
        setShipLeft((shipLeft) => shipLeft - SHIP_SPEED);
        break;
      case "d":
        setShipLeft((shipLeft) => shipLeft + SHIP_SPEED);
        break;
      case "p":
        if (ammo > 0) {
          addBullet("bullet");
          setAmmo((ammo) => ammo - 1);
        }
        break;
      case "o":
        if (ammo > 1) {
          addBullet("killer-bullet");
          setAmmo((ammo) => ammo - 2);
        }
        break;
      case "i":
        if (ammo > 4 && hasShield == false && canShield) {
          addShield();
          setAmmo((ammo) => ammo - 5);
        }
        break;
      case "b":
        document.getElementsByClassName("ship")[0].style.border =
          "1px dashed white";
        break;
      case "Enter":
        if (sessionStorage.getItem(0) != "test") {
          sessionStorage.setItem(0, "test");
          GAME_OVER = false;
          hasShield = false;
          window.location.reload();
        }

        break;
      case "r":
        window.location.reload();
        break;
    }
  };

  useEffect(() => {
    document.getElementsByClassName("canvas")[0].focus();
    if (sessionStorage.getItem(0) == "test") {
      document.getElementsByClassName("instructions")[0].style.visibility =
        "hidden";
      GAME_OVER = false;
      hasShield = false;
    }

    let enShips = enemyShips["ships"];
    enemyShips["ships"].push(
      <EnemyShip
        callback={addEnemyBullet}
        top={150}
        width={32}
        height={32}
        key={Math.random()}
      ></EnemyShip>
    );
    setEnemyShips({ ships: enShips });
    setInterval(() => {
      let bulletArr = bullet["bullets"];
      let enemyBulletArr = enemyBullet["enemyBullets"];
      let pipeClass = Array.from(document.getElementsByClassName("pipe"));
      let enemyBulletClass = Array.from(
        document.getElementsByClassName("enemy-bullet")
      );

      if (enemyBulletArr.length !== 0) {
        enemyBulletClass.forEach((bullet) => {
          let bulletRect = bullet.getBoundingClientRect();
          if (bulletRect.left < 10) {
            let enemyBulletArr = enemyBullet["enemyBullets"];
            enemyBulletArr.shift();
            setEnemyBullet({ enemyBullets: enemyBulletArr });
          }

          if (
            !hasShield &&
            CheckCollision(
              bulletRect,
              document.getElementsByClassName("ship")[0].getBoundingClientRect()
            )
          ) {
            GAME_OVER = gameOver();
          }
        });
      }

      if (bulletArr.length !== 0) {
        let bulletRect;
        let bulletClass = Array.from(
          document.getElementsByClassName("bullet-group")
        );

        bulletClass.forEach((_bullet) => {
          if (_bullet.classList.item(1) == "bullet") {
            bulletRect = _bullet.getBoundingClientRect();

            pipeClass.forEach((pipe) => {
              if (CheckCollision(bulletRect, pipe.getBoundingClientRect())) {
                pipe.className = "destroyed-pipe";
                bullet["bullets"].splice(bulletClass.indexOf(_bullet), 1);
              }
            });
          } else {
            bulletRect = _bullet.getBoundingClientRect();

            let enemyShipClass = Array.from(
              document.getElementsByClassName("enemy-ship")
            );
            enemyShipClass.forEach((enemyShip) => {
              if (
                CheckCollision(bulletRect, enemyShip.getBoundingClientRect())
              ) {
                if (count == 0)
                  splitEnemyShip(enemyShipClass.indexOf(enemyShip));
              }
            });
          }

          if (bulletRect.right > WIDTH + 100) {
            bulletArr.shift();
            setBullet({ bullets: bulletArr });
            count = 0;
          }
        });
      }

      pipeClass.forEach((pipe) => {
        pipe.style.opacity = 100;
        if (
          !hasShield &&
          CheckCollision(
            document.getElementsByClassName("ship")[0].getBoundingClientRect(),
            pipe.getBoundingClientRect()
          )
        ) {
          GAME_OVER = gameOver();
        }
      });
    }, 1);
  }, []);

  useEffect(() => {
    if (shipTop < 0 || shipTop > 300) GAME_OVER = gameOver();
  }, [shipTop]);

  useEffect(() => {
    let addPipeTimeout = setTimeout(() => {
      if (!GAME_OVER) {
        addScore();
      }

      addPipe();
    }, PIPE_SPAWN_TIME);
    return () => {
      clearTimeout(addPipeTimeout);
    };
  }, [pipes]);

  return (
    <div
      className="canvas"
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
      tabIndex={0}
      onKeyPress={keyPressHandler}
    >
      <Instructions></Instructions>
      <GameOver score={score}></GameOver>
      <GameWin score={score}></GameWin>
      <Stars></Stars>
      <Stars left={900}></Stars>
      <Stars left={500}></Stars>
      <Ship top={shipTop} left={shipLeft}></Ship>
      <EnemyShipsDisplay ships={enemyShips["ships"]}></EnemyShipsDisplay>
      <PipesDisplay pipes={pipes["items"]}></PipesDisplay>
      <Bullet bullet={bullet["bullets"]}></Bullet>
      <Bullet bullet={enemyBullet["enemyBullets"]}></Bullet>
      <Ammo ammo={ammo}></Ammo>
      <Score score={score + 1}></Score>
    </div>
  );
}

export default App;

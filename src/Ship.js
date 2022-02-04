function Ship(props) {
  return ( 
    <img
      className="ship"
      src={process.env.PUBLIC_URL + '/spaceship.png'}
      style={{
        top: props.top,
        left: props.left,
      }}
    ></img>
  );
}

export default Ship;

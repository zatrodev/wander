function Pipe(props) {
  if (props.top) {
    return (
      <div
        className="pipe"
        style={{ height: props.height, borderTop: 0 }}
      ></div>
    );
  }

  return (
    <div
      className="pipe"
      style={{
        height: props.height,
        bottom: 0,
        borderBottom: 0,
      }}
    ></div>
  );
}

export default Pipe;

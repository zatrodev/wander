function Stars(props) {
  return (
    <div>
      <div className="starfield small">
        <div className="starfield__stars" style={{
            left: props.left ? props.left : 0
        }}></div>
      </div>
      <div className="starfield medium">
        <div className="starfield__stars" style={{
            left: props.left ? props.left : 0
        }}></div>
      </div>
      <div className="starfield large">
        <div className="starfield__stars" style={{
            left: props.left ? props.left : 0
        }}></div>
      </div>
    </div>
  );
}

export default Stars;
function Square(props) {
  return (
    <div className="square" value={props.value} onClick={props.onClick}>
      {props.value}
    </div>
  );
}
export default Square;

export { Cell }

function Cell(props: any) {
  return (
    <div
      className={`cell ${props.value ? "cell--alive" : "cell-dead"}`}
      onClick={props.onClick}>
    </div>
  )
};
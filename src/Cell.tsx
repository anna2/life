export { Cell }

function Cell(props: any) {
  const styles = {backgroundColor: props.value ? props.color : 'white'}
  return (
    <div
      className={`cell ${props.value ? "cell--alive" : "cell-dead"}`}
      onClick={props.onClick}
      style={styles}>
    </div>
  )
};
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

function Cell(props) {
  return (
    <div className={`cell ${props.value ? "cell--alive" : "cell-dead"}`}>
    </div>
  )
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(10)
              .fill()
              .map(e => Array(10).fill().map((e, i) => false))
    }
  }

  renderCell(x, y) {
    return (
      <Cell
        value={this.state.cells[x][y]}
      />
    );
  }

  render() {
    return (
      this.state.cells.map((row, rowIndex) =>
        <div className="board-row">
          {row.map((cell, cellIndex) => this.renderCell(rowIndex, cellIndex))}
        </div>
      )
    );
  }
}

ReactDOM.render(<Board />, document.getElementById("root"));
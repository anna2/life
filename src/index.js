import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

function Cell(props) {
  return (
    <div
      className={`cell ${props.value ? "cell--alive" : "cell-dead"}`}
      onClick={props.onClick}>
    </div>
  )
};

class Board extends React.Component {

  renderCell(x, y) {
    return (
      <Cell
        value={this.props.cells[x][y]}
        onClick={() => this.props.onClick(x, y)}
        key={y}
      />
    );
  }

  render() {
    return (
      this.props.cells.map((row, rowIndex) =>
        <div className="board-row" key={rowIndex}>
          {row.map((cell, cellIndex) => this.renderCell(rowIndex, cellIndex))}
        </div>
      )
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells:  Array(10)
              .fill()
              .map(e => Array(10)
                        .fill()
                        .map((e) => false)),
      paused: true,
      generations: 0,
      intervalRef: null
    }
  }

  toggleStartStop() {
    this.setState({
      paused: !this.state.paused
    },
    () => {
      if (this.state.paused) {
        clearInterval(this.state.intervalRef)
      } else {
        this.setState({intervalRef: setInterval(this.tick, 1000)})
      }
    })
  }

  tick = () => {
    this.setState({
      generations: this.state.generations + 1
    })
  }

  handleClick(x, y) {
    if (!this.state.paused) { return; }
    
    let newCellState = JSON.parse(JSON.stringify(this.state.cells))
    newCellState[x][y] = !newCellState[x][y];
    this.setState({
      cells: newCellState
    })
  }

  render() {
    return (
      <div className="game">
        <div className="game__board">
          <Board
            cells={this.state.cells}
            onClick={(x, y) => this.handleClick(x, y)}
          />
        </div>
        <div className="game__info">
          <button onClick={() => this.toggleStartStop()}>{this.state.paused ? "Start" : "Stop"}</button>
          <div>{this.state.generations}</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
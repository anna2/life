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
    };
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
    });
  }

  tick = () => {
    this.setState({
      cells: this.getNewCellState(),
      generations: this.state.generations + 1
    });
  }

  getNewCellState() {
    let result = JSON.parse(JSON.stringify(this.state.cells));

    for (let row = 0; row < this.state.cells.length; row++) {
      for (let cell = 0; cell < this.state.cells[row].length; cell++) {
        let numLiveNeighbors = this.countLiveNeighbors(row, cell);

        if (this.state.cells[row][cell]) {
          if (numLiveNeighbors <= 1 || numLiveNeighbors >= 4) { result[row][cell] = false; } //death
        } else {
          if (numLiveNeighbors === 3) { result[row][cell] = true; } //birth
        }
      }
    }

    return result;
  }

  countLiveNeighbors(row, cell) {
    let result = 0;
    let neighborCoordinates = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];

    for (let i = 0; i < neighborCoordinates.length; i++) {
      let neighborRowCoordinate = row + neighborCoordinates[i][0];
      let neighborCellCoordinate = cell + neighborCoordinates[i][1];

      if (neighborRowCoordinate < 0 || neighborCellCoordinate < 0) {
        continue;
      }
      if (neighborRowCoordinate > 9 || neighborCellCoordinate > 9) {
        continue;
      }

      if (this.state.cells[neighborRowCoordinate][neighborCellCoordinate]) {
        result++;
      }
      if (result >= 4) { break; }
    }

    return result;
  }

  handleClick(x, y) {
    if (!this.state.paused) { return; }

    let newCellState = JSON.parse(JSON.stringify(this.state.cells));
    newCellState[x][y] = !newCellState[x][y];
    this.setState({
      cells: newCellState
    });
  }

  clearBoard() {
    const emptyBoard = Array(10)
                        .fill()
                        .map(e => Array(10)
                                  .fill()
                                  .map((e) => false));
    this.setState({
      cells: emptyBoard
    });
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
          <button onClick={() => this.clearBoard()}>Clear</button>
          <div>{this.state.generations}</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
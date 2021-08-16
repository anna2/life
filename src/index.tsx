import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

import { Board } from './Board';
import './index.scss';
interface GameState {
  cells: Array<boolean[]>,
  paused: boolean,
  generations: number,
  intervalRef: number | undefined
}

class Game extends React.Component<{}, GameState> {
  constructor(props: any) {
    super(props);
    this.state = {
      cells:  Array(100)
              .fill(null)
              .map(e => Array(100)
                        .fill(null)
                        .map((e) => false)),
      paused: true,
      generations: 0,
      intervalRef: undefined
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
        this.setState({intervalRef: window.setInterval(this.tick, 300)})
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

  countLiveNeighbors(row: number, cell: number) {
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
      if (neighborRowCoordinate > 99 || neighborCellCoordinate > 99) {
        continue;
      }

      if (this.state.cells[neighborRowCoordinate][neighborCellCoordinate]) {
        result++;
      }
      if (result >= 4) { break; }
    }

    return result;
  }

  handleClick(x: number, y: number): void {
    if (!this.state.paused) { return; }

    let newCellState = JSON.parse(JSON.stringify(this.state.cells));
    newCellState[x][y] = !newCellState[x][y];
    this.setState({
      cells: newCellState
    });
  }

  clearBoard(): void {
    const emptyBoard = Array(100)
                        .fill(null)
                        .map(e => Array(100)
                                  .fill(null)
                                  .map((e) => false));
    this.setState({
      cells: emptyBoard,
      generations: 0
    });
  }

  componentDidMount() {
    let board = document.getElementsByClassName('game__board')[0];
    board.scrollTo(board.clientWidth/3, board.clientHeight/3);
  }

  render() {
    return (
      <div className="game">
        <div className="game__board">
          <Board
            cells={this.state.cells}
            onClick={(x: number, y: number) => this.handleClick(x, y)}
          />
        </div>
        <div className="game__info">
          <Button variant="contained" color="primary" onClick={() => this.toggleStartStop()}>{this.state.paused ? "Start" : "Stop"}</Button>
          <Button variant="contained" color="primary" onClick={() => this.clearBoard()}>Clear</Button>
          <div>{this.state.generations}</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
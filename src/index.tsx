import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';


import { Board } from './Board';
import { ColorPicker } from './ColorPicker';
import { PatternDialog } from './PatternDialog';
import './index.scss';

interface GameState {
  cells: Array<boolean[]>,
  paused: boolean,
  generations: number,
  intervalRef: number | undefined,
  openPatternDialog: boolean,
  color: string
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
      intervalRef: undefined,
      openPatternDialog: false,
      color: 'black'
    };
  }

  handleClickOpen = () => {
    this.setState({openPatternDialog: true});
  };

  handleClose = (value: {name: string, period: number | null, cells: Array<number[]>} | null): void => {
    if (!value) { 
      this.setState({
        openPatternDialog: false
      });
      return;
    }

    let newBoard = this.getEmptyBoard();
    for (let cell of value.cells) {
      newBoard[cell[0]][cell[1]] = true;
    }
    this.setState({
      openPatternDialog: false,
      cells: newBoard,
      generations: 0
    });
  };


  toggleStartStop() {
    this.setState((state) => ({
      paused: !state.paused
    }),
    () => {
      if (this.state.paused) {
        clearInterval(this.state.intervalRef)
      } else {
        this.setState({intervalRef: window.setInterval(this.tick, 300)})
      }
    });
  }

  tick = () => {
    this.setState((state) => ({
      cells: this.getNewCellState(state.cells),
      generations: state.generations + 1
    }));
  }

  getNewCellState(cells: Array<boolean[]>) {
    let result = JSON.parse(JSON.stringify(cells));

    for (let row = 0; row < cells.length; row++) {
      for (let cell = 0; cell < cells[row].length; cell++) {
        let numLiveNeighbors = this.countLiveNeighbors(row, cell);

        if (cells[row][cell]) {
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

  getEmptyBoard(): Array<boolean[]> {
    return Array(100)
            .fill(null)
            .map(e => Array(100)
                      .fill(null)
                      .map((e) => false));
  }

  clearBoard(): void {
    this.setState({
      cells: this.getEmptyBoard(),
      generations: 0
    });
  }

  componentDidMount() {
    let board = document.getElementsByClassName('game__board')[0];
    board.scrollTo(board.clientWidth/3, board.clientHeight/3);
  }

  chooseColor(color: any): void {
    this.setState({
      color: color
    })
  }

  render() {
    return (
      <div className="game">
        <div className="game__board">
          <Board
            cells={this.state.cells}
            onClick={(x: number, y: number) => this.handleClick(x, y)}
            color={this.state.color}
          />
        </div>
        <div className="game__info">
          <div>Generations: {this.state.generations}</div>

          <div className="info__controls">
            <Button
              className="controls__clear"
              variant="contained"
              onClick={() => this.clearBoard()}
            >
                Clear
            </Button>

            <Button
              variant="contained"
              color={this.state.paused ? "primary" : "secondary"}
              onClick={() => this.toggleStartStop()}
              startIcon={this.state.paused ? <PlayArrowIcon /> : <PauseIcon />} 
            >
                {this.state.paused ? "Start" : "Pause"}
            </Button>
          </div>

          <div className="info__extras">
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              Patterns
            </Button>
            <PatternDialog
              openPatternDialog={this.state.openPatternDialog}
              onClose={this.handleClose}
            />

            <ColorPicker onClick={(color: string) => this.chooseColor(color)}/>

            
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

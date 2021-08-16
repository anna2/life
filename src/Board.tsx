import * as React from 'react';

import { Cell } from './Cell';

export { Board }

interface BoardProps {
  cells: Array<boolean[]>,
  onClick: Function
}

class Board extends React.Component<BoardProps, {}> {

  renderCell(x: number, y: number) {
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
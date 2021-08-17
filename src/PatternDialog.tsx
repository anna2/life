import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export { PatternDialog }

export interface PatternDialogProps {
  openPatternDialog: boolean;
  onClose: (value: {name: string, period: number | null, cells: Array<number[]>} | null) => void;
}

function PatternDialog(props: PatternDialogProps) {
  const { onClose, openPatternDialog } = props;

  const patterns = {
    oscillators: {
      'blinker' : {
        name: 'Blinker',
        period: 2,
        cells: [[50,49], [50, 50], [50, 51]]
      },
      'toad' : {
        name: 'Toad',
        period: 2,
        cells: [
          [50,49], [50, 50], [50, 51],
          [51,48], [51, 49], [51, 50]
        ]
      },
      'beacon' : {
        name: 'Beacon',
        period: 2,
        cells: [
          [48, 48], [48, 49],
          [49, 48], [49, 49],
          [50, 50], [50, 51],
          [51, 50], [51, 51]
        ]
      },
      'pulsar' : {
        name: 'Pulsar',
        period: 3,
        cells: [
          [44, 46],[44, 47],[44, 48],[44, 52],[44, 53],[44, 54],
          [46, 44],[46, 49],[46, 51],[46, 56],
          [47, 44],[47, 49],[47, 51],[47, 56],
          [48, 44],[48, 49],[48, 51],[48, 56],
          [49, 46],[49, 47],[49, 48],[49, 52],[49, 53],[49, 54],
          [51, 46],[51, 47],[51, 48],[51, 52],[51, 53],[51, 54],
          [52, 44],[52, 49],[52, 51],[52, 56],
          [53, 44],[53, 49],[53, 51],[53, 56],
          [54, 44],[54, 49],[54, 51],[54, 56],
          [56, 46],[56, 47],[56, 48],[56, 52],[56, 53],[56, 54]
        ]
      },
      'penta-decathalon' : {
        name: 'Penta-Decathlon',
        period: 15,
        cells: [
          [46, 49], [46, 50], [46, 51],
          [47, 49], [47, 51],
          [48, 49], [48, 50], [48, 51],
          [49, 49], [49, 50], [49, 51],
          [50, 49], [50, 50], [50, 51],
          [51, 49], [51, 50], [51, 51],
          [52, 49], [52, 51],
          [53, 49], [53, 50], [53, 51],
        ]
      }
    },
    spaceships:{
      'glider' : {
        name: 'Glider',
        period: null,
        cells: [
          [49, 50],
          [50, 51],
          [51, 49],[51, 50],[51, 51]
        ]
      },
      'lwss' : {
        name: 'Light-Weight Spaceship',
        period: null,
        cells: [
          [48, 49],[48, 52],
          [49, 48],
          [50, 48], [50, 52],
          [51, 48],[51, 49],[51, 50],[51, 51]
        ]
      },
      'mwss' : {
        name: 'Medium-Weight Spaceship',
        period: null,
        cells: [
          [47, 51],
          [48, 49],[48, 53],
          [49, 48],
          [50, 48], [50, 53],
          [51, 48],[51, 49],[51, 50],[51, 51], [51, 52]
        ]
      },
      'hwss' : {
        name: 'Heavy-Weight Spaceship',
        period: null,
        cells: [
          [47, 51], [47, 52],
          [48, 49],[48, 54],
          [49, 48],
          [50, 48], [50, 54],
          [51, 48],[51, 49],[51, 50],[51, 51], [51, 52], [51, 53]
        ]
      },

    }
  }

  const oscillators = Object.entries(patterns.oscillators).map(([key, pattern]) => {
    return <div onClick={() => handlePatternClick(pattern)} key={pattern.name}>{ pattern.name }</div>;
  });

  const spaceships = Object.entries(patterns.spaceships).map(([key, pattern]) => {
    return <div onClick={() => handlePatternClick(pattern)} key={pattern.name}>{ pattern.name }</div>;
  });

  const handleClose = () => {
    onClose(null);
  };

  const handlePatternClick = (value: object) => {
    let patternCopy = JSON.parse(JSON.stringify(value))
    onClose(patternCopy);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="pattern-dialog-title" open={openPatternDialog}>
      <DialogTitle id="pattern-dialog-title">Pattern Library</DialogTitle>
      <div className="pattern-library">
        <div className="pattern-library__column">
            <div className="column__header">
              Oscillators
            </div>
            <div className="column__body">
              {oscillators}
            </div>
        </div>
        <div className="pattern-library__column">
            <div className="column__header">
              Spaceships
            </div>
            <div className="column__body">
              {spaceships}
            </div>
        </div>
      </div>
    </Dialog>
  );
}
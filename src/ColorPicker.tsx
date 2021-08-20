import * as React from 'react';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

export { ColorPicker }

interface ColorPickerProps {
  onClick: Function
}

interface ColorPickerState {
  anchorEl: HTMLButtonElement | null
}

class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  openPopover = (event: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState({
      anchorEl: event.currentTarget
    })
  };

  closePopover = (): void => {
    this.setState({
      anchorEl: null
    })
  };

  colors = ["#EDAE49", "#D1495B", "#00798C", "#30638E", "#437198", "black"].map((color => {
    let styles = { backgroundColor: color};
    return (
      <div
        className="color-picker-body__swatch"
        onClick={() => {this.props.onClick(color); this.closePopover()}}
        key={color}
        style={styles}
      ></div>
    );
  }))

  render() {
    return (
      <>
        <IconButton aria-describedby="color-picker" aria-label="color-picker-button" onClick={this.openPopover}>
          <ColorLensIcon />
        </IconButton>
        <Popover
          id="color-picker"
          open={!!this.state.anchorEl}
          anchorEl={this.state.anchorEl}
          onClose={this.closePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className="color-picker-body">
            {this.colors}
          </div>
        </Popover>
      </>
    )
  }
}

import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import cloneDeep from 'lodash/cloneDeep';
import CountdownTimer from "./CountdownTimer";
import './GameBox.css';

class GameBox extends Component {
  constructor(props) {
    super(props);
    // init state
    this.initState = {
      currentStage : 1, 
      result : "continue", 
      colorSelected : ""
    };
    this.initState.boxesProps = cloneDeep(this.props.boxes);

    this.state = cloneDeep(this.initState);
    // gamebox click bind
    this.gameBoxClick = this.gameBoxClick.bind(this);
    // reset click bind
    this.resetClick = this.resetClick.bind(this);
  }

  // reset state function
  resetState() {
    this.initState.boxesProps = cloneDeep(this.props.boxes);
    this.setState(this.initState);
  }

  stage1Condition(color) {
    let stateUpdate = {result: "lose"};

    if (color === "white") {
      this.state.boxesProps.push({stage : 2, box : [{ color: 'white' }, { color: 'orange' }]});
      stateUpdate = {
        currentStage : 2,
        result: "continue"
      };
    } else if (color === "red") {
      this.state.boxesProps.push({stage : 2, box : [{ color: 'black' }, { color: 'red' }]});
      stateUpdate = {
        currentStage : 2,
        result: "continue"
      };
    }

    return stateUpdate;
  }

  stage2Condition(color) {
    let stateUpdate = {result: "lose"};

    if (color === "orange"  || color === "black") {
      stateUpdate = {
        currentStage : 3,
        result: "continue",
        boxesProps : [{stage : 3, box : [{ color: 'green' }, { color: 'orange' }, { color: 'black' }]}]
      };
    } else if (color === "white") {
      this.state.boxesProps.push({stage : 2, box : [{ color: 'black' }, { color: 'red' }]});
      stateUpdate = {
        currentStage : 2,
        result: "continue",
      };
    } 
    
    return stateUpdate;
  }

  stage3Condition(color) {
    let stateUpdate = {result: "lose"};

    if (color === "black") {
      stateUpdate = {};
    } else if (color === "green" || color === "orange") {
      stateUpdate = {
        currentStage : 4,
        result: "continue",
        boxesProps : [{stage : 4, box : [{ color: 'green' }, { color: 'orange' }]}],
        colorSelected : color
      };
    } 
    
    return stateUpdate;
  }

  stage4Condition(color) {
    let stateUpdate = {result: "lose"};

    if (color === this.state.colorSelected) {
      stateUpdate = {
        result: "win"
      };
    } 

    return stateUpdate;
  }

  // reset click
  resetClick() {
    this.resetState();
  }

  // gamebox click
  gameBoxClick(color) {
    let stateUpdate = {result: "lose"};

    switch (this.state.currentStage) {
      case 1:
        stateUpdate = this.stage1Condition(color);
        break;
      case 2:
        stateUpdate = this.stage2Condition(color);
        break;
      case 3:
        stateUpdate = this.stage3Condition(color);
        break;
      case 4:
        stateUpdate = this.stage4Condition(color);
        break;
      default:
        stateUpdate = {result: "lose"};
    }

    this.setState(state => (stateUpdate));
  }

  // create row
  renderRow(boxes) {
    return boxes.map((obj, key) => (
      <Grid key={obj.stage + "-" + key} container direction="row" justify="flex-start" alignItems="center" spacing={3}>
        {this.renderBox(obj, boxes.length - 1, key)}
      </Grid>
    ));
  }

  // create column and box
  renderBox(obj, length, key) {
    if (length === key) {
      obj.box = this.shuffleArray(obj.box);
    }
    return obj.box.map((box, index) => (
      <Grid key={obj.stage + "-" + key + "-" + index} item xs={4} sm={3} md={2}>
        <Box onClick={this.gameBoxClick.bind(this, box.color)} className={box.color} border={1} p={2} m={1}>
          &nbsp;
        </Box>
      </Grid>
    ));
  }

  // shuffle the array boxes
  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  Win() {
    return (
      <div>
        <h1>You Win!</h1>
        <Button onClick={this.resetClick} variant="contained">
          Play Again
        </Button>
      </div>
    );
  }

  GameOver(seconds) {
    return (
      <div>
        <h1>Game Over!</h1>
        <CountdownTimer seconds={seconds} />
      </div>
    );
  }

  render() {
    const result = this.state.result;

    if (result === "continue") {
      return (
        <Container fixed>
          {this.renderRow(this.state.boxesProps)}
        </Container>
      );
    } else if (result === "win") {
      return (
        <Container fixed>
          {this.Win()}
        </Container>
      );
    } else {
      let seconds = 3000;

      setTimeout(
        function() {
          this.resetState();
        }
        .bind(this),
        seconds
      );
      return (
        <Container fixed>
          {this.GameOver(seconds)}
        </Container>
      );
    }
  }
}

export default GameBox;
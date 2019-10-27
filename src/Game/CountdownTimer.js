import React, { Component } from 'react';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    // init state
    this.state = {
      countdown : this.props.seconds
    };
  }

  componentDidMount() {
      this.interval = setInterval(() => {
          this.setState({ countdown : this.state.countdown - 1000 });
      }, 1000);
  }

  componentWillUnmount() {
      if (this.interval) {
          clearInterval(this.interval);
      }
  }

  render() {
      const { countdown } = this.state;

      return (
          <div>
            <p>Will reset in {countdown / 1000} seconds.</p>
          </div>
      );
  }
}

export default CountdownTimer;
import React, { Component } from "react";

//https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

export default function withWindowDimensions(WrappedComponent) {
  return class extends Component {
    state = { width: 0, height: 0 };

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
          isMobileSized={this.state.width < 992}
        />
      );
    }
  };
}
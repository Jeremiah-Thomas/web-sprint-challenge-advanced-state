import React from "react";
import { connect } from "react-redux";
import {
  moveClockwise,
  moveCounterClockwise,
} from "./../state/action-creators";

function Wheel(props) {
  const handleClockwise = () => {
    if (props.index === 5) {
      props.moveClockwise(0);
    } else {
      props.moveClockwise(props.index + 1);
    }
  };

  const handleCounterClockwise = () => {
    if (props.index === 0) {
      props.moveCounterClockwise(5);
    } else {
      props.moveCounterClockwise(props.index - 1);
    }
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        <div
          className={`cog ${props.index === 0 ? "active" : ""}`}
          style={{ "--i": 0 }}
        >
          {props.index === 0 && "B"}
        </div>
        <div
          className={`cog ${props.index === 1 ? "active" : ""}`}
          style={{ "--i": 1 }}
        >
          {props.index === 1 && "B"}
        </div>
        <div
          className={`cog ${props.index === 2 ? "active" : ""}`}
          style={{ "--i": 2 }}
        >
          {props.index === 2 && "B"}
        </div>
        <div
          className={`cog ${props.index === 3 ? "active" : ""}`}
          style={{ "--i": 3 }}
        >
          {props.index === 3 && "B"}
        </div>
        <div
          className={`cog ${props.index === 4 ? "active" : ""}`}
          style={{ "--i": 4 }}
        >
          {props.index === 4 && "B"}
        </div>
        <div
          className={`cog ${props.index === 5 ? "active" : ""}`}
          style={{ "--i": 5 }}
        >
          {props.index === 5 && "B"}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    index: state.wheel.index,
  };
};

export default connect(mapStateToProps, {
  moveClockwise,
  moveCounterClockwise,
})(Wheel);

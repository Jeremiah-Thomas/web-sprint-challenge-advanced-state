// ❗ You don't need to add extra action creators to achieve MVP

import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";
import axios from "axios";

export function moveClockwise(newIndex) {
  return { type: MOVE_CLOCKWISE, payload: newIndex };
}

export function moveCounterClockwise(newIndex) {
  return { type: MOVE_COUNTERCLOCKWISE, payload: newIndex };
}

export function selectAnswer(answerId) {
  return { type: SET_SELECTED_ANSWER, payload: answerId };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(newQuiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: newQuiz };
}

export function inputChange(input) {
  return { type: INPUT_CHANGE, payload: input };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch((err) => console.log(err.message));
  };
}
export function postAnswer(ans) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    console.log(ans);
    axios
      .post("http://localhost:9000/api/quiz/answer", ans)
      .then((res) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => dispatch(setMessage(err.response.data.message)));
  };
}
export function postQuiz(quiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    console.log(quiz);
    axios
      .post("http://localhost:9000/api/quiz/new", quiz)
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${res.data.question}" is a great question!`)
        );
      })
      .catch((err) => dispatch(setMessage(err.response.data.message)));
    dispatch(resetForm());
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

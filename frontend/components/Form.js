import React from "react";
import { connect } from "react-redux";
import { postQuiz, inputChange, resetForm } from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    props.inputChange({ [evt.target.id]: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz({
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    });
  };

  const checkDisabled = () => {
    if (
      props.form.newQuestion &&
      props.form.newTrueAnswer &&
      props.form.newFalseAnswer
    ) {
      if (
        props.form.newQuestion.trim().length > 0 &&
        props.form.newTrueAnswer.trim().length > 0 &&
        props.form.newFalseAnswer.trim().length > 0
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn" disabled={checkDisabled()}>
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.infoMessage,
    form: state.form,
  };
};

export default connect(mapStateToProps, { postQuiz, inputChange, resetForm })(
  Form
);

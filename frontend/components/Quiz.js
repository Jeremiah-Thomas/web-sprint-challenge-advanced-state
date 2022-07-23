import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchQuiz,
  selectAnswer,
  postAnswer,
} from "./../state/action-creators";

function Quiz(props) {
  useEffect(() => {
    if (!props.quiz) {
      props.fetchQuiz();
    }
  }, []);

  const handleSelect = (e) => {
    props.selectAnswer(e.target.name);
  };

  const handleSubmit = () => {
    props.postAnswer({
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectedAnswer,
    });
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."

        props.quiz !== null ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              {props.quiz.answers.map((answer) => {
                return (
                  <div
                    className={`answer ${
                      props.selectedAnswer === answer.answer_id
                        ? "selected"
                        : ""
                    }`}
                    key={answer.answer_id}
                  >
                    {answer.text}
                    <button onClick={handleSelect} name={answer.answer_id}>
                      {props.selectedAnswer === answer.answer_id
                        ? "SELECTED"
                        : "Select"}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              id="submitAnswerBtn"
              onClick={handleSubmit}
              disabled={props.selectedAnswer ? false : true}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
})(Quiz);

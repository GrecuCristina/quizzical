import Answer from "./Answer";

export default function Question(props) {
  const answersEl = props.question.answers.map((answer) => {
    return (
      <Answer
        onClick={() => props.selectAnswer(props.question.id, answer.id)}
        question={props.question}
        key={answer.id}
        text={answer.text}
        checked={props.question.selectedAnswer === answer.id ? true : false}
        blurry={
          props.showCorrectAnswers &&
          props.question.correctAnswerId !== answer.id
            ? true
            : false
        }
        correct={
          props.showCorrectAnswers &&
          props.question.correctAnswerId === answer.id
            ? true
            : false
        }
        wrong={
          props.showCorrectAnswers &&
          props.question.correctAnswerId !== answer.id &&
          props.question.selectedAnswer === answer.id
            ? true
            : false
        }
      ></Answer>
    );
  });
  return (
    <div className="question-container">
      <p className="question-text">{props.question.text}</p>
      <div className="answer-container">{answersEl}</div>
    </div>
  );
}

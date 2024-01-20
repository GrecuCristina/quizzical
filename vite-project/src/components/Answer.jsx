import classNames from "classnames";

export default function Answer(props) {
  return (
    <div
      onClick={props.onClick}
      className={classNames("answer", {
        blurry: props.blurry,
        wrong: props.wrong,
        correct: props.correct,
        "checked-answer": props.checked,
        disabled: props.showCorrectAnswers,
      })}
    >
      {props.text}
    </div>
  );
}

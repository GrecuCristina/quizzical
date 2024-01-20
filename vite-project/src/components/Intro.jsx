export default function Intro(props) {
  return (
    <div className="intro">
      <h1 className="intro-description">Quizzical</h1>
      <p className="intro-text">Trivia game</p>
      <button className="btn intro-btn" onClick={props.onClick}>
        Start quiz
      </button>
    </div>
  );
}

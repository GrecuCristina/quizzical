import React from "react";
import Question from "./Question";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import Loader from "./Loader";

export default function Quiz() {
  console.log("QUIZ");
  const [questions, setQuestions] = React.useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  console.log("questions=", questions);

  function shuffleArr(arr) {
    // for (let i = 0; i < arr.length; i++) console.log("shuffle arr", arr[i]);
    const shuffledArr = [];
    while (arr.length) {
      const randomId = Math.floor(Math.random() * arr.length);
      shuffledArr.push(arr[randomId]);
      arr.splice(randomId, 1);
    }
    return shuffledArr;
  }
  function get5Questions() {
    fetch("https://opentdb.com/api.php?amount=5&category=14")
      .then((res) => res.json())
      .then((data) => {
        const decodedData = data.results.map((result) => {
          const decodedResult = {
            correct_answer: decode(result.correct_answer),
            question: decode(result.question),
            incorrect_answers: result.incorrect_answers.map((ans) =>
              decode(ans)
            ),
          };
          // console.log("decoded result =", decodedResult);
          const correctAnswerId = nanoid();
          const incorrectAnswers = decodedResult.incorrect_answers.map(
            (incorrectAnswer) => {
              return {
                id: nanoid(),
                text: incorrectAnswer,
              };
            }
          );
          // console.log("incorrect answers", incorrectAnswers);

          const answers = [
            { id: correctAnswerId, text: decodedResult.correct_answer },
            ...incorrectAnswers,
          ];

          return {
            id: nanoid(),
            question: decodedResult.question,
            answers: answers,
            correctAnswerId: correctAnswerId,
          };
        });
        console.log("decoded arr", decodedData);

        const questionsWithShuffledAnswers = decodedData.map((data) => {
          //  console.log("in map");
          return {
            id: data.id,
            text: data.question,
            correctAnswerId: data.correctAnswerId,
            answers: shuffleArr(data.answers),
            selectedAnswer: null,
          };
        });

        // console.log(questionsWithShuffledAnswers);
        setQuestions(questionsWithShuffledAnswers);
        setIsLoading(false);
        return questionsWithShuffledAnswers;
      });
  }
  React.useEffect(() => {
    get5Questions();
  }, []);

  const questionsEl = questions.map((question) => {
    return (
      <Question
        key={question.id}
        question={question}
        showCorrectAnswers={showCorrectAnswers}
        selectAnswer={selectAnswer}
      ></Question>
    );
  });
  function selectAnswer(questionId, answerId) {
    setQuestions((oldQuestions) => {
      return oldQuestions.map((oldQuestion) => {
        return {
          ...oldQuestion,
          selectedAnswer:
            questionId === oldQuestion.id
              ? answerId
              : oldQuestion.selectedAnswer,
        };
      });
    });
  }

  function hasAllSelectedAnswers() {
    const numberOfAnsweredQuestions = questions.filter(
      (question) => question.selectedAnswer
    ).length;
    if (numberOfAnsweredQuestions === questions.length) {
      setShowCorrectAnswers(true);
    }
  }
  function getUsersTotalNumberOfCorrectAnswers() {
    let countTotalCorrectAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAnswerId === questions[i].selectedAnswer) {
        countTotalCorrectAnswers++;
      }
    }
    return countTotalCorrectAnswers;
  }
  return (
    <>
      {!isLoading ? (
        <>
          {questionsEl}

          {!showCorrectAnswers ? (
            <>
              <button className="btn check-btn" onClick={hasAllSelectedAnswers}>
                Check answers
              </button>
            </>
          ) : (
            <div className="new-game-container">
              <p>
                `You scored {getUsersTotalNumberOfCorrectAnswers()}/
                {questions.length} correct answers`
              </p>
              <button
                className="btn check-btn"
                onClick={() => {
                  get5Questions();
                  setShowCorrectAnswers(false);
                  setIsLoading(true);
                }}
              >
                Play again
              </button>
            </div>
          )}
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}

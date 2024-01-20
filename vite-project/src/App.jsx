import React from "react";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";

export default function App() {
  const [pageRendered, setPageRendered] = React.useState("intro");

  function changePageRendered(text) {
    setPageRendered(text);
  }
  console.log("page rendered = ", pageRendered);

  return (
    <main>
      {pageRendered === "intro" ? (
        <Intro onClick={() => changePageRendered("quiz")}></Intro>
      ) : (
        <Quiz></Quiz>
      )}
    </main>
  );
}

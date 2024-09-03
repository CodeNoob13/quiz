import React from "react";
import ReactDOM from "react-dom";


export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState('')
  
  function onHandle(answer) {
    if (props.isSubmitted === false) {
    setSelectedAnswer(answer)
    props.handleAnswer(props.id, answer)
    }
  }
  
  return (
    <div>
      <h1>{props.question}</h1>
      <ul>
        {props.answer.map((answer, index) => {
         return( 
          <>
          <li key={index} className={`
            ${selectedAnswer === answer ? "selected" : ''}
            ${props.isSubmitted && selectedAnswer === answer && answer === props.correctAnswer ? "correct" : ''}
           ${props.isSubmitted && selectedAnswer === answer && answer !== props.correctAnswer ? "incorrect" : ''}
             ${props.isSubmitted && props.correctAnswer === answer && answer !== selectedAnswer ? 'thisoneiscorrect' : ''}
            `}>
            <input 
              type="radio"
              name={`question-${props.id}`}
              id={`q${props.id}-a${index}`}
              value={answer}
              onClick={() => onHandle(answer)}
            />
          <label htmlFor={`q${props.id}-a${index}`}>{answer}</label>
          </li>
          </>)
        })}
      </ul>
    </div>
  );
}
 
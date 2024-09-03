import React from "react"
import ReactDOM from "react-dom"
import Main from "./components/Main"
import Question from "./components/Question"


export default function App() {
    const [page, setPage] = React.useState(false)
    const [reset, setReset] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    
    function handleClick() {
        setPage(!page)
    }
    
    function resetQuiz() {
        setReset(!reset)
    }
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => {
        const shuffledQuestions = data.results.map(data => {
            const allAnswers = shuffle([...data.incorrect_answers, data.correct_answer])
            return {...data, answers: allAnswers}
        })
            setQuestions(shuffledQuestions)
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            setQuestions([]);
        })
    }, [reset])
    
    function handleAnswer(id,answer) {
        setUserAnswers(prev => {
            return {...prev,
             [id]:answer
        }})
    }
    
    function shuffle(array) {
        return array.sort((a, b) => 0.5 - Math.random())
    }

    const quiz = questions.map((data, index) => {
        return (<Question 
            question={data.question}
            answer={data.answers}
            id={index}
            handleAnswer={handleAnswer}
            correctAnswer={data.correct_answer}
            isSubmitted={isSubmitted}
        />)
    })

    

    const keysArray = Object.keys(userAnswers)
    
    function submitForm(e) {
        e.preventDefault()
        
        setIsSubmitted(!isSubmitted)
        let score = 0;
        for (const answer in userAnswers) {
            questions.find(questions => questions.correct_answer === userAnswers[answer]) ? 
            score++ : ''
        }
         !isSubmitted ? console.log(`You've got ${score} correct!`) : ''
    }

   return ( 
        <div className="main">
        <img className="blob-left" src="images/blobs-left.png" />
        <img className="blob-right" src="images/blobs-right.png" />
        {!page ? <Main handleClick={handleClick}/> : <form onSubmit={submitForm}>
        {quiz}
        {!isSubmitted ? <button disabled={keysArray.length < 5}>Submit answers</button> : <button onClick={resetQuiz}>Go again!</button>}
        </form>}
        </div>
        )
}
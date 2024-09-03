
            
import React from "react"
import ReactDOM from "react-dom"

export default function Question(props) {
   return  ( 
    <main className="main-screen">
        <h1>Quizzical</h1>
        <p className="description">Some description if needed</p>
        <button onClick={props.handleClick}>Start quiz</button>
    </main>
        )
}


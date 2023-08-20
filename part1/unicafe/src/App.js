import { useState } from 'react'

const Heading = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, all, text}) => {
  if (all !== 0){
    return (
      <>
        <p>{text[0]} {good}</p>
        <p>{text[1]} {neutral}</p>
        <p>{text[2]} {bad}</p>
        <p>{text[3]} {all}</p>
        <p>{text[4]} {(good - bad) / all}</p>
        <p>{text[5]} {(good / all) * 100} %</p>
      </>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackHeading = "give feedback";
  const statsHeading = "statistics";
  const text = ["good", "neutral", "bad", "all", "average", "positive"];
  const func = [() => setGood(good + 1), () => setNeutral(neutral + 1), () => setBad(bad + 1)]

  return (
    <div>
      <Heading text={feedbackHeading} />
      <div styles="display: inline-block">
        <Button handleClick = {func[0]} text = {text[0]}/>
        <Button handleClick = {func[1]} text = {text[1]}/>
        <Button handleClick = {func[2]} text = {text[2]}/>
      </div>
      <Heading text={statsHeading} />
      <Statistics good = {good} neutral= {neutral} bad = {bad} all = {good + bad + neutral} text = {text}/>
    </div>
  )
}

export default App
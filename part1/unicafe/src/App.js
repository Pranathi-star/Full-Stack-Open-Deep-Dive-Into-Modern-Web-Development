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

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if (all !== 0){
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={(good - bad) / all}/>
          <StatisticLine text="positive" value={(good * 100) / all + " %" }/>
        </tbody>
      </table>
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
  const func = [() => setGood(good + 1), () => setNeutral(neutral + 1), () => setBad(bad + 1)]

  return (
    <div>
      <Heading text={feedbackHeading} />
      <div styles="display: inline-block">
        <Button handleClick = {func[0]} text = "good"/>
        <Button handleClick = {func[1]} text = "neutral"/>
        <Button handleClick = {func[2]} text = "bad"/>
      </div>
      <Heading text={statsHeading} />
      <Statistics good = {good} neutral= {neutral} bad = {bad} all = {good + bad + neutral} />
    </div>
  )
}

export default App
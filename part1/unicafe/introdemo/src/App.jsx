import {useState} from 'react'

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = (props) => {
  return <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.sufix}</td>
    </tr>
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
      No feedback given
      </div>
    )
  }
  return <table>
    <tbody>
      <StatisticLine text = "good" value = {props.good} sufix = ""/>
      <StatisticLine text = "neutral" value = {props.neutral} sufix = "" />
      <StatisticLine text = "bad" value = {props.bad} sufix = "" />
      <StatisticLine text = "total" value = {props.total} sufix = "" />
      <StatisticLine text = "average" value = {props.average} sufix = "" />
      <StatisticLine text = "positive" value = {props.positivePercent} sufix = "%" />
    </tbody>
  </table>   
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0.0)
  const [feedback, setFeedback] = useState(0.0)
  const [positivePercent, setPositivePercent] = useState(0.0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)

    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)

    const updatedFeedback = feedback + 1
    setFeedback(updatedFeedback)
    
    setAverage(updatedFeedback/updatedTotal)
    setPositivePercent(updatedGood / updatedTotal * 100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedTotal = good + updatedNeutral + bad
    setTotal(updatedTotal)

    const updatedFeedback = feedback + 0
    setFeedback(updatedFeedback)
    
    setAverage(updatedFeedback/updatedTotal)
    setPositivePercent(good / updatedTotal * 100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedTotal = good + neutral + updatedBad
    setTotal(updatedTotal)

    const updatedFeedback = feedback - 1
    setFeedback(updatedFeedback)
    
    setAverage(updatedFeedback/updatedTotal)
    setPositivePercent(good / updatedTotal * 100)
  }

  return (
    <div>
      <h1>give feedback here</h1> 
      <Button text="Good" onClick={handleGoodClick} />
      <Button text="Neutral" onClick={handleNeutralClick} />
      <Button text="Bad" onClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positivePercent={positivePercent} />
    </div>
  )
}

export default App
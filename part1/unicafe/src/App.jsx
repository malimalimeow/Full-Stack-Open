import { useState } from 'react'

const FeedBackButton = (props) => {

  return (
    <button onClick={() => props.setter(prev => prev + 1)}>{props.innerText}</button>
  )

}

const StatisticLine = ({ innerText, result }) => {

  return (
    <tr>
      <td>{innerText}</td>
      <td>{result}</td>
    </tr>
  )

}




const Statistic = (props) => {

  const { good, neutral, bad } = props.feedback

  const scores = good * 1 + neutral * 0 + bad * -1
  const count = good + neutral + bad
  const avg = scores / count
  const percentage = (((good / count) * 100) || 0) + "%"
  const isFeedBack = good > 0 || neutral > 0 || bad > 0

  return (
    <div>
      <h1>statistics</h1>
      {isFeedBack ?
        <div className="result-container">
          <table>
            <tbody>
              <StatisticLine innerText="good" result={good} />
              <StatisticLine innerText="neutral" result={neutral} />
              <StatisticLine innerText="bad" result={bad} />
              <StatisticLine innerText="all" result={count} />
              <StatisticLine innerText="average" result={avg} />
              <StatisticLine innerText="positive" result={percentage} />
            </tbody>
          </table>
        </div> : "No feedback given"}


    </div>
  )


}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const feedback = { good, neutral, bad }


  return (
    <div>
      <header><h1>give feedback</h1></header>

      <div>
        <FeedBackButton innerText="good" setter={setGood} />
        <FeedBackButton innerText="neutral" setter={setNeutral} />
        <FeedBackButton innerText="bad" setter={setBad} />
      </div>

      <Statistic feedback={feedback} />


    </div>
  )
}

export default App
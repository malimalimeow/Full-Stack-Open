import { useState } from 'react'

const AnecdotesResult = (props) => {


  return (
    <div>
      <p>{props.anecdotes[props.selected]}</p>
      <p>has {props.vote[props.selected] || 0} vote</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const len = anecdotes.length
  console.log(len)

  const randomNumberGeneration = (max) => {
    return Math.floor(Math.random() * max)
  }

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({})
  console.log(vote)
  console.log(selected)

  const updateVote = (index) => {
    const copy = { ...vote }
    copy[index] = (copy[index] || 0) + 1
    setVote(copy)
  }
  
  let largest = null
  if (Object.keys(vote).length>0)
  {largest = Object.keys(vote).reduce((a, b) => vote[a] > vote[b] ? a : b)}
 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdotesResult selected={selected} anecdotes={anecdotes} vote={vote} />

      <div>
        <button onClick={() => updateVote(selected)}>vote</button>
        <button onClick={() => setSelected(randomNumberGeneration(len))}>next anecdotes</button>
      </div>

    {largest!==null &&
    <div>
      <h1>Anecodote with most votes</h1>
      <AnecdotesResult selected={largest} anecdotes={anecdotes} vote={vote} /> </div>}

    </div>
  )
}

export default App
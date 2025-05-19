
import {useState} from 'react'

const Button = ({text, action}) => <button onClick={action}>{text}</button>

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
  
  const votes = {}

  for (let i = 0; i < anecdotes.length; i++) {
    const nameOfField = String(i)
    votes[nameOfField] = 0
  }

  
  const [selected, setSelected] = useState(0)
  const [votedAnecdote, setAnecdoteVotes] = useState(votes)
  const [maxVotedAnecdote, setMaxVotedAnecdote] = useState(-1)


  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  const getNextAnecdote = () => {
    const updatedSelected = getRandomInt(anecdotes.length )
    setSelected(updatedSelected)
  }

  const voteForAnecdote = () => {
    const copy = {...votedAnecdote}
    copy[selected] += 1
    setAnecdoteVotes(copy)
    getTheHighesVotedAnecdote(copy)
  }


  const getTheHighesVotedAnecdote = (copy) => {
    const listOfValues = Object.values(copy)
    console.log(listOfValues);
    const max = Math.max(...listOfValues)
    console.log(max)
    
    const indexOfMaxValue = listOfValues.findIndex((element) => element === max)

    setMaxVotedAnecdote(indexOfMaxValue)
  }

  return (
    <div>
      {anecdotes[selected]} <br />
      has {votedAnecdote[selected]} votes <br />
      <Button text='vote' action={voteForAnecdote} />
      <Button text='next anecdote' action={getNextAnecdote} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVotedAnecdote]} 
    </div>
  )
}

export default App
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Title = ({text}) => {
  return <h2>{text}</h2>
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const DisplayMajorAnecdote = ({anecdotes, votes}) =>{
  let max = Math.max(...votes)
  let index = votes.indexOf(max)

  if(max === 0){
    return (
      <p>There are not votes</p>
    )
  }
  return (
    <>
      <Title text="Anecdote with most votes"/>
      <p>{anecdotes[index]}</p>
      <p><strong>has {max} votes</strong></p>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleAnecdotes = () =>{
    let random = Math.floor(Math.random() * anecdotes.length)

    if(random === selected && random === anecdotes.length - 1)       
      random -= 1
    else if(random === selected) 
      random += 1

    setSelected(random)
  }

  const handleVotes = () => {
    let copyVotes = [...votes]
    copyVotes[selected] += 1

    setVotes(copyVotes)
  }

  return (
    <div>
      <Title text="Anecdotes of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>votes: {votes[selected]}</p>
      <Button text="vote" handleClick={handleVotes} />
      <Button text="next anecdote" handleClick={handleAnecdotes}/>
      <DisplayMajorAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);

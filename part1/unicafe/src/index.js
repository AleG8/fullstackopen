import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Title = ({text}) => 
  <h1>{text}</h1>;

const Button = ({text, handleClick}) => 
  <button onClick={handleClick}>{text}</button>;

const Statistics = ({text, value}) => {
  return (
    <>
      <th style={{textAlign: 'left'}}>{text}</th>
      <td>{value}</td>
    </>
  )
}
  

const AllStatistics = ({values: {good, neutral, bad, allVotes, average, positive}}) => {

  if(!good && !neutral && !bad){
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <tr><Statistics text='Good' value={good}/></tr>
        <tr><Statistics text='Neutral' value={neutral}/></tr>
        <tr><Statistics text='Bad' value={bad}/></tr>
        <tr><Statistics text='All' value={allVotes}/></tr>
        <tr><Statistics text='Average' value={average}/></tr>
        <tr><Statistics text='Positive' value={positive}/></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  let allVotes = good + neutral + bad;
  let average = ((good-bad) / allVotes).toFixed(1);
  let positive = `${((good / allVotes) * 100).toFixed(1)}%`;

  return (
    <div>
      <Title text='Give feedback'/>
      <Button text='good' handleClick={()=> setGood(good + 1)}/>
      <Button text='neutral' handleClick={()=> setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={()=> setBad(bad + 1)}/>
      <br/>
      <Title text='Statistics'/>
      <AllStatistics 
      values={{good, neutral, bad, allVotes, average, positive}} 
      />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

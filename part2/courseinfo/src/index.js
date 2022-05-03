import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Title = ({title}) => <div> <h1>{title}</h1> </div>

const SubTitle = ({title}) => <div> <h2>{title}</h2> </div>

const Part = ({content: {name, exercises}}) => {
  return (
      <div>
          <p>{name} {exercises}</p>
      </div>
  )
}

const Content = ({content}) => {

  return (
    <div>
      {
        content.map(part => <Part content={part} key={part.id}/>)
      }
    </div>
  )
}

const Total = ({total}) => {
  let totalSum = total.reduce((acc, curr) =>  acc + curr.exercises, 0);

  return (
    <div>
      <p><strong>Total exercises: {totalSum}</strong></p>
    </div>
  )
}

const Course = ({courseInfo}) => {
  
  return (
    <>
      <SubTitle title={courseInfo.name} />
      <Content content={courseInfo.parts} />
      <Total total={courseInfo.parts} />
    </>
  )
}

const Courses = ({courses}) => {
  
  return (
    <div>
      {
        courses.map((course, id) => <Course courseInfo={course} key={id}/>)
      }
    </div>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 15,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        }
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ]
    }
  ]
  

  return (
    <>
      <Title title='Web Development Curriculum' />
      <Courses courses={courses}/>
    </>
  )
  
}

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);


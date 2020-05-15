import React from 'react'
import ReactDOM from 'react-dom'

const Course=({course,cname})=>{
      return(
        <div>
           <h1>{cname}</h1> 
            {course.map(i=><li key={i.id}> {i.name} {i.exercises}</li>)}
        </div>
  
      )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course.parts} cname={course.name} />
    </div>
  )
}



ReactDOM.render(
  <App  />,
  document.getElementById('root')
)


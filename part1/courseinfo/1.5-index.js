import React from 'react';
import ReactDOM from 'react-dom';


const Header=(props)=>{
  return(
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
  }

const Content=()=>{
  return(
    <div>
      <Part part1={'Fundamentals of React'} exercises1={10}/>
      <Part part2={'Using props to pass data'} exercises2={7}/>
      <Part part3={'State of a component'} exercises3={14}/>
    </div>
  )
  }

const Part=(props)=>{
  return(
    <div>
       <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </div>
  )
}

const Total=(props)=>{
  return(
    <div>
    <p>Number of exercises {props.parts[0].exercises}+{props.parts[1].exercises}+{props.parts[2].exercises} </p>
    </div>
  )
  
}



const App=()=> {
  const course={
    name: 'Half Stack application development',
    parts : [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
   {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]
  }
  return(
    <div>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total   parts={course.parts}/>
  </div>
  )
}


ReactDOM.render(<App/>,document.getElementById('root'))
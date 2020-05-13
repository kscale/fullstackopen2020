import React, { useState } from 'react'
import ReactDOM from 'react-dom'




const Statistic = ({ text, value }) => {
    return (
       
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
  
    );
  }

const Statistics=({allClicks, good, neutral, bad })=>{
    let all = good + neutral + bad;
    let average = (good + bad * (-1)) / all;
    let positive = (good / all) * 100;
    if(allClicks===0){
        return(
            <div>
                <h2> No feedback given</h2>
            </div>
          
            )
        }

    return(
        <table>
         <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
          </tbody>
      </table>
    )
}
//<button onClick={()=>neutralClick()}>neutral</button>
//<button onClick={()=>badClick()}>bad</button>
const Button=({goodClick,neutralClick,badClick})=>{
   
  return(
      <div>
    <button onClick={goodClick}>good</button>
    <button onClick={neutralClick}>neutral</button>
    <button onClick={badClick}>bad</button>
    </div>
  )
    
       
        

}
const App = (props) => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAll] = useState(0)
    //对于一个统计数，是否需要/有没有必要将其设置状态？？

    const goodClick=()=>{
       setGood(good+1)
       setAll(allClicks+1)
    }

    const neutralClick=()=>{
        setNeutral(neutral+1)
        setAll(allClicks+1)
     }

    const badClick=()=>{
        setBad(bad+1)
        setAll(allClicks+1)
     }
    

    return (
      <div>
        <h1>give feedback</h1>
      

        <Button goodClick={goodClick} neutralClick={neutralClick} badClick={badClick}/>
        
        
        <h1>statistic  </h1>
        <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad} />
        
        

      </div>
    )
  }
  
  ReactDOM.render(<App />, 
    document.getElementById('root')
  )


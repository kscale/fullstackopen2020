import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Display=({allClicks,good,neutral,bad})=>{
   
    if(allClicks===0){
        return(
            <div>
                <h2> No feedback given</h2>
            </div>
          
            )
        }
     return(
         <div>
           
            good {good}<br/>
            neutral {neutral}<br/>
            bad {bad}<br/>
            all {good+neutral+bad} <br/>
            average {(good-bad)/(good+neutral+bad)}<br/>
            positive {good/(good+bad+neutral)}
         </div>
     )   
    
}

const Statistic=({good,neutral,bad})=>{
    return(
      <div>
        average {(good-bad)/(good+neutral+bad)}<br/>
        all {good+neutral+bad} <br/>
        positive {good/(good+bad+neutral)}
      </div>
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
        <Display allClicks={allClicks} good={good} neutral={neutral} bad={bad}></Display>
        

      </div>
    )
  }
  
  ReactDOM.render(<App />, 
    document.getElementById('root')
  )


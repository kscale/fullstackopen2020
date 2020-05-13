import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    //对于一个统计数，是否需要/有没有必要将其设置状态？？

    const goodClick=()=>{
       setGood(good+1)
    }

    const neutralClick=()=>{
        setNeutral(neutral+1)
     }

    const badClick=()=>{
        setBad(bad+1)
     }
    
    

    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={()=>goodClick()}>good</button>
        <button onClick={()=>neutralClick()}>neutral</button>
        <button onClick={()=>badClick()}>bad</button>
      
            <h2>statistic</h2>
            good {good}<br/>
            neutral {neutral}<br/>
            bad {bad}<br/>
            average {(good-bad)/(good+neutral+bad)}<br/>
            all {good+neutral+bad} <br/>
            positive {good/(good+bad+neutral)}
        
        

      </div>
    )
  }
  
  ReactDOM.render(<App />, 
    document.getElementById('root')
  )


import React from 'react'



const Course=({cparts,cname})=>{
    //console.log({cparts})
    const total = cparts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises,0); 
        return(
            <div>
                 <h1>{cname}</h1> 
                {cparts.map(i=><li key={i.id}> {i.name} {i.exercises}</li>)}
                <h2>total of {total} exercises</h2>
            </div>
        )
    }

    export default Course
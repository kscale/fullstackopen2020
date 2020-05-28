import React from 'react'

const Persons=({persons,deletePerson})=>{
    return(
    persons.map(p=><li key={p.id}>{p.name} {p.number} <button onClick={() => deletePerson(p.id)}>delete</button></li>)
    )
}

export default Persons
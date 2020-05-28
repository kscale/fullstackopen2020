import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/services'



const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setStringFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
      })

  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }  

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }  

  const handleFilterStringChange = (event) => {
    setStringFilter(event.target.value)
  } 

  const addPerson=(event)=>{
    event.preventDefault()
    const found=persons.find(i=>i.name===newName)
    if(found){
        window.alert( `${newName} is already added to phonebook`)
    }
   
    else{  
            const personObject=
            {
                name:newName,
                number:newNumber
             }
     
        axios
        .post('http://localhost:3001/persons',personObject)
        .then(response=>{
          setPersons(persons.concat(personObject))
          setNewName('') 
          setNewNumber('')
        })
            }    
}


const personsToShow = filterString.length === 0 ?
  persons : 
  persons.filter(i=>i.name.toLowerCase().includes(filterString.toLowerCase()))

const deletePerson = (id) => {
  const toDelete = persons.find(p => p.id === id)
 console.log(toDelete)
  personService
  .remove(id)
  .then(() => {
    setPersons(persons.filter(p => p.id !== id));
  }).catch(()=>{
    setPersons(persons.filter(p => p.id !== id));
  })
}

return (
    <div>
      <h2>Phonebook</h2>

      filter shown with:<Filter  value={filterString} onChange={handleFilterStringChange} />

      <h3>Add a new</h3>

      <PersonForm 
       handleNameChange={handleNameChange}
       handleNumberChange={handleNumberChange}
       newNumber={newNumber}
       newName={newName}
       addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App


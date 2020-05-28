import React, { useState ,useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/services'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setStringFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
      })

  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
     
       personService
       .add(personObject)
      .then(response=>{
        setPersons(persons.concat(personObject))
        notifyWith(`add ${personObject.name}`)
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
  const ok = window.confirm(`Delete ${toDelete.name}`)
  if(ok){
  personService
  .remove(id)
  .then(() => {
    setPersons(persons.filter(p => p.id !== id));
    notifyWith(`Deleted ${toDelete.name}`)
  }).catch(()=>{
    setPersons(persons.filter(p => p.id !== id))
    notifyWith(`${toDelete.name} had already been removed`, 'error')
  })
}
}

return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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


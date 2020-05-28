import React, { useState ,useEffect} from 'react'
import axios from 'axios'



const SearchForm=(props)=>{
  return(
    <div>
      find <input onChange={props.handleSearchName}/>
    </div>
  )
}


const Persons=({persons,searchName,showAll})=>{
  const data=persons.filter(i=>i.name.toLowerCase().includes(searchName.toLowerCase()))

  console.log(data)

  if(showAll==true){
    return(
      <div>
      {persons.map(i=><li key={i.name}> {i.name} {i.number}</li> )} 
  
     </div>
    )
   
  }
  return(
   <div>
     {data.map(i=><li key={i.id}>{i.id} {i.name} {i.number}</li>)}
   </div>
  )
}




const App=()=>{

  const [persons,setPersons]=useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [showAll, setShowAll] = useState(true);

  

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
    })
  },[])

  const handleSearchName =(event)  => {
    setSearchName(event.target.value);
    setShowAll(false);
  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }
  const handleNumChange=(event)=>{
    setNewNumber(event.target.value)
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
 
        setPersons(persons.concat(personObject))
        setNewName('') 
        setNewNumber('')       
            }
}
  
  return(
    <div>
      <h1>phonebook</h1>
      <SearchForm  handleSearchName={handleSearchName}/>

    <h2>add person</h2>
    <form onSubmit={addPerson}>
        <div>
          name: <input  value={newName} onChange={handleNameChange} />
          number:<input value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>

      <h1>Numbers</h1>
      < Persons persons={persons} searchName={searchName} showAll={showAll}/>

      
     {searchName}
    </div>
  )
}

export default App
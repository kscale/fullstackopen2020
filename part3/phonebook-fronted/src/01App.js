import React, { useState ,useEffect} from 'react'
import axios from 'axios'

//专门的过滤功能

const SearchForm=(props)=>{
  return(
    <div>
      find <input onChange={props.handleSearchName}/>
    </div>
  )
}
//  {persons.map(i=><li key={i.name}>{i.id} {i.name} {i.number}</li> )} 对其进行结构

const Persons=({persons,searchName,showAll})=>{
  const data=persons.filter(i=>i.name.toLowerCase().includes(searchName.toLowerCase()))

  console.log(data)

  if(showAll==true){
    return(
      <div>
      {persons.map(i=><li key={i.name}>{i.id} {i.name} {i.number}</li> )} 
  
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



  return(
    <div>

      <SearchForm  handleSearchName={handleSearchName}/>

      <h1>Numbers</h1>
      < Persons persons={persons} searchName={searchName} showAll={showAll}/>

      
     {searchName}
    </div>
  )
}

export default App
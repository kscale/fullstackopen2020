import axios from 'axios'

const baseUrl='/api/persons'

 const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
  return response.data;

    }

 
const remove = (id) => {
  const url = `${baseUrl}/${id}`
  console.log(url)
  const request = axios.delete(url);
  return request.then(response=>response.data);

}

const add=(personObject)=>{
  const request=axios.post(baseUrl,personObject)
  return request.then(response=>response.data)
  
}


export default {getAll,remove,add}
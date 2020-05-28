const express = require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');

const url = 'mongodb+srv://dxq:000dxq@cluster0-c6u6c.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});


const Person = mongoose.model('Person', personSchema);

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('build'));
const cors=require('cors');
app.use(cors());

//自定义token
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

//按指定形式返回
app.use(morgan(':method :url - :body'));
/*
let persons = [
    {
      name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523',
      id: 2
    },
    {
      name: 'Dan Abramov',
      number: '12-43-234345',
      id: 3
    },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122',
      id: 4
    }
  ]

*/


app.get('/info', (req, res) => {
  date= Date();
  res.send( `<h1>Phonebook has info for ${persons.length} people </h1>
           ${date}          
            `);
});


/*
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
*/

personSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id=returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person);
  });

});


/*
app.get('/api/persons/:id',(req,res,)=>{
    const id = Number(req.params.id)
    const person=persons.find(p=>p.id == id)

    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})
*/
/*
app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons=persons.filter(person=>person.id !== id)


    res.status(204).end()
})
*/

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => res.json(person.toJSON()))
    .catch(error => next(error));
});

app.delete('/api/persons/:id',(req,res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});






/*
const gerenateId=(max) => {
  return Math.floor(Math.random()*Math.floor(max));
};

app.post('/api/persons',(req,res)=>{
    const body=req.body
    if(!body.name){
        return res.status(404).json({
            error:'content missing'
        })
    }

    if (!body.number) {
        return res.status(500).json({ error: 'number is missing' })
      }

    if(persons.find(el=>el.name=== body.name)){
        return res.status(500).json({error:'name must be unique'})
    }

    const person={
        name:body.name,
        number:body.number,
        id:gerenateId(9999),
    }

    persons=persons.concat(person)

    res.json(person)
})
*/
app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
    .catch(error => next(error));
});



//const PORT = 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express, { response } from "express";
import { PORT, MongoDbURL } from "./config.js";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const app = express()



app.use(express.json())

const client = new MongoClient(MongoDbURL,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const booksdb = client.db("mybookshop")
const myBooks = booksdb.collection("booksCollection")

app.listen(PORT, ()=>(
    console.log(`server started on port ${PORT}`)
))

app.get('/', (req, res)=> {
    res.status(202).send("<h1>Twin? Where have you been?</h1>")
})

app.get('/shop', (req, res)=> {
    
    myBooks.find().toArray()
    .then(response=>{
        //console.log(response)
        res.status(200).send(response)

    })
    .catch(error=> console.log(error))
    //route show all times
    //res.status(202). send("<h1> Nobody Knows me like you do</h1>")
})



app.get('/shop/:id', (req, res)=> {
    // Route show a specific id
    const data = req.params

    const filter = {
        "_id": new ObjectId(data.id)
        
    }

    myBooks.findOne(filter)
    .then(response=>{
        console.log(response)
        res.status(200).send(response)

    })
    .catch(error=> console.log(error))
    //res.status(202).send(`<a href='/'> Book: ${data.id}</a`)
})
app.post('/admin/savebook',(req, res)=>{
    // Route adds a new book
    const data = req.body
    if (!data.title)
    return res.status(400).send("No titloe found")

    if(!data.author)
    return res.status(400).send("No author found")

    if(!data.price)
    return res.status(400).send("No price found")
   
    myBooks.insertOne(data,(error,response)=>{
        if(error){
            console.log("an error has occured")
            res.sendStatus(500)
        }
    })
  
    return res.status(201).send(JSON.stringify(data))
})

app.delete('/admin/remove/:id',(req, res)=>{
    const data = req.params
    const filter = {
        "_id": new ObjectId(data.id)
        
    }

    myBooks.deleteOne(filter)
    .then(response=>{
        console.log(response)
        res.status(200).send(response)

    })
    .catch(error=> console.log(error))
}) 

app.put('/admin/update/:id',(req, res)=>{
    const data = req.params
    const docData = req.body
    const filter = {
        "_id": new ObjectId(data.id)
    }

    const updDoc = {
        $set:{
            //"price":data.price
            ...docData
        }
    }

    myBooks.updateOne(filter, updDoc)
    .then(response=>{
     res.status(200).send(response)
    })
    .catch(err=>console.log(err))
})
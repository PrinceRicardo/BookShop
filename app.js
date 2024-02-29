import express from "express";
import { PORT, MongoDbURL } from "./config.js";
import { MongoClient, ServerApiVersion } from "mongodb";
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
    res.status(202). send("<h1> Nobody Knows me like you do</h1>")
})




app.get('/shop/:id', (req, res)=> {
    const data = req.params
    res.status(202).send(`<a href='/'> Book: ${data.id}</a`)
})
app.post('/savebook',(req, res)=>{
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

import express from "express";
const app = express()

const PORT = 3000

app.use(express.json())

app.listen(PORT, ()=>(
    console.log(`server started on port ${PORT}`)
))

app.get('/', (req, res)=> {
    res.status(212).send("<h1>Twin? Where have you been?</h1>")
})

app.get('/shop', (req, res)=> {
    res.status(212). send("<h1> Nobody Knows me like you do</h1>")
})

app.get('/shop/:id', (req, res)=> {
    const data = req.params
    res.status(232).send(`<a href='/'> Book: ${data.id}</a`)
})
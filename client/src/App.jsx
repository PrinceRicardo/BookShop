import { useState } from 'react'
import ShowAll from './ShowAll'
import ShowBook from "./ShowBook"
import AddBook from "./AddBook"


function App() {
 

  return (
    <>
        <h1 className= 'text-amber-500 text-9xl text center'>Book Of Jujutsu</h1>
        <AddBook/>
        <ShowBook/>
        <ShowAll/>
    </>
  )
}

export default App

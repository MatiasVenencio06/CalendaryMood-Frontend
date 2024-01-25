import EmotionsList from './views/EmotionsList'
import Calendary from './views/Calendary'
import { useState } from 'react'

function App() {

  return (
    <div className='flex flex-row'>
      <Calendary/>
      <EmotionsList/>
    </div>
  )
}

export default App

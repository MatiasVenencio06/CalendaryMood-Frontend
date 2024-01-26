import EmotionsList from './views/EmotionsList'
import Calendary from './views/Calendary'

function App() {

  return (
    <div className='md:grid md:grid-cols-2 gap-10 flex-1 justify-center items-start m-auto flex flex-col'>
      <Calendary/>
      <EmotionsList/>
    </div>
  )
}

export default App

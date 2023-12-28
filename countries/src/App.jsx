import { useState } from 'react'
import CountrySearch from './components/CountrySearch'

const handleFilterNameChange = (event) => {
  console.log(event.target.value)
  // setFilterName(event.target.value)
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
    <h2>Phone book</h2>
    {/* <CountrySearch filterName={filterName} handleFilterNameChange={(event) => handleFilterNameChange(event)}></CountrySearch> */}
    </div>
    </>
  )
}

export default App

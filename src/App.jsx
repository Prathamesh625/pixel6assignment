import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddCustomer from './components/AddCustomer'
import CustomerList from './components/CustomerList'
import { Navbar } from './components/Navbar'

function App() {
  const [pageNo ,setPageNo] = useState(1)

  return (
    <div className='container'>
      <Navbar pageNo={pageNo} setPageNo={setPageNo} />
      {pageNo === 1 ? <AddCustomer setPageNo={setPageNo} />:<CustomerList/>}
      </div>
  )
}

export default App

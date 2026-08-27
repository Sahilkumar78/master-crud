
import './App.css'
import { Card } from './components/Card'
import {Routes , Route} from "react-router-dom"
import { Home } from '../pages/Home'
import { Create } from '../pages/Create'
import { Update } from '../pages/Update'
import { Delete } from '../pages/Delete'
import { Navbar } from './components/Navbar'

function App() {
  
  return (
     <>
     <Navbar />
     <Routes>
      <Route path= "/" element= {<Home />}/>
      <Route path= "/create" element ={<Create />} />
      <Route path='/update/:id' element= {<Update/>}/>
      {/* <Route path='/delete' element= {<Delete />}/> */}
     </Routes>

     </>
  )
}

export default App

import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './components/Signup'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route element={<Signup />} path="/" />
        {/* <Route element={<Count />} path="/count" /> */}
      </Routes>
      </BrowserRouter>
  )
}

export default App

import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import { Login, Signup } from './pages'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route path ="/home" element = {<Home />} />
            <Route path = "/" element = {<Login/>} />
            <Route path="/signup" element = {<Signup/>}/>
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import About from './Pages/about';
import Produto from './Pages/produto'
import { Navbar } from './components/Navbar';

function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/produto/:id' element={<Produto/>}/>
     </Routes>
     <Navbar/>
     </BrowserRouter>
    </div>
  );
}

export default App;

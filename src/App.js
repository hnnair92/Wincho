
import './App.css';
import Games from './Components/Games/Games';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Description from './Components/Description/Description';
import Loader from './Components/Loader/Loader';

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<Games/>}/>
          <Route path="/:category" element={<Games/>}/>
          <Route path="/game/:id" element={<Description/>}/>
          <Route path="/load" element={<Loader/>}/>
        </Routes>
      </Router>
      {/* <Games/> */}
    </div>
  );
}

export default App;

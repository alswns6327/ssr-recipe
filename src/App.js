import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Red from './components/Red';
import Blue from './components/Blue';
import Menu from './components/Menu';
import RedPage from './pages/RedPage';
import BluePage from './pages/BluePage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <div className="App">
      <Menu/>
      <hr/>
      <Routes>
        <Route path='/red' element={<RedPage/>}></Route>
        <Route path='/blue' element={<BluePage/>}></Route>
        <Route path='/users/*' element={<UsersPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

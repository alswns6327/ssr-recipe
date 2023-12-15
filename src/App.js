import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import loadable from '@loadable/component';


const RedPage = loadable(() => import('./pages/RedPage'));
const BluePage = loadable(() => import('./pages/BluePage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));

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

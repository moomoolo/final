import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import globalStore from './state/globalStore';

import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';


function App() {
  return (
    <Provider store={globalStore}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
    </Provider>
  );
}

export default App;

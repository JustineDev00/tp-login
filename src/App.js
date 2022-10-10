import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoggedScreen from './screens/LoggedScreen';
import AccountScreen from './screens/AccountScreen';
import AdminScreen from './screens/AdminScreen';
import { useContext } from 'react';
import {AuthContext} from './contexts/AuthContext';
import { deleteCookie } from './helpers/cookieHelper';


function App() {
  const {auth} = useContext(AuthContext); //
  const {setAuth} = useContext(AuthContext);

  return (
    <div className="App container container-fluid">


        <BrowserRouter>
        <div className='d-flex w-100 justify-content-center my-3'>

          <Link to='/' className='btn btn-primary mx-3'>Home</Link>
          {auth.role === 0 &&
            <Link to='/login' className='btn btn-primary mx-3'>Login</Link>}
          {auth.role === 1 && 
          <Link to='/admin' className='btn btn-primary mx-3'>Admin</Link>}
          {auth.role > 0 &&
          <Link to='/logged' className='btn btn-primary mx-3'>Logged</Link>}
          {auth.role > 0 && 
            <Link  to='/account' className='btn btn-primary mx-3'>Account</Link>}
          {auth.role > 0 && 
            <button className='btn btn-sm btn-danger mx-3' onClick={e => {
              setAuth({role : 0, id : 0});
              deleteCookie('blog');
              window.location.href = '/login'
            }}>LOGOUT</button>}
          
      </div>
          <Routes>
            <Route path='/' element={<HomeScreen/>}></Route>
            {auth.role === 0 &&
              <Route path='/login' element={<LoginScreen/>}></Route>}
            {auth.role === 1 && <Route path='/admin' element={<AdminScreen/>}></Route>}
            {auth.role > 0 &&
              <Route path='/logged' element={<LoggedScreen/>}></Route>}
            {auth.role > 0 &&
              <Route path='/account' element={<AccountScreen/>}></Route>}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

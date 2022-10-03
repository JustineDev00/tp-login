import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import LoggedScreen from './screens/LoggedScreen';
import AccountScreen from './screens/AccountScreen';
import AdminScreen from './screens/AdminScreen';

function App() {
  


  return (
    <div className="App container container-fluid">


        <BrowserRouter>
        <navbar className='d-flex w-100 justify-content-center my-3'>
          <Link to='/' className='btn btn-primary mx-3'>Home</Link>
          <Link to='/login' className='btn btn-primary mx-3'>Login</Link>
          <Link to='/admin' className='btn btn-primary mx-3'>Admin</Link>
          <Link to='/logged' className='btn btn-primary mx-3'>Logged</Link>
          <Link  to='/account' className='btn btn-primary mx-3'>Account</Link>
      </navbar>
          <Routes>
            <Route path='/' element={<HomeScreen/>}></Route>
            <Route path='/login' element={<LoginScreen/>}></Route>
            <Route path='/admin' element={<AdminScreen/>}></Route>
            <Route path='/logged' element={<LoggedScreen/>}></Route>
            <Route path='/account' element={<AccountScreen/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

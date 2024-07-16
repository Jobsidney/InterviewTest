import './App.css'
import Login from './Pages/Login'
import '../src/assets/css/app.min.css'
import '../src/assets/css/bootstrap.min.css'
import '../src/assets/css/icons.min.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Admin from './AdminPages/Admin'
import ErrorPage from './Pages/ErrorPage'
import ForgotPassword from './Pages/ForgotPassword'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard pages/Dashboard'
function App() {
  const navigate = useNavigate()

  const interval = setInterval(() => {
    userLogOut();
  }, 2000);

  function userLogOut(){
    const data = JSON.parse(localStorage.getItem('adminData') || localStorage.getItem('userData') || '{}');
    if(!Object.keys(data).length){
      return;
    }
    const loggedInTime =new Date(data.time);
    const now =  new Date();
    const timeDifference = now - loggedInTime;
    const timeDifferenceInMinutes = timeDifference / (10000000 * 60)
    if(timeDifferenceInMinutes > 20){
      navigate('/', {replace: true});
      localStorage.removeItem('userData')
      localStorage.removeItem('adminData')
      clearInterval(interval);
    }    
  }
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard/*' element={<Dashboard />} />        
      <Route path='/admin/*' element={<Admin/>} />        
      <Route path='/forgot_password' element={<ForgotPassword/>} />        
      <Route path='*' element={<ErrorPage />} />
    </Routes>
    {/* <ToastContainer/> */}
  </>
  )
}

export default App

import './App.css'
import { 
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate
} from 'react-router-dom';
import SignUp from './views/auth/signup';
import Login from './views/auth/login';

const PrivateRoute = ({children}) => {
  const token = localStorage.getItem('token');
  if(!token){
    return <Navigate to='/'/>
  }
  return children;
}
function App() {
  return (
   <Router>
     <Routes>
       {/* auth routes */}
       <Route path="/" element={<Login />} />
       <Route path='/signup' element={<SignUp />} />

       {/* protected routes  */}
      {/* <Route path='/votes' element={
      <PrivateRoute>
        <Votes />
      </PrivateRoute>
      } /> */}
     </Routes>
   </Router>
  )
}

export default App

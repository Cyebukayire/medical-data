import './App.css'
import Login from './views/auth/login'
import { 
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate
} from 'react-router-dom';
import SignUp from './views/auth/signup';
import Votes from './views/dashboard/votes';
import UploadCandidate from './views/dashboard/uploadCandidate';
import MyVotes from './views/dashboard/myVotes/myVotes';
import { getProfile } from './services/auth';

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

       {/* dashboard routes  */}
      <Route path='/votes' element={
      <PrivateRoute>
        <Votes />
      </PrivateRoute>
      } />
      <Route path='/uploadCandidate' element={
        <PrivateRoute>
        <UploadCandidate />
        </PrivateRoute>
      } />
      <Route path='/myVotes' element={
        <PrivateRoute>
        <MyVotes />
        </PrivateRoute>
      } />
     </Routes>
   </Router>
  )
}

export default App

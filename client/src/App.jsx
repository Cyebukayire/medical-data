import './App.css'
import { 
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate
} from 'react-router-dom';
import SignUp from './views/auth/signup';
import Login from './views/auth/login';

import DataTable from './views/data';
const PrivateRoute = ({children}) => {
  const usertype = localStorage.getItem('usertype');
  if(!usertype){
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
      <Route path='/data' element={
      <PrivateRoute>
        <DataTable />
      </PrivateRoute>
      } />
     </Routes>
   </Router>
  )
}

export default App

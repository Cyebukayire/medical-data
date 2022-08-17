import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from './NavBar'
import Sidebar from './Sidebar'
import './styles.css'
import { getProfile } from '../../services/auth'
import { Navigate } from 'react-router-dom'

const Layout = ({ children }) => {
  const [isAuthrised, setIsAuthorised] = useState(false);
  useEffect(() => {
    checkAuth();
  }, [children]);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const response = await getProfile(token);
    if(!response?.success){
      setIsAuthorised(false);
    }else{
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsAuthorised(true);
    }
  }

    const LayoutData = ()=>{return (
      <div className="layout-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="main-container">
          <div>
            <Navbar />
          </div>
          <div className="children-container">{children}</div>
        </div>
      </div>
    )
  }

  const PageNotFound = () => {
    return(
      <div className='page-not-found'>
        <h1>Page not found</h1>
      </div>
    )
  }

return(
  <>
  {isAuthrised? <LayoutData/> : <PageNotFound/>}
  </>
)

}

export default Layout

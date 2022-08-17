import { Link, useNavigate } from 'react-router-dom'
import './styles.css'

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className="sidebar-container">
      <div>
        <h1>Vote App</h1>
      </div>

      <div className="nav-menu" style={{marginTop: '10em'}}>
        <ul>
          <li onClick={()=> navigate('/votes')}> votes </li>

          <li onClick={() => navigate('/uploadCandidate')}>Upload candidacy</li>

          <li onClick={() => navigate('/myVotes')}> My Votes </li>
        </ul>
      </div>

      <div className="nav-menu" style={{marginTop: '10em'}}>
        <ul>
          <li onClick={() => navigate('/')}>Logout</li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar

import React, { useEffect } from 'react'
// import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useSelector(state => state.auth);
       
    useEffect(() => {
        if (!user ){
            navigate("/login")
        }      
    })

  return (
      <div>
          
         
                <>
					<h1 className='mb-5'>Dashboard</h1>
					<p>User Details</p>
					<ul>
					
						<li>Email: {user?.email}</li>
					</ul>
				</>
       
    </div>
  )
}

export default Dashboard;
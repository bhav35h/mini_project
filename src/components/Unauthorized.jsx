import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className='deny'>
        <div className="w3-display-middle">
          <h1 className="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
          <hr className="w3-border-white w3-animate-left"/>
          <h3 className="w3-center w3-animate-right">You dont have permission to view this site.</h3>
          <h3 className="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
          <h6 className="w3-center w3-animate-zoom">error code:403 forbidden</h6>
        </div>
        <Link to="/"><button>Go to Login</button></Link>
    </div>
  )
}

export default Unauthorized
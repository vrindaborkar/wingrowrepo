import React from 'react'
import { Link } from 'react-router-dom'

const FarmersHome = () => {
  return (
    <div className='farmers_page'>
        <div className='farmers_navigate'>
            <Link to="/inward">
                Fill Inward Data
            </Link>
            <Link to="/outward">
                Fill Outward Data
            </Link>
        </div>
        <div className='farmers_data'>
            data
        </div>
    </div>
  )
}

export default FarmersHome
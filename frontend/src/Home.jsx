import React from 'react'
import EmployeeList from './EmployeeList'

const Home = () => {
  return (
    <div>
        <div className='mx-auto w-1/2 my-10'>
            <h1 className='text-center font-bold text-lg'>Company</h1>
            <EmployeeList />
        </div>
    </div>
  )
}

export default Home
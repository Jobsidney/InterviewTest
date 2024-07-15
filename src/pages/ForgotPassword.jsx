import React from 'react'
import ResetPassword from './Password/ResetPassword'
function ForgotPassword() {
  return (
    <div className='w-full relative h-screen bg-light-primary dark:bg-dark-primary'>
        <ResetPassword/>
        <a  href='/' className='absolute  bottom-16 right-0 left-0 mx-auto outline-none max-w-[100px] text-center border-none bg-dark-secondary_2 text-light-secondary_2 rounded-md py-2 px-4'>Back</a>
    </div>
  )
}

export default ForgotPassword
import React from 'react';

function ErrorPage() {
  return (
    <div className='bg-light-primary dark:bg-dark-primary w-full px-16 md:px-0 h-screen flex items-center justify-center'>
      <div className='bg-light-secondary dark:bg-dark-secondary flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl'>
        <p className='text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider dark:text-light-text_color text-dark-text_color'>
          404
        </p>
        <p className='text-2xl md:text-3xl lg:text-5xl dark:text-light-text_color text-dark-text_color font-bold tracking-wider  mt-4'>
          Page Not Found
        </p>
        <p className=' mt-4 pb-4 border-b-2  dark:text-light-text_color text-dark-text_color text-center'>
          Sorry, the page you are looking for could not be found.
        </p>
        <a
          href='./'
          className='flex items-center space-x-2 bg-light-secondary_2 dark:bg-dark-secondary_2 text-light-text_color  dark:text-dark-text_color px-4 py-2 mt-6 rounded transition duration-150'
          title='Return Home'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span>Return Home</span>
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;

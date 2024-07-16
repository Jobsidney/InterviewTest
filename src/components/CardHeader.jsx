import React from 'react'

function CardHeader({title}) {
  return (
    <div className="col-lg-8 mx-auto text-center mb-md-5">
    <img
           className=" object-cover" width={"80px"}
           src='https://pbs.twimg.com/profile_images/1489569110040141826/ZzZgytR8_400x400.png'
           alt="logo"
         />
         <p>{title}</p>
    </div>
  )
}

export default CardHeader
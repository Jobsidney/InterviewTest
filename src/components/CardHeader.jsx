import React from 'react'

function CardHeader({title}) {
  return (
    <div className="col-lg-8 mx-auto text-center mb-md-5">
    <img
           className=" object-cover" width={"80px"}
           src={'/src/Images/logo.png'}
           alt="logo"
         />
         <p>{title}</p>
    </div>
  )
}

export default CardHeader
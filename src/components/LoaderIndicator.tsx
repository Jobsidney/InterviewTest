import React from 'react'
import animationData from '../assets/images/loader.json';
import Lottie from 'react-lottie';



function LoaderIndicator() {
  return (
    <Lottie 
                                 options={
                                        {loop: true,
                                        autoplay: true,
                                        animationData: animationData,
                                        rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice"
                                        }}
                                    }
                                    height={300}
                                    width={300}
                                    className="my-auto"
                                />
  )
}

export default LoaderIndicator
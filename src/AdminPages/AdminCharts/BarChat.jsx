import React from 'react'
import Chart from 'react-apexcharts'
function BarChat() {
  return (
    <div className="col-xl-4">
                                      
       <Chart type='bar' options={{colors:["#9e1039","#556ee6"], chart: {
          id: 'growth'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }}}  width={800} series={[{
        name: 'Male',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      },
      {
        name: 'Females',
        data: [40, 36, 39, 48, 49, 63, 74, 90, 129]
      }
      ]}/>
                                
                            </div>
  )
}

export default BarChat

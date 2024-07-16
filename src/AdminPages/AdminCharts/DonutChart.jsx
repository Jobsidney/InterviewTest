import React from 'react'
import Chart from 'react-apexcharts'

function DonutChart() {
  return (
    <div className="donut">
                                        
                                    <Chart className="w-100" type='donut' options={{colors:["#9e1039","#556ee6"],labels:['Males',"Females"],
                                    tooltip: {
y: {
formatter: (val) =>{
return `${val}% `;
}
}}}}   series={[47,53]}
                                    
                                    />
      </div>
  )
}

export default DonutChart
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { SlCalender } from 'react-icons/sl'
const BarChart = ({students}) => {
    const [state, setState] = useState({
    options: {
      chart: {
        id: "Moringa_Anual_Registered_students",
      },
      xaxis: {
        categories: [2018, 2019, 2020, 2021, 2022, 2023],
        title: {
          text: "Year",
        },
      },
      yaxis: {
        title: {
          text: "Number of Students",
        },
      },
    },
    series: [
      {
        name: "Registered Students",
        data: [3, 4, 5, 3, 9, students.length],
      },
    ],
  });
  return (
    <div className="w-full h-auto lg:w-[49%] mb-4 rounded-md shadow-lg overflow-hidden">
        <div className="w-full h-auto flex gap-4 px-4 py-2 bg-light-primary dark:bg-dark-primary text-light-secondary_2 font-semibold dark:text-dark-secondary_2 items-center">
            <SlCalender className="text-[24px]"/>
            <p>Student Academic Year 2023</p>
        </div>
      <Chart className='bg-light-bg_white '
        options={state.options}
        series={state.series}
        type="bar"
      />
    </div>
  );
};

export default BarChart;

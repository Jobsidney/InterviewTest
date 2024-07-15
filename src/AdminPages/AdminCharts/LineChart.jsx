import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { SlCalender } from 'react-icons/sl'


const LineChart = ({studentPerCourse}) => {
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
        name: 'Web',
        data: [3, 4, 1, 3, 9, 1],
      },
      {
        name: 'data',
        data: [6, 4, 3, 3, 2, 8],
      },
      {
        name: 'Cccc',
        data: [0, 4, 5, 3, 7, 6],
      },
    ],  
  });
  useEffect(() => {
    const newSeries = studentPerCourse.map(({ course, students }) => ({
      name: course,
      data: [students+ 4, students + 1, students + 2, students , students + 5, students],
    }));
    setState((prevState) => ({
      ...prevState,
      series: newSeries,
    }));
  }, [studentPerCourse]);
  return (
    <div className="w-full h-auto lg:w-[49%] mb-4 rounded-md shadow-lg overflow-hidden">
        <div className="w-full h-auto flex gap-4 px-4 py-2 bg-light-primary dark:bg-dark-primary text-light-secondary_2 font-semibold dark:text-dark-secondary_2 items-center">
            <SlCalender className="text-[24px]"/>
            <p>Course Year 2023</p>
        </div>
      <Chart
      className='bg-light-bg_white'
        options={state.options}
        series={state.series}
        type="line"
      />
    </div>
  );
};

export default LineChart;

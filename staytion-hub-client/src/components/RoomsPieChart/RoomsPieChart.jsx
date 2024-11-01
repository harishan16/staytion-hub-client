import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './RoomsPieChart.scss';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const RoomsPieChart = ({roomsList}) => {
  const [roomsData, setRoomsData] = useState(
    {
    labels: ['Deluxe - Occupied', 'Deluxe - Available', 'Family - Occupied', 'Family - Available', 'Suite - Occupied', 'Suite - Available'],
    datasets: [
      {
        label: 'Rooms Status',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: ['#FF6F3C', '#e6f7f7', '#FFC93C', '#c8e6c9', '#D83A56', '#bbdefb'],
        hoverOffset: 4,
      },
    ],
    }
    );


    useEffect(() => {
      const counts = {
        deluxeOccupied: 0,
        deluxeAvailable: 0,
        familyOccupied: 0,
        familyAvailable: 0,
        suiteOccupied: 0,
        suiteAvailable: 0,
      };
  
      roomsList.forEach(room => {
        if (room.room_type === "Deluxe Room") {
          if (room.status === "Occupied") counts.deluxeOccupied++;
          else counts.deluxeAvailable++;
        } else if (room.room_type === "Family Room") {
          if (room.status === "Occupied") counts.familyOccupied++;
          else counts.familyAvailable++;
        } else if (room.room_type === "Suite") {
          if (room.status === "Occupied") counts.suiteOccupied++;
          else counts.suiteAvailable++;
        }
      });
  
      setRoomsData({
        labels: ['Deluxe - Occupied', 'Deluxe - Available', 'Family - Occupied', 'Family - Available', 'Suite - Occupied', 'Suite - Available'],
        datasets: [
          {
            label: 'Rooms Status',
            data: [
              counts.deluxeOccupied,
              counts.deluxeAvailable,
              counts.familyOccupied,
              counts.familyAvailable,
              counts.suiteOccupied,
              counts.suiteAvailable,
            ],
            backgroundColor: ['#FF6F3C', '#FFD4B2', '#FFC93C', '#FFF4CC', '#D83A56', '#F9C3C8'],
            hoverOffset: 4,
          },
        ],
      });
    }, [roomsList]);

    const options = {
      responsive: true,
      maintainAspectRatio: false,       
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 10,
            font: {
              size: 10,
            },
        },
      },
      },
    };

  return (
    <div>
      <h3>Room Occupancy</h3>
      <section className='pie-chart' >
        <Pie data={roomsData} options={options}  />
      </section>
    </div>
  );
};

export default RoomsPieChart;

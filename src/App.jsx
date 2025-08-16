import React, { useEffect, useState } from 'react';
import Card from './Card';
import aglogo from '/aglogo.png'
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1NH7DhBYyBickFlnq_DrK9y7oI8AqXdO5_AuXwcAWIfs/gviz/tq?tqx=out:json&sheet=Progress%20Indicator');
      const text = await response.text();

      // Remove the Google Sheets JSONP wrapper
      const json = JSON.parse(text.substring(47).slice(0, -2));

      // Transform the data
      const rows = json.table.rows;
      const headers = json.table.cols.map(col => col.label);
      const formattedData = rows.map(row => {
        return row.c.reduce((acc, cell, i) => {
          if (i >= 1 & i <= 3) { 
            acc[headers[i]] = cell ? parseFloat(cell.v) : 0;
          } else {
            acc[headers[i]] = cell ? cell.v : '';
          }
          return acc;
        }, {});
      });

      setData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={aglogo} alt="UP AG"/>
        </div>
        <div className="st-title">
          <h1>UP AG Campaign 13 Scoreboard</h1>
        </div>
      </div>
      <div className="App">
        <div className="cards-container">
          {data.map((row, index) => (
            <Card key={index} data={row} />
          ))}
        </div>
      </div>
      <div className="footer">
      </div>
    </>
  );
}

export default App;

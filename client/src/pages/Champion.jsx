import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'

const MyComponent = () => {
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const jsonData = await response.json();
        console.log(jsonData)
        let tempArray = []
        for (const element in jsonData.data) {
          tempArray.push(jsonData.data[element])
        }
        setChampions(tempArray);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      <h1>Champions</h1>
      {/* map your data after it loads */}
      {champions.length === 0 ? <p>loading</p> :
        <ul>{
          champions.map((champion,index) => (
            <li key={index}>{champion.name}</li>
          ))
        }</ul>
      }
    </div>
  );
};

export default MyComponent;
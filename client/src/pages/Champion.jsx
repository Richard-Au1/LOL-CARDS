import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'

const MyComponent = () => {
    const [data, setData] = useState(null);
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
        setData(jsonData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const champions = data.name;

  return (
    <div>
      <h1>Champions</h1>
      { champions } 
    </div>
  );
};

export default MyComponent;
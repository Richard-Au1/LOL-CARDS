import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'

const MyComponent = () => {
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);

  // we can use promise.all to do multiple fetch requests. The problem is that the endpoint that riot gives us is the individual champion. 
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
      {champions.length === 0 ? <p>loading</p> :
        <ul>{
          champions.map((champion,index) => (
            <li key={index}>
              {champion.name}
            <div>
            <img src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`} alt="champion image" />
            </div>
            </li>
            
          ))
        }</ul>
      }
    </div>
  );
};

export default MyComponent;
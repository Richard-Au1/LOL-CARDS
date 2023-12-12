import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { QUERY_SINGLE_CHAMPIONS } from '../utils/queries';

// useParams 

const SingleChamp = () => { 
  const { championId } = useParams();

  const { data } = useQuery(QUERY_SINGLE_CHAMPIONS, {
    variables: { championId },
  });

  const [champion, setChampion] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        console.log('here1')
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/${championId}.json`
        );
        console.log(champion.data)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const jsonData = await response.json();
        console.log(jsonData)
        let tempArray = []
        for (const element in jsonData.data) {
          tempArray.push(jsonData.data[element])
        }
        setChampion(tempArray);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [championId]);

  return (
    <div>
      <h1>Champions</h1>
      <ul>
      {champion.map((champion) => (
        <li key={champion.id}> 
        {champion.id} 
        <li> {champion.lore} </li>
        <img className='champion-img' src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`} alt="champion image" />
        </li>
      ))}
      </ul>
    </div>
  );

};


export default SingleChamp;

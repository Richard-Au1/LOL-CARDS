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
    <div style={backgroundStyle}>
      <h1 style={championNameStyle}>Champions </h1>
      <ul style={championTitle} >
        {champion.map((champion) => (
          <li key={champion.id}>
            <div style={champSection1}>
            {champion.id} 
            </div>
           <div style={champSection1}><img className='champion-img' src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`} alt="champion image" /></div> 
            <div style={championDescription}>
              <p style={{fontSize: '30px', marginBottom: '0px', display: 'flex', justifyContent: 'start', margin: '10px'}} >Lore:</p>
             {champion.lore} 
             </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const backgroundStyle = {
  background: '#2b2b60',
}

const championTitle = {
  color: 'white',
  listStyle: 'none', 
  margin: '0px',
  padding: '0px',
}

const championNameStyle = {
  fontSize: '35px',
  fontWeight: 'Bold',
  listStyle: 'none',
  color: 'white',
  border: '10px black',
  display: 'flex',
  justifyContent: "center",
  textDecoration: 'underline',
};

const champSection1 = {
  display: "flex",
  margin: '10px',
  justifyContent: "center",
  fontSize: '50px',
}

const championDescription = {
  fontSize: '20px',
  display: "flex",
  justifyContent: "center",
}

export default SingleChamp;

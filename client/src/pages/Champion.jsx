import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'

const MyComponent = () => {
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([])

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


  useEffect(() => {
    const handleClick = (event) => {
      console.log(event.target);
    }

    const imgElement = document.querySelectorAll('.champion-img');
    imgElement.forEach((element) => {
      element.addEventListener('click', handleClick);
    });

    return () => {
      imgElement.forEach((element) => {
        element.removeEventListener('click', handleClick);
      });
    };
  }, [champions]);

  useEffect(() => {
    const handleClick = (event) => {
      console.log(event.target);
    }

    const favElement = document.querySelectorAll('.fav-btn');
    favElement.forEach((element) => {
      element.addEventListener('click', handleClick);
    });
  }, [favorites]);






  // How do we access the seed data description? We can access the api data objects 'blurb' but what if we want the full lore?
  return (
    <div>
      <h1>Champions</h1>
      {champions.length === 0 ? <p>loading</p> :
        <ul className= 'champion-layout'>{
          champions.map((champion, index) => (
            <li id='ind-champion' key={index}>
              {champion.name}
              <div >
                <Link to={`/champion/${champion.id}`}>
                  <img className='champion-img' src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`} alt="champion image" />
                </Link>
              </div>
              <button className = 'fav-btn'> Favorite </button>
            </li>
          ))
        }</ul>
      }
    </div>
  );
};

export default MyComponent;
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'

const MyComponent = () => {
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);
  // const [favorites, setFavorites] = useState([])

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

  // useEffect(() => {
  //   const handleClick = (event) => {
  //     console.log(event.target);
  //   }

  //   const favElement = document.querySelectorAll('.fav-btn');
  //   favElement.forEach((element) => {
  //     element.addEventListener('click', handleClick);
  //   });
  // }, [favorites]);

  // How do we access the seed data description? We can access the api data objects 'blurb' but what if we want the full lore?
  return (
    <div style={backgroundStyle}>
      <div>
        <Link to={'/login'}>
          <button> Login </button>
        </Link>
      </div>
      <h1 style={titleStyle}>List of Champions</h1>
      {champions.length === 0 ? <p>loading</p> :
        <ul className='champion-layout' style={champLayout}>{
          champions.map((champion, index) => (
            <li id='ind-champion' key={index}>
              <div style={championNameStyle}>
                {champion.name}
              </div>
              <div >
                <Link to={`/champion/${champion.id}`}>
                  <img className='champion-img' src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`} alt="champion image" />
                </Link>
              </div>

            </li>

          ))
        }</ul>
      }
    </div>
  );
};

const championNameStyle = {
  fontSize: '40px',
  fontWeight: 'Bold',
  listStyle: 'none',
  color: 'white',
  width: '200px',
  border: '10px black',
};

const titleStyle = {
  color: "white",
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
};

const backgroundStyle = {
  background: '#2b2b60',
}

const champLayout = {
  color: 'white',
  width: '1000px',
  border: '10px black',
  listStyle: 'none',
};
export default MyComponent;
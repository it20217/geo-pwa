import {useState, useEffect} from 'react';


function Weather() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const apiKey= process.env.REACT_APP_API_KEY;
  const geoKey = "857121256518327842847x75356"

  useEffect(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(pos) {
        try {
          fetch(`https://geocode.xyz/${pos.coords.latitude},${pos.coords.longitude}?json=1&auth=${geoKey}`)
          .then(response => response.json())
          .then((result) => {
            fetch(`/https://api.openweathermap.org/data/2.5/weather?q=${result.city}&units=metric&appid=${apiKey}`)
              .then(response => response.json())
              .then((weather) => {
                setData(weather);
            });
          })
        } catch (e) {
            if(e.response.status === 404) {
              setError(`Weather data for ${pos.coords.latitudeat},${pos.coords.longitude} could not be found`)
            } else {
              setError("The weather data could not be retrieved please try again later and make sure you are connected to the internet")
            }      
          }
        });
      } else {
        setError("Location is not available");
      }
  }, []);

  

  const handleInput = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }
 

  async function handleSearch(e) {
    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then((weather) => {
          setData(weather);
    });
    } catch(e) {
      setError(e);
    }  
  }

  return(
    <div className='weather-container'>
      <div className='weather'>
        <input 
          value={query} 
          onChange={handleInput} 
          placeholder={"Dublin"}
        />
      
        <button onClick={handleSearch} >
            Go!    
        </button>
      </div>
      <div>
        <br/>
        <p>{error}</p>
      </div> 
      

      {data.main? (
        <div className='response'>
          
          {data.name}
          <br/>
          <img
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="weather status icon"
          />
          <br/>
          {(data.main.temp.toFixed(0))}&deg; C
          <br/>
          <div>
            {data.weather[0].description}
          </div>
        </div>
        ) 
        : (
          <div className='noData'>
            { 'Loading ...' }
          </div>
        )
      } 

    </div>
  )
}

export default Weather;
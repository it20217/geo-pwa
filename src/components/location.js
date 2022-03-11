import {useState, useEffect} from 'react';


function Location() {
  const [lat, setLatitude] = useState(0);
  const [long, setLongitude] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setLatitude(lat);
    setLongitude(long);
  })

  return (
    <div>
      {lat}, {long}
    </div>
  )
}

export default Location;
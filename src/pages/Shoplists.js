import ShoplistTile from '../components/ShoplistTile'
import React, {useState, useEffect} from 'react';

function Shoplists() {
  const [shoplists, setShoplists] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/shoplists')
      const shoplists = await response.json()
      setShoplists(shoplists)
    } catch (error) {
      setError(error)
    }
    setIsLoaded(true)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(error) {
    return <div>Error: {error.message}</div>
  } else if(!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <div className="row mt-3">
        {shoplists.map(i =>
          <div key={i.id} className="col-3">
            <ShoplistTile id={i.id} name={i.name} image={i.image}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shoplists;

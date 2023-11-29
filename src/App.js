import './App.css';
import Shoplist from './tiles/shoplist'
import React, {useState, useEffect} from 'react';

function App() {
  const [shoplists, setShoplists] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/shoplists').then(res => res.json()).then(data=> {
        setIsLoaded(true)
        setShoplists(data)
    },
    (error) => {
        setIsLoaded(true)
        setError(error)
    })
  }, [])

  if(error) {
    return <div>Error: {error.message}</div>
  } else if(!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="container">
        <div className="row mt-3">
          {shoplists.map(i =>
            <div key={i.id} className="col-3">
              <Shoplist title={i.title} image={i.image}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

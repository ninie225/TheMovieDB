import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [recherche, setRecherche] = useState("")
  const [films, setFilms] = useState([])

  const url = "http://api.themoviedb.org/3/search/movie?api_key=f33cd318f5135dba306176c13104506a&query="

  const handleClick = () => {
    axios.get(url+recherche)
      .then(function(response) {
        setFilms(response.data.results)
      })
      setRecherche("")
  }

  const handleChange = (e) => {
    setRecherche(e.target.value)
  }

  return (
    <>
      <input 
        type="text" 
        value={recherche} 
        placeholder="Rechercher des films.."
        onChange={handleChange}
        >
      </input>
      <button onClick={handleClick}>Rechercher</button>
      <ul>
        {
          films.map( (film, id) => (
            <li key={film.id}>
              {film.title}
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App

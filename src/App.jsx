import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component";

function App() {

  const columns = [
      {
        name: <b>Nom</b>,
        selector: (film) => film.title,
        sortable: true,
      },
      {
        name: 'Année',
        selector: (film) => film.release_date,
        sortable: true,
      },
      {
        name: 'Poster',
        cell: (film) => <img style={{width: '60px'}} src={film.poster_path?'http://image.tmdb.org/t/p/w185' + film.poster_path:'https://placehold.co/185x274'} />,
        
      },
      {
        name: 'Vote',
        selector: film => film.vote_average,
        sortable: true
      }
    ];

  const [films, setFilms] = useState([])
  const [recherche, setRecherche] = useState("")

  const handleClick = () => {
    const adresse = "http://api.themoviedb.org/3/search/movie?api_key=f33cd318f5135dba306176c13104506a&query="

    axios.get(adresse + recherche)
    .then( (reponse) => {
      setFilms(reponse.data.results)
    })

    setRecherche("")
  }

  const handleChange = (e) => {
    setRecherche(e.target.value)
  }

  return (
    <>
      <input type="text" placeholder="Saisir nom de films.." value={recherche} onChange={handleChange}></input>
      <button onClick={handleClick}>Rechercher</button>
      <h1>Liste des films</h1>

      <DataTable
          columns={columns}
          data={films}
          key={films.id}
      />
    </>
  )
}

export default App
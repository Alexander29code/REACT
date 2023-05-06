import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import { Movies } from './components/Movies.jsx'
import { searchError } from './services/validation.js'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'



function App () {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, loading, previousSearch, getMovies } = useMovies({sort, search})

  const debouncedGetMovies = useCallback(
    debounce((newSearch,error)=> getMovies({newSearch,error}), 2000)
    , [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = event.target.query.value
    getMovies({newSearch , error:searchError(newSearch) })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    //EJECUTAR EL getMovies , JUNTO CON EL ERROR, PARA QUE SE VALIDE EN LA EJECUCION
    setSearch(newSearch)
    
    debouncedGetMovies(newSearch, searchError(newSearch))
  }

  
  //<logica los>
  //no mostrar busqueda previa cuando seach sea distinto de search previo o search sea ""
  //si search es el mismo que el search previo mostrar la misma lista de movies que se dio por ese search
  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} 
            onChange={handleChange} 
            value={search} 
            name='query' 
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
        //<logica pelis>
         (search && search == previousSearch.current) && (loading ? <p>Cargando...</p> : <Movies movies={movies}/> )
        }
      </main>
    </div>
  )
}

export default App

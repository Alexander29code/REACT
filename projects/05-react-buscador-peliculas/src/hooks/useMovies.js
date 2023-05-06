import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({ sort ,search}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  // el error no se usa pero puedes implementarlo si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef("")

  const getMovies = useCallback(async ({ newSearch,error } )=>{
   
    if (newSearch === previousSearch.current) return


    if(error) return
    

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = newSearch
      const newMovies = await searchMovies({ newSearch })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  },[]);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading , previousSearch, getMovies}
}

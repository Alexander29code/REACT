import { useState, useEffect, useRef, useMemo, } from 'react'

export function useSearch () {
    const [search, setSearch] = useState('')
    const isFirstInput = useRef(true)
  
   

    const error = useMemo(()=>
    {
        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
          }
          
          if (search === '') return 'No se puede buscar una película vacía'
        
      
          if (search.match(/^\d+$/)) return 'No se puede buscar una película con un número'
     
      
          if (search.length < 3) return 'La búsqueda debe tener al menos 3 caracteres'
         
    },[search])
  
    return { search, setSearch, error }
  }
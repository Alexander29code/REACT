import { useState, useRef, useMemo, } from 'react'
import { searchError } from '../services/validation.js'

export function useSearch () {
    const [search, setSearch] = useState("")
    const isFirstInput = useRef(true)
    
   

    const error = useMemo(()=>
    {
      
     

        if (isFirstInput.current === true) {
            isFirstInput.current = false
            return false
          }
          
        return searchError(search)
      
         
    },[search])
   
  
    return { search, setSearch, error }
  }
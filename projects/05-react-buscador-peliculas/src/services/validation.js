export function searchError(input) {

    if (input === '') return 'No se puede buscar una película vacía'
    
    if (input.length < 3) return 'La búsqueda debe tener al menos 3 caracteres'

    return false
}
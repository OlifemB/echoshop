import { useCallback, useEffect, useState } from "react"

export const useNavigation = () => {
  const parseHash = useCallback(() => {
    if (typeof window === 'undefined') {
      return { page: 'home', id: null }
    }
    const hash = window.location.hash.substring(1)
    if (!hash || hash === 'home') {
      return { page: 'home', id: null }
    }
    const parts = hash.split('/')
    if (parts.length === 2 && parts[0] === 'product') {
      return { page: 'product', id: parts[1] }
    }
    return { page: parts[0], id: null }
  }, [])

  const [pageState, setPageState] = useState(parseHash())

  useEffect(() => {
    const handleHashChange = () => {
      setPageState(parseHash())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange)
      }
    }
  }, [parseHash])

  const handleSetPage = useCallback((page: string, id?: string) => {
    if (typeof window !== 'undefined') {
      if (page === 'home' && !id) {
        window.location.hash = ''
      } else if (id) {
        window.location.hash = `${page}/${id}`
      } else {
        window.location.hash = page
      }
    }
  }, [])

  return { currentPage: pageState.page, selectedProductId: pageState.id, setCurrentPage: handleSetPage }
}
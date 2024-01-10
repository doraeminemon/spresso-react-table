import { useEffect, useState } from 'react'
import './App.css'
import { debounce } from 'lodash'
import DynamicTable from './components/DynamicTable'

export type Product = {
  id: number
  title: string
  price: number
  rating: number
  category: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('')
  const [sortDirection, setSortDirection] = useState<boolean>(false) // false is desc
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<Product | null>(null)

  useEffect(() => {
    fetchPosts(page, sort, sortDirection, query)
  }, [page, sort, sortDirection, query])

  const fetchPosts = async (skip: number = 0, sort: string, sortDirection: boolean, query: string) => {
    const url = new URL( query.length > 0 ? 'https://dummyjson.com/products/search' : 'https://dummyjson.com/products')
    if (query.length > 0) {
      url.searchParams.set('q', query)
    }
    url.searchParams.set('limit', '10')
    url.searchParams.set('skip', (skip * 10).toString())
    // sort is currently not working because the api doesn't support it
    url.searchParams.set('sortBy', sort)
    url.searchParams.set('order', sortDirection ? 'asc' : 'desc')
    const resp = await fetch(url)
    const json = await resp.json()
    setProducts(json.products)
  }
  return (
    <div className='min-h-screen w-full'>
      <h1 className='font-bold underline text-3xl'>Vite + React</h1>
      <div className='searchBar mx-4 my-2'>
        <label>Search product:</label>
        <input
          className='border border-gray-300 rounded-md'
          onChange={
            debounce(
              (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
              300
            )
          }
        >
        </input>
      </div>
      <div>
        <DynamicTable
          products={products}
          onPageChange={(page) => setPage(page)}
          onSortChange={(sort) => setSort(sort)}
          onSortDirectionChange={(sortD) => setSortDirection(sortD)}
          onSelected={(selected) => setSelected(selected)}
        />
        <code className='whitespace-pre-wrap font-mono text-xs w-full'>
          {selected !== null && JSON.stringify(selected)}
        </code>
      </div>
    </div>
  )
}

export default App

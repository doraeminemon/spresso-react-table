import { useState } from "react"
import { Product } from '../../App'

type DynamicTableProps = {
  products: Product[]
  onPageChange?: (page: number) => void
  onSortChange?: (sort: string) => void
  onSortDirectionChange?: (sortDirection: boolean) => void
  onSelected?: (selected: Product) => void
}

export default function DynamicTable({ products, onSelected, onSortChange, onSortDirectionChange, onPageChange }: DynamicTableProps) {
  const [sort, setSort] = useState('')
  const [sortDirection, setSortDirection] = useState<boolean>(false) // false is desc
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  const headerOnClickHandler = (field: string) => () => {
    if (sort === field) {
      setSortDirection(!sortDirection)
      onSortDirectionChange && onSortDirectionChange(sortDirection)
      return
    }
    setSort(field)
    onSortChange && onSortChange(sort)
    setSortDirection(false)
    onSortDirectionChange && onSortDirectionChange(sortDirection)
  }

  return (
    <>
    <div className='w-full border border-blue-500 grid grid-cols-6 px-4 py-2 rounded-md'>
        <div
          onClick={headerOnClickHandler('name')}
          className='font-bold hover:bg-blue-300 col-span-2'>
            Name
            {sort === 'name' ? sortDirection ? '▲' : '▼' : ''}
        </div>
        <div
          onClick={headerOnClickHandler('price')}
          className='font-bold hover:bg-blue-300'>
            Price
            {sort === 'price' ? sortDirection ? '▲' : '▼' : ''}
        </div>
        <div
          onClick={headerOnClickHandler('rating')}
          className='font-bold hover:bg-blue-300'>
            Rating
            {sort === 'rating' ? sortDirection ? '▲' : '▼' : ''}
        </div>
        <div
          onClick={headerOnClickHandler('category')}
          className='font-bold hover:bg-blue-300'>
            Category
            {sort === 'category' ? sortDirection ? '▲' : '▼' : ''}
        </div>
        <div className='font-bold'>
          Select
        </div>
      {
        products.length > 0 ? products.map((product) => (
          <>
            <div className='px-3 col-span-2'>{product.title}</div>
            <div className='px-3'>{product.price}</div>
            <div className='px-3'>{product.rating}</div>
            <div className='px-3'>{product.category}</div>
            <div className='px-3'>
              <input
                type='checkbox'
                onChange={() => {
                  setSelected(product.id)
                  onSelected && onSelected(products[product.id])
                }}
                checked={selected === product.id}
              ></input>
            </div>
          </>
        )) : (<div>Loading...</div>)
      }
    </div>
    <div className='w-full flex justify-center items-center'>
      <button onClick={() => {
        setPage(page === 0 ? page : page - 1)
        onPageChange && onPageChange(page)
      }}> Prev page </button>
      <div className='px-4'>Page: {page}</div>
      <button onClick={() => {
        setPage(page + 1)
        onPageChange && onPageChange(page)
      }}> Next page </button>
    </div>
    </>
  )
}
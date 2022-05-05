import { List, ListRowRenderer } from 'react-virtualized'

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number,
    priceFormatted: string,
    title: string;
  }>
  onAddToWishList: (id: number) => void
}

export function SearchResults({ results, totalPrice, onAddToWishList }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style } => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    )
  })

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results && results.map(product => (
        <ProductItem
          key={product.id}  
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))} */}
    </div>
  )
}

// useMemo

/**
 * 1. Cálculos pesados (armazenar um valor)
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */

// useCallback

/**
 * 1. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */
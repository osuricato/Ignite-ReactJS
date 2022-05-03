import { useMemo } from 'react'

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number,
    price: number,
    title: string;
  }>
  onAddToWishList: (id: number) => void
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    results.reduce((total, product) => {
      return total + product.price;
    }, 0)
  }, [results])

  return (
    <div>
      {results && results.map(product => (
        <ProductItem
          key={product.id}  
          product={product}
          onAddToWishList={onAddToWishList}
        />
      ))}
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
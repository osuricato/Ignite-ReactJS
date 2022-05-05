import { memo, useState, lazy } from 'react'
import { AddProductToWishListProps } from './AddProductToWishList'
import dynamic from 'next/dynamic'

// import { AddProductToWishList } from './AddProductToWishList';

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then((mod) => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number,
    priceFormatted: string,
    title: string;
  }
  onAddToWishList: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddToWishList, setIsAddToWishList] = useState(false)

  async function showFormattedDate() {
    const { format } = await import('date-fns')

    // format()
  }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>

      <button onClick={() => setIsAddToWishList(true)}>Adicionar aos favoritos</button>

      { isAddToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddToWishList(false)}
        />
      )}
    </div>
  )
}

/**
 * 1. Pure Functional components
 * 2. Renders too often
 * 3. Re-render with same props
 * 4. Medium to big size
 */

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)  
})

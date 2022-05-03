import { memo } from 'react'

interface ProductItemProps {
  product: {
    id: number,
    price: number,
    title: string;
  }
  onAddToWishList: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => onAddToWishList(product.id)}> to wish list</button>
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

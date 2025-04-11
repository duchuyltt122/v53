interface ProductPriceProps {
  price: number
  salePrice?: number
  className?: string
}

export function ProductPrice({ price, salePrice, className = "" }: ProductPriceProps) {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  const formattedSalePrice = salePrice
    ? new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(salePrice)
    : null

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {salePrice ? (
        <>
          <span className="text-xl font-bold text-red-600">{formattedSalePrice}</span>
          <span className="text-sm text-gray-500 line-through">{formattedPrice}</span>
        </>
      ) : (
        <span className="text-xl font-bold text-gray-900">{formattedPrice}</span>
      )}
    </div>
  )
}


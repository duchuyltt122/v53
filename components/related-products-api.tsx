"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { ProductPrice } from "./product-price"
import type { AppProduct } from "@/types/products"

interface RelatedProductsProps {
  products: AppProduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const { language } = useLanguage()

  if (products.length === 0) return null

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">{language === "vi" ? "Sản phẩm liên quan" : "Related Products"}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/san-pham/${product.id}`} className="group block">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
              <Image
                src={product.images.find((img) => img.isMain)?.src || product.images[0]?.src || "/placeholder.svg"}
                alt={language === "vi" ? product.name.vi : product.name.en}
                fill
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium text-gray-900 group-hover:text-primary truncate">
              {language === "vi" ? product.name.vi : product.name.en}
            </h3>
            <ProductPrice price={product.price} salePrice={product.salePrice} />
          </Link>
        ))}
      </div>
    </div>
  )
}

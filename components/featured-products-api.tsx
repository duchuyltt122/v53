"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { getAllProducts } from "@/services/product-service"
import { AppProduct } from "@/types/products"
import { ProductPrice } from "./product-price"

export function FeaturedProductsApi() {
  const { language } = useLanguage()
  const [featuredProducts, setFeaturedProducts] = useState<AppProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        // Lấy tất cả sản phẩm và chọn 3 sản phẩm đầu tiên làm sản phẩm nổi bật
        const products = await getAllProducts()
        setFeaturedProducts(products.slice(0, 3))
        setLoading(false)
      } catch (err) {
        console.error("Error fetching featured products:", err)
        setError("Failed to load featured products")
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === "vi" ? "Sản phẩm nổi bật" : "Featured Products"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-80 mb-4 rounded-lg"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || featuredProducts.length === 0) {
    // Fallback to static content if there's an error or no products
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === "vi" ? "Sản phẩm nổi bật" : "Featured Products"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group">
              <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//den-tre.jpg"
                  alt="Bamboo Lamp"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">
                {language === "vi" ? "Đèn tre nghệ thuật" : "Artistic Bamboo Lamp"}
              </h3>
              <p className="text-gray-600 mb-3">
                {language === "vi"
                  ? "Đèn tre thủ công với thiết kế độc đáo, tạo không gian ấm cúng và gần gũi với thiên nhiên."
                  : "Handcrafted bamboo lamp with unique design, creating a cozy space close to nature."}
              </p>
              <Link
                href="/san-pham/3"
                className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
              >
                {language === "vi" ? "Xem chi tiết" : "View details"} →
              </Link>
            </div>

            {/* Product 2 */}
            <div className="group">
              <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//ong_vang.jpg"
                  alt="Golden Bee"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">
                {language === "vi" ? "Ong vàng thủ công mỹ nghệ" : "Handcrafted Golden Bee"}
              </h3>
              <p className="text-gray-600 mb-3">
                {language === "vi"
                  ? "Sản phẩm thủ công mỹ nghệ Ong Vàng được làm từ tre già, qua quá trình xử lý tự nhiên."
                  : "The handcrafted Golden Bee made from mature bamboo, processed naturally."}
              </p>
              <Link
                href="/san-pham/1"
                className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
              >
                {language === "vi" ? "Xem chi tiết" : "View details"} →
              </Link>
            </div>

            {/* Product 3 */}
            <div className="group">
              <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//hop-dung-tra.jpg"
                  alt="Bamboo Tea Box"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">
                {language === "vi" ? "Hộp đựng trà bằng tre" : "Bamboo Tea Storage Box"}
              </h3>
              <p className="text-gray-600 mb-3">
                {language === "vi"
                  ? "Hộp đựng trà được làm từ tre tự nhiên, thiết kế kín giúp giữ hương trà lâu."
                  : "The tea storage box is made from natural bamboo, with a sealed design that helps preserve tea aroma."}
              </p>
              <Link
                href="/san-pham/b6af5aec-794b-43d6-a1f6-2207717ce975"
                className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
              >
                {language === "vi" ? "Xem chi tiết" : "View details"} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === "vi" ? "Sản phẩm nổi bật" : "Featured Products"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.images[0]?.src || "/placeholder.svg"}
                  alt={language === "vi" ? product.name.vi : product.name.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">
                {language === "vi" ? product.name.vi : product.name.en}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {language === "vi" ? product.description.vi : product.description.en}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/san-pham/${product.id}`}
                  className="text-green-600 font-medium hover:text-green-700 inline-flex items-center"
                >
                  {language === "vi" ? "Xem chi tiết" : "View details"} →
                </Link>
                <ProductPrice price={product.price} salePrice={product.salePrice} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

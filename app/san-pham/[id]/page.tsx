"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { ProductPrice } from "@/components/product-price"
import { RelatedProducts } from "@/components/related-products"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { getProductById, getRelatedProducts } from "@/data/products"

export default function ProductDetailPage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  const productId = params.id as string
  const product = getProductById(productId)

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {language === "vi" ? "Sản phẩm không tồn tại" : "Product not found"}
        </h1>
        <p className="mb-6">
          {language === "vi"
            ? "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
            : "The product you are looking for does not exist or has been removed."}
        </p>
        <Button asChild>
          <Link href="/san-pham">{language === "vi" ? "Quay lại trang sản phẩm" : "Back to products"}</Link>
        </Button>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(product.relatedProducts)
  const productName = language === "vi" ? product.name.vi : product.name.en
  const productDescription = language === "vi" ? product.description.vi : product.description.en
  const productDetails = language === "vi" ? product.details.vi : product.details.en
  const categoryName = language === "vi" ? product.category.name.vi : product.category.name.en

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)

    // Reset the "Added to cart" message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  return (
    <div className="container py-8">
      {/* Top Bar */}
      <TopBar />

      {/* Header & Navigation */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("breadcrumb.home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/san-pham">{t("breadcrumb.products")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/san-pham?category=${product.category.id}`}>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <span className="truncate max-w-[150px] md:max-w-xs">{productName}</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
            <Image
              src={product.images[selectedImage].src || "/placeholder.svg"}
              alt={product.images[selectedImage].alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${selectedImage === index ? "ring-2 ring-primary" : "ring-1 ring-gray-200"}`}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{productName}</h1>
          <ProductPrice price={product.price} salePrice={product.salePrice} className="text-xl" />

          <p className="text-gray-700">{productDescription}</p>

          {/* Specifications */}
          <div className="border-t border-b py-4 space-y-2">
            {product.specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-2">
                <span className="text-gray-600">{language === "vi" ? spec.name.vi : spec.name.en}:</span>
                <span>{language === "vi" ? spec.value.vi : spec.value.en}</span>
              </div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{language === "vi" ? "Số lượng:" : "Quantity:"}</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-3 py-1 border-r"
                aria-label={language === "vi" ? "Giảm số lượng" : "Decrease quantity"}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-1 border-l"
                aria-label={language === "vi" ? "Tăng số lượng" : "Increase quantity"}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div>
            <Button onClick={handleAddToCart} className="w-full md:w-auto" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {language === "vi" ? "Thêm vào giỏ hàng" : "Add to Cart"}
            </Button>

            {addedToCart && (
              <div className="mt-2 text-green-600 animate-fade-in-out">
                {language === "vi" ? "Đã thêm vào giỏ hàng!" : "Added to cart!"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details with Video */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          {language === "vi" ? "Chi tiết sản phẩm" : "Product Details"}
        </h2>

        {/* Product Video (if available) */}
        {product.videoId && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{language === "vi" ? "Video sản phẩm" : "Product Video"}</h3>
            <YouTubeEmbed videoId={product.videoId} title={productName} />
          </div>
        )}

        {/* Product Details Content */}
        <div dangerouslySetInnerHTML={{ __html: productDetails }} className="prose max-w-none" />
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts products={relatedProducts} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}


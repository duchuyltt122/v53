"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, ChevronLeft, Filter, SlidersHorizontal, X, Plus, Minus, ShoppingCart } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { getAllProducts, getProductCategories } from "@/services/product-service"
import { AppProduct } from "@/types/products"

export default function ProductsContentApi() {
  const { language, t } = useLanguage()
  const { addItem } = useCart()
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState("default")
  const [displayCount, setDisplayCount] = useState("12")
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [isClient, setIsClient] = useState(false)
  const [products, setProducts] = useState<AppProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Lấy danh mục sản phẩm
  const categories = getProductCategories();

  // Đảm bảo hydration đúng và lấy dữ liệu sản phẩm
  useEffect(() => {
    setIsClient(true)

    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products...');
        const productsData = await getAllProducts();
        console.log('Products data:', productsData);
        setProducts(productsData);

        // Initialize quantities for all products
        const initialQuantities: Record<string, number> = {};
        productsData.forEach((product) => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return language === "vi" ? a.name.vi.localeCompare(b.name.vi) : a.name.en.localeCompare(b.name.en);
      case "name-desc":
        return language === "vi" ? b.name.vi.localeCompare(a.name.vi) : b.name.en.localeCompare(a.name.en);
      default:
        return 0;
    }
  });

  // Limit products based on display count
  const displayedProducts = sortedProducts.slice(0, Number.parseInt(displayCount));

  const handleQuickAddToCart = (product: AppProduct, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const quantity = quantities[product.id] || 1;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0]?.src,
      quantity: quantity
    });
  };

  const increaseQuantity = (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  // Format currency based on language
  const formatCurrency = (price: number) => {
    return language === "vi"
      ? `${price.toLocaleString('vi-VN')}₫`
      : `$${(price / 23000).toFixed(2)}`;
  };

  // Nếu chưa hydrate xong, không render gì cả
  if (!isClient) return null;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-3 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-xs text-gray-500 hover:text-green-700">
                  {language === "vi" ? "Trang chủ" : "Home"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xs text-gray-400">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/san-pham" className="text-xs text-green-700 font-medium">
                  {language === "vi" ? "Sản phẩm" : "Products"}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden bg-white border-b py-2 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <button
            className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <>
                <X className="h-4 w-4 mr-2" />
                {language === "vi" ? "Đóng bộ lọc" : "Close Filter"}
              </>
            ) : (
              <>
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {language === "vi" ? "Lọc sản phẩm" : "Filter Products"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-4 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Sidebar - Mobile (Overlay) */}
            {showFilters && (
              <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowFilters(false)}>
                <div
                  className="absolute right-0 top-0 bottom-0 w-4/5 max-w-xs bg-white overflow-y-auto p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">{language === "vi" ? "Bộ lọc sản phẩm" : "Product Filters"}</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                      {language === "vi" ? "Danh mục sản phẩm" : "Product Categories"}
                    </h3>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/san-pham?category=${category.id}`}
                            className="flex items-center text-sm hover:text-green-700"
                          >
                            <ChevronRight className="h-4 w-4 mr-2 text-green-700" />
                            {language === "vi" ? category.name.vi : category.name.en}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                      {language === "vi" ? "Lọc sản phẩm" : "Filter Products"}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">{language === "vi" ? "Giá" : "Price"}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox id="price-mobile-1" className="mr-2" />
                            <label htmlFor="price-mobile-1" className="text-sm">
                              {language === "vi" ? "Dưới 100.000₫" : "Under 100,000₫"}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="price-mobile-2" className="mr-2" />
                            <label htmlFor="price-mobile-2" className="text-sm">
                              100.000₫ - 300.000₫
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="price-mobile-3" className="mr-2" />
                            <label htmlFor="price-mobile-3" className="text-sm">
                              300.000₫ - 500.000₫
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="price-mobile-4" className="mr-2" />
                            <label htmlFor="price-mobile-4" className="text-sm">
                              {language === "vi" ? "Trên 500.000₫" : "Over 500,000₫"}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">{language === "vi" ? "Chất liệu" : "Material"}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox id="material-mobile-1" className="mr-2" />
                            <label htmlFor="material-mobile-1" className="text-sm">
                              {language === "vi" ? "Tre" : "Bamboo"}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="material-mobile-2" className="mr-2" />
                            <label htmlFor="material-mobile-2" className="text-sm">
                              {language === "vi" ? "Trúc" : "Reed"}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="material-mobile-3" className="mr-2" />
                            <label htmlFor="material-mobile-3" className="text-sm">
                              {language === "vi" ? "Gỗ" : "Wood"}
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox id="material-mobile-4" className="mr-2" />
                            <label htmlFor="material-mobile-4" className="text-sm">
                              {language === "vi" ? "Mây" : "Rattan"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="bg-green-700 hover:bg-green-800 w-full text-xs rounded-sm">
                        <Filter className="h-3 w-3 mr-2" />
                        {language === "vi" ? "Áp dụng" : "Apply"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar - Desktop */}
            <div className="hidden md:block w-full md:w-1/4">
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "Danh mục sản phẩm" : "Product Categories"}
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/san-pham?category=${category.id}`}
                        className="flex items-center text-sm hover:text-green-700"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 text-green-700" />
                        {language === "vi" ? category.name.vi : category.name.en}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "Lọc sản phẩm" : "Filter Products"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">{language === "vi" ? "Giá" : "Price"}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="price-1" className="mr-2" />
                        <label htmlFor="price-1" className="text-sm">
                          {language === "vi" ? "Dưới 100.000₫" : "Under 100,000₫"}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="price-2" className="mr-2" />
                        <label htmlFor="price-2" className="text-sm">
                          100.000₫ - 300.000₫
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="price-3" className="mr-2" />
                        <label htmlFor="price-3" className="text-sm">
                          300.000₫ - 500.000₫
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="price-4" className="mr-2" />
                        <label htmlFor="price-4" className="text-sm">
                          {language === "vi" ? "Trên 500.000₫" : "Over 500,000₫"}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">{language === "vi" ? "Chất liệu" : "Material"}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox id="material-1" className="mr-2" />
                        <label htmlFor="material-1" className="text-sm">
                          {language === "vi" ? "Tre" : "Bamboo"}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="material-2" className="mr-2" />
                        <label htmlFor="material-2" className="text-sm">
                          {language === "vi" ? "Trúc" : "Reed"}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="material-3" className="mr-2" />
                        <label htmlFor="material-3" className="text-sm">
                          {language === "vi" ? "Gỗ" : "Wood"}
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox id="material-4" className="mr-2" />
                        <label htmlFor="material-4" className="text-sm">
                          {language === "vi" ? "Mây" : "Rattan"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="bg-green-700 hover:bg-green-800 w-full text-xs rounded-sm">
                    <Filter className="h-3 w-3 mr-2" />
                    {language === "vi" ? "Lọc sản phẩm" : "Filter Products"}
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "Sản phẩm nổi bật" : "Featured Products"}
                </h3>
                <div className="space-y-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={`featured-${product.id}`} className="flex gap-2">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={product.images[0]?.src || "/placeholder.svg"}
                          alt={language === "vi" ? product.name.vi : product.name.en}
                          fill
                          sizes="64px"
                          className="object-cover rounded"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                          <Link href={`/san-pham/${product.id}`}>
                            {language === "vi" ? product.name.vi : product.name.en}
                          </Link>
                        </h4>
                        <p className="text-xs text-red-600 font-medium">
                          {formatCurrency(product.salePrice || product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="w-full md:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-medium text-green-700 mb-2 sm:mb-0">
                  {language === "vi" ? "Tất cả sản phẩm" : "All Products"}
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm whitespace-nowrap">{t("products.sort")}</span>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full sm:w-[180px] h-8 text-xs rounded-sm">
                        <SelectValue placeholder={language === "vi" ? "Sắp xếp theo" : "Sort by"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">{language === "vi" ? "Mặc định" : "Default"}</SelectItem>
                        <SelectItem value="price-asc">
                          {language === "vi" ? "Giá: Thấp đến cao" : "Price: Low to High"}
                        </SelectItem>
                        <SelectItem value="price-desc">
                          {language === "vi" ? "Giá: Cao đến thấp" : "Price: High to Low"}
                        </SelectItem>
                        <SelectItem value="name-asc">{language === "vi" ? "Tên: A-Z" : "Name: A-Z"}</SelectItem>
                        <SelectItem value="name-desc">{language === "vi" ? "Tên: Z-A" : "Name: Z-A"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm whitespace-nowrap">{t("products.display")}</span>
                    <Select value={displayCount} onValueChange={setDisplayCount}>
                      <SelectTrigger className="w-full sm:w-[80px] h-8 text-xs rounded-sm">
                        <SelectValue placeholder="12" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="24">24</SelectItem>
                        <SelectItem value="36">36</SelectItem>
                        <SelectItem value="48">48</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Loading state */}
              {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded overflow-hidden animate-pulse">
                      <div className="h-36 sm:h-40 md:h-48 bg-gray-200"></div>
                      <div className="p-2 sm:p-3 space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="flex justify-between items-center">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-6 bg-gray-200 rounded w-12"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="text-center py-8">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button
                    className="bg-green-700 hover:bg-green-800"
                    onClick={() => window.location.reload()}
                  >
                    {language === "vi" ? "Thử lại" : "Try Again"}
                  </Button>
                </div>
              )}

              {/* Products grid */}
              {!loading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
                  {displayedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded overflow-hidden group hover:shadow-md transition-shadow"
                    >
                      <Link href={`/san-pham/${product.id}`} className="block">
                        <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                          <Image
                            src={product.images[0]?.src || "/placeholder.svg"}
                            alt={language === "vi" ? product.name.vi : product.name.en}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2 sm:p-3">
                          <div className="text-xs text-gray-500 mb-1">
                            {language === "vi" ? product.category.name.vi : product.category.name.en}
                          </div>
                          <h3 className="text-sm font-medium mb-2 line-clamp-2 group-hover:text-green-700">
                            {language === "vi" ? product.name.vi : product.name.en}
                          </h3>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-red-600 font-medium">
                              {formatCurrency(product.salePrice || product.price)}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Quantity selector and Add to Cart button */}
                      <div className="p-2 sm:p-3 pt-0 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-2">
                          {/* Quantity selector */}
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs text-gray-500">{language === "vi" ? "Số lượng:" : "Quantity:"}</span>
                            <div className="flex items-center border border-gray-300 rounded-sm">
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                onClick={(e) => decreaseQuantity(product.id, e)}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 h-8 flex items-center justify-center text-xs">
                                {quantities[product.id] || 1}
                              </span>
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                                onClick={(e) => increaseQuantity(product.id, e)}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          {/* Add to cart button */}
                          <Button
                            className="bg-green-700 hover:bg-green-800 text-xs h-8 w-full rounded-sm"
                            onClick={(e) => handleQuickAddToCart(product, e)}
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            {language === "vi" ? "THÊM VÀO GIỎ" : "ADD TO CART"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!loading && !error && displayedProducts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    {language === "vi" ? "Không tìm thấy sản phẩm nào." : "No products found."}
                  </p>
                </div>
              )}

              {/* Pagination */}
              {!loading && !error && displayedProducts.length > 0 && (
                <div className="flex justify-center mt-6 md:mt-8">
                  <nav className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-sm">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 rounded-sm bg-green-700 text-white hover:bg-green-800"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-sm">
                      2
                    </Button>
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-sm">
                      3
                    </Button>
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-sm">
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next page</span>
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

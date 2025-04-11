"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLanguage } from "@/contexts/language-context"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, User, Facebook, Twitter, Instagram } from "lucide-react"

export default function NewsDetailPage() {
  const { language } = useLanguage()
  const params = useParams()
  const [newsId, setNewsId] = useState<number>(0)

  useEffect(() => {
    if (params.id) {
      setNewsId(Number(params.id))
    }
  }, [params])

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title_vi: "Taboo Bamboo Workshop ra mắt bộ sưu tập mới cho mùa hè 2023",
      title_en: "Taboo Bamboo Workshop launches new collection for Summer 2023",
      date: "15/05/2023",
      author_vi: "Admin",
      author_en: "Admin",
      excerpt_vi:
        "Taboo Bamboo Workshop vừa cho ra mắt bộ sưu tập mới với các sản phẩm thủ công từ tre dành cho mùa hè 2023, mang đến không gian sống xanh và gần gũi với thiên nhiên.",
      excerpt_en:
        "Taboo Bamboo Workshop has just launched a new collection of bamboo handicrafts for Summer 2023, bringing a green living space that is close to nature.",
      content_vi: `
        <p>Taboo Bamboo Workshop vừa cho ra mắt bộ sưu tập mới với các sản phẩm thủ công từ tre dành cho mùa hè 2023, mang đến không gian sống xanh và gần gũi với thiên nhiên.</p>
        
        <p>Bộ sưu tập mới này bao gồm các sản phẩm như đèn tre, giỏ đựng, khay đựng, và các vật dụng trang trí nội thất khác, tất cả đều được làm thủ công từ tre với thiết kế hiện đại và tinh tế.</p>
        
        <p>Theo chia sẻ từ chủ nhân của Taboo Bamboo Workshop, bộ sưu tập mới này được lấy cảm hứng từ vẻ đẹp tự nhiên của Hội An và mong muốn mang lại không gian sống gần gũi với thiên nhiên cho người dùng.</p>
        
        <p>"Chúng tôi muốn tạo ra những sản phẩm không chỉ đẹp mắt mà còn thân thiện với môi trường. Tre là một nguyên liệu tuyệt vời, bền vững và có thể tái tạo nhanh chóng. Bộ sưu tập mới này thể hiện cam kết của chúng tôi trong việc bảo vệ môi trường và ph��t triển bền vững," ông chủ Taboo Bamboo Workshop chia sẻ.</p>
        
        <p>Bộ sưu tập mới đã nhận được nhiều phản hồi tích cực từ khách hàng và các chuyên gia trong ngành. Nhiều người đánh giá cao tính thẩm mỹ, chất lượng và tính bền vững của các sản phẩm.</p>
        
        <p>Các sản phẩm trong bộ sưu tập mới hiện đã có mặt tại cửa hàng của Taboo Bamboo Workshop tại Hội An và trên website chính thức của thương hiệu.</p>
      `,
      content_en: `
        <p>Taboo Bamboo Workshop has just launched a new collection of bamboo handicrafts for Summer 2023, bringing a green living space that is close to nature.</p>
        
        <p>This new collection includes products such as bamboo lamps, baskets, trays, and other interior decorative items, all handcrafted from bamboo with modern and sophisticated designs.</p>
        
        <p>According to the owner of Taboo Bamboo Workshop, this new collection is inspired by the natural beauty of Hoi An and the desire to bring a living space close to nature for users.</p>
        
        <p>"We want to create products that are not only beautiful but also environmentally friendly. Bamboo is a great material, sustainable and can be quickly regenerated. This new collection demonstrates our commitment to environmental protection and sustainable development," the owner of Taboo Bamboo Workshop shared.</p>
        
        <p>The new collection has received many positive feedbacks from customers and industry experts. Many people appreciate the aesthetics, quality, and sustainability of the products.</p>
        
        <p>Products in the new collection are now available at Taboo Bamboo Workshop's store in Hoi An and on the brand's official website.</p>
      `,
      image: "/placeholder.svg?height=500&width=800",
      tags_vi: ["Tre", "Thủ công", "Hội An", "Bộ sưu tập mới", "Mùa hè 2023"],
      tags_en: ["Bamboo", "Handicraft", "Hoi An", "New collection", "Summer 2023"],
    },
    {
      id: 2,
      title_vi: "Hướng dẫn bảo quản sản phẩm thủ công từ tre",
      title_en: "Guide to preserving bamboo handicraft products",
      date: "10/04/2023",
      author_vi: "Admin",
      author_en: "Admin",
      excerpt_vi:
        "Bài viết này sẽ hướng dẫn bạn cách bảo quản các sản phẩm thủ công từ tre để giữ được vẻ đẹp và độ bền lâu dài cho sản phẩm.",
      excerpt_en:
        "This article will guide you on how to preserve bamboo handicraft products to maintain their beauty and durability for a long time.",
      content_vi: `
        <p>Bài viết này sẽ hướng dẫn bạn cách bảo quản các sản phẩm thủ công từ tre để giữ được vẻ đẹp và độ bền lâu dài cho sản phẩm.</p>
        
        <h3>1. Vệ sinh thường xuyên</h3>
        <p>Sản phẩm từ tre cần được vệ sinh thường xuyên để loại bỏ bụi bẩn và ngăn ngừa nấm mốc. Bạn có thể sử dụng khăn mềm, hơi ẩm để lau nhẹ nhàng bề mặt sản phẩm. Tránh sử dụng các chất tẩy rửa mạnh hoặc các dụng cụ cứng có thể làm xước hoặc hư hại sản phẩm.</p>
        
        <h3>2. Tránh ánh nắng trực tiếp</h3>
        <p>Ánh nắng mặt trời trực tiếp có thể làm phai màu và làm khô sản phẩm tre, dẫn đến nứt và vỡ. Hãy đặt sản phẩm tre ở nơi có ánh sáng tự nhiên nhưng tránh ánh nắng trực tiếp.</p>
        
        <h3>3. Kiểm soát độ ẩm</h3>
        <p>Tre là vật liệu tự nhiên và có thể bị ảnh hưởng bởi độ ẩm. Môi trường quá khô có thể làm tre nứt, trong khi môi trường quá ẩm có thể dẫn đến nấm mốc. Hãy đảm bảo sản phẩm tre của bạn được đặt trong môi trường có độ ẩm vừa phải.</p>
        
        <h3>4. Bảo vệ khỏi côn trùng</h3>
        <p>Tre có thể bị tấn công bởi côn trùng như mối và mọt. Để bảo vệ sản phẩm, bạn có thể sử dụng các sản phẩm bảo vệ gỗ tự nhiên hoặc dầu bảo quản tre.</p>
        
        <h3>5. Tái xử lý định kỳ</h3>
        <p>Theo thời gian, lớp bảo vệ trên sản phẩm tre có thể bị mòn. Bạn nên tái xử lý sản phẩm định kỳ (khoảng 6 tháng đến 1 năm một lần) bằng dầu bảo quản tre hoặc sáp ong để duy trì vẻ đẹp và độ bền của sản phẩm.</p>
        
        <p>Bằng cách tuân thủ các hướng dẫn bảo quản trên, bạn có thể giữ cho các sản phẩm thủ công từ tre của mình luôn đẹp và bền lâu, mang lại không gian sống xanh và gần gũi với thiên nhiên cho gia đình bạn.</p>
      `,
      content_en: `
        <p>This article will guide you on how to preserve bamboo handicraft products to maintain their beauty and durability for a long time.</p>
        
        <h3>1. Regular Cleaning</h3>
        <p>Bamboo products need to be cleaned regularly to remove dust and prevent mold. You can use a soft, slightly damp cloth to gently wipe the product surface. Avoid using strong detergents or hard tools that can scratch or damage the product.</p>
        
        <h3>2. Avoid Direct Sunlight</h3>
        <p>Direct sunlight can fade the color and dry out bamboo products, leading to cracks and breaks. Place bamboo products in a place with natural light but avoid direct sunlight.</p>
        
        <h3>3. Control Humidity</h3>
        <p>Bamboo is a natural material and can be affected by humidity. An environment that is too dry can cause bamboo to crack, while an environment that is too humid can lead to mold. Make sure your bamboo products are placed in an environment with moderate humidity.</p>
        
        <h3>4. Protect from Insects</h3>
        <p>Bamboo can be attacked by insects such as termites and beetles. To protect the product, you can use natural wood protection products or bamboo preservation oil.</p>
        
        <h3>5. Periodic Reprocessing</h3>
        <p>Over time, the protective layer on bamboo products may wear off. You should reprocess the product periodically (about once every 6 months to 1 year) with bamboo preservation oil or beeswax to maintain the beauty and durability of the product.</p>
        
        <p>By following the above preservation guidelines, you can keep your bamboo handicraft products always beautiful and durable, bringing a green living space that is close to nature for your family.</p>
      `,
      image: "/placeholder.svg?height=500&width=800",
      tags_vi: ["Tre", "Thủ công", "Bảo quản", "Hướng dẫn"],
      tags_en: ["Bamboo", "Handicraft", "Preservation", "Guide"],
    },
    // Add more news items as needed
  ]

  const currentNews = newsItems.find((item) => item.id === newsId) || newsItems[0]
  const relatedNews = newsItems.filter((item) => item.id !== newsId).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Header & Navigation */}
      <Header />

      {/* Banner */}
      <div className="relative h-64 sm:h-80 bg-gray-800 w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Chi Tiết Tin Tức Banner"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-medium text-white">
            {language === "vi" ? "CHI TIẾT TIN TỨC" : "NEWS DETAIL"}
          </h1>
        </div>
      </div>

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
                <BreadcrumbLink href="/tin-tuc" className="text-xs text-gray-500 hover:text-green-700">
                  {language === "vi" ? "Tin tức" : "News"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xs text-gray-400">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/tin-tuc/${currentNews.id}`} className="text-xs text-green-700 font-medium">
                  {language === "vi" ? currentNews.title_vi : currentNews.title_en}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white">
                <h1 className="text-2xl md:text-3xl font-medium text-green-700 mb-4">
                  {language === "vi" ? currentNews.title_vi : currentNews.title_en}
                </h1>

                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{currentNews.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{language === "vi" ? currentNews.author_vi : currentNews.author_en}</span>
                  </div>
                </div>

                <div className="relative h-64 md:h-96 mb-6">
                  <Image
                    src={currentNews.image || "/placeholder.svg"}
                    alt={language === "vi" ? currentNews.title_vi : currentNews.title_en}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <div
                  className="prose max-w-none mb-8"
                  dangerouslySetInnerHTML={{
                    __html: language === "vi" ? currentNews.content_vi : currentNews.content_en,
                  }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(language === "vi" ? currentNews.tags_vi : currentNews.tags_en).map((tag, index) => (
                    <Link key={index} href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Share */}
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-sm font-medium">{language === "vi" ? "Chia sẻ:" : "Share:"}</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-800">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-blue-400 hover:text-blue-600">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-pink-600 hover:text-pink-800">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>

                {/* Related News */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-medium text-green-700 mb-4">
                    {language === "vi" ? "Bài viết liên quan" : "Related Posts"}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedNews.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-40">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={language === "vi" ? item.title_vi : item.title_en}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-medium mb-2 line-clamp-2 hover:text-green-700">
                            <Link href={`/tin-tuc/${item.id}`}>
                              {language === "vi" ? item.title_vi : item.title_en}
                            </Link>
                          </h4>

                          <div className="flex items-center text-gray-500 text-xs mb-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "DANH MỤC" : "CATEGORIES"}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Tin tức" : "News"}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Sự kiện" : "Events"}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Hướng dẫn" : "Guides"}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Khuyến mãi" : "Promotions"}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "BÀI VIẾT MỚI NHẤT" : "LATEST POSTS"}
                </h3>
                <div className="space-y-4">
                  {newsItems.slice(0, 3).map((item) => (
                    <div key={`sidebar-${item.id}`} className="flex gap-2">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={language === "vi" ? item.title_vi : item.title_en}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                          <Link href={`/tin-tuc/${item.id}`}>{language === "vi" ? item.title_vi : item.title_en}</Link>
                        </h4>
                        <div className="flex items-center text-gray-500 text-[10px] mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "TAGS" : "TAGS"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Tre" : "Bamboo"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Thủ công" : "Handicraft"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Hội An" : "Hoi An"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Truyền thống" : "Traditional"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Sản phẩm" : "Products"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Workshop" : "Workshop"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}


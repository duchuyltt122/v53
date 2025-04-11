"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Suspense } from "react"
import { FeaturedProductsApi } from "./featured-products-api"

export default function HomeContent() {
  const { language } = useLanguage()

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//slide21.jpg"
          alt="Taboo Bamboo Workshop"
          fill
          sizes="100vw"
          priority
          className="attachment-original size-original"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Taboo Bamboo Workshop</h1>
              <p className="text-xl text-black mb-8">
                {language === "vi"
                  ? "Nghệ thuật thủ công tre truyền thống tại Hội An"
                  : "Traditional bamboo craftsmanship in Hoi An"}
              </p>
              <Link
                href="/san-pham"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                {language === "vi" ? "Khám phá sản phẩm" : "Explore Products"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <Suspense
        fallback={
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
        }
      >
        <FeaturedProductsApi />
      </Suspense>

      {/* Hidden for replacement with API data */}
      {false && (<div className="py-16 bg-white">
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
                  ? "Đèn tre thủ công với thiết kế độc đáo, tạo không gian ấm cúng cho ngôi nhà của bạn."
                  : "Handcrafted bamboo lamp with unique design, creating a cozy atmosphere for your home."}
              </p>
              <Link
                href="/san-pham/3"
                className="text-green-600 hover:text-green-800 font-medium inline-flex items-center"
              >
                {language === "vi" ? "Xem chi tiết" : "View Details"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>)}

      {/* About Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Taboo Bamboo Workshop"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">{language === "vi" ? "Về chúng tôi" : "About Us"}</h2>
              <p className="text-gray-600 mb-4">
                {language === "vi"
                  ? "Taboo Bamboo Workshop là một cơ sở thủ công mỹ nghệ nổi tiếng tại Hội An, chuyên sản xuất các sản phẩm từ tre. Tọa lạc trong một không gian xanh mát ở ngoại ô Hội An, Taboo Bamboo không chỉ là nơi gìn giữ và phát triển nghề thuật thủ công truyền thống mà còn là điểm đến lý tưởng cho những ai yêu thích sáng tạo và mong muốn khám phá vẻ đẹp tự nhiên của tre."
                  : "Taboo Bamboo Workshop is a renowned handicraft establishment in Hoi An, specializing in bamboo products. Located in a green space on the outskirts of Hoi An, Taboo Bamboo is not only a place to preserve and develop traditional craftsmanship but also an ideal destination for those who love creativity and want to explore the natural beauty of bamboo."}
              </p>
              <p className="text-gray-600 mb-6">
                {language === "vi"
                  ? "Với đội ngũ nghệ nhân tay nghề cao và nhiều năm kinh nghiệm, chúng tôi tự hào mang đến những sản phẩm tre chất lượng cao, độc đáo và thân thiện với môi trường."
                  : "With a team of highly skilled artisans and years of experience, we are proud to bring high-quality, unique, and environmentally friendly bamboo products."}
              </p>
              <Link
                href="/gioi-thieu"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                {language === "vi" ? "Tìm hiểu thêm" : "Learn More"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Experience - Lazy load phần này vì nó nằm ở dưới fold */}
      <Suspense
        fallback={
          <div className="py-16 bg-white">
            <div className="container mx-auto px-4 h-[400px] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
            </div>
          </div>
        }
      >
        <WorkshopExperience language={language} />
      </Suspense>

      {/* Testimonials - Lazy load phần này vì nó nằm ở dưới fold */}
      <Suspense
        fallback={
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 h-[300px] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
            </div>
          </div>
        }
      >
        <Testimonials language={language} />
      </Suspense>
    </>
  )
}

// Tách các phần không cần thiết cho first load thành các component riêng
function WorkshopExperience({ language }: { language: string }) {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === "vi" ? "Trải nghiệm làm nghề thủ công" : "Workshop Experience"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Experience 1 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">{language === "vi" ? "Học làm đèn tre" : "Bamboo Lamp Making"}</h3>
            <p className="text-gray-600">
              {language === "vi"
                ? "Tham gia khóa học làm đèn tre và tạo ra tác phẩm nghệ thuật độc đáo của riêng bạn dưới sự hướng dẫn của các nghệ nhân lành nghề."
                : "Join our bamboo lamp making workshop and create your own unique art piece under the guidance of skilled artisans."}
            </p>
          </div>

          {/* Experience 2 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">{language === "vi" ? "Đan giỏ tre" : "Bamboo Basket Weaving"}</h3>
            <p className="text-gray-600">
              {language === "vi"
                ? "Khám phá nghệ thuật đan lát truyền thống và học cách tạo ra những chiếc giỏ tre đẹp mắt và thực dụng."
                : "Discover the art of traditional weaving and learn how to create beautiful and practical bamboo baskets."}
            </p>
          </div>

          {/* Experience 3 */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">{language === "vi" ? "Tour tham quan xưởng" : "Workshop Tour"}</h3>
            <p className="text-gray-600">
              {language === "vi"
                ? "Tham quan xưởng sản xuất của chúng tôi để tìm hiểu về quy trình sản xuất và lịch sử của nghề thủ công tre tại Hội An."
                : "Tour our production workshop to learn about the manufacturing process and history of bamboo craftsmanship in Hoi An."}
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/calendar"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            {language === "vi" ? "Đặt lịch trải nghiệm" : "Book an Experience"}
          </Link>
        </div>
      </div>
    </div>
  )
}

function Testimonials({ language }: { language: string }) {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === "vi" ? "Khách hàng nói gì về chúng tôi" : "What Our Customers Say"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Customer"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium">Sarah Johnson</h4>
                <p className="text-gray-500 text-sm">USA</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              {language === "vi"
                ? "Tôi đã tham gia khóa học làm đèn tre và đó là một trải nghiệm tuyệt vời! Các nghệ nhân rất kiên nhẫn và tận tình. Tôi đã làm ra một chiếc đèn đẹp để mang về nhà làm quà lưu niệm."
                : "I took the bamboo lamp making workshop and it was an amazing experience! The artisans were patient and helpful. I made a beautiful lamp to take home as a souvenir."}
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Customer"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium">Nguyễn Văn Minh</h4>
                <p className="text-gray-500 text-sm">Việt Nam</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              {language === "vi"
                ? "Sản phẩm tre của Taboo Bamboo Workshop có chất lượng rất cao và thiết kế độc đáo. Tôi đã mua một bộ đèn tre cho nhà mình và rất hài lòng với sự lựa chọn này."
                : "The bamboo products from Taboo Bamboo Workshop are of very high quality and unique design. I bought a set of bamboo lamps for my home and am very satisfied with this choice."}
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Customer"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium">Hiroshi Tanaka</h4>
                <p className="text-gray-500 text-sm">Japan</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              {language === "vi"
                ? "Tour tham quan xưởng rất thú vị và đầy thông tin. Tôi đã học được rất nhiều về nghề thủ công tre truyền thống của Việt Nam. Các sản phẩm đều rất tinh xảo và độc đáo."
                : "The workshop tour was interesting and informative. I learned a lot about Vietnam's traditional bamboo craftsmanship. The products are all exquisite and unique."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}




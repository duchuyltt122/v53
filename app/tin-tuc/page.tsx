"use client"

import Image from "next/image"
import Link from "next/link"
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

export default function NewsPage() {
  const { language } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Header & Navigation */}
      <Header />

      {/* Banner */}
      <div className="relative w-full h-64 sm:h-80 bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/placeholder.svg?height=400&width=1920"
            alt="Tin Tức Banner"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-medium text-white">
              {language === "vi" ? "TIN TỨC & SỰ KIỆN" : "NEWS & EVENTS"}
            </h1>
            <p className="text-white text-lg mt-2 max-w-2xl mx-auto">
              {language === "vi"
                ? "Cập nhật thông tin mới nhất về Taboo Bamboo Workshop"
                : "Latest updates about Taboo Bamboo Workshop"}
            </p>
          </div>
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
                <BreadcrumbLink href="/tin-tuc" className="text-xs text-green-700 font-medium">
                  {language === "vi" ? "Tin tức" : "News"}
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
                <h2 className="text-xl font-medium text-green-700 mb-6 pb-2 border-b border-gray-200">
                  {language === "vi" ? "TIN TỨC MỚI NHẤT" : "LATEST NEWS"}
                </h2>

                <div className="space-y-8">
                  {/* News Item 1 */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative h-60 md:h-40 rounded-lg overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=160&width=240"
                          alt="Workshop Event"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{language === "vi" ? "15 Tháng 6, 2023" : "June 15, 2023"}</span>
                        <span className="mx-2">|</span>
                        <span>{language === "vi" ? "Sự kiện" : "Events"}</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        <Link href="/tin-tuc/1" className="hover:text-green-700">
                          {language === "vi"
                            ? "Khai trương xưởng sản xuất mới tại Hội An"
                            : "Grand opening of new workshop in Hoi An"}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {language === "vi"
                          ? "Taboo Bamboo Workshop vừa khai trương xưởng sản xuất mới tại Hội An, mở rộng quy mô sản xuất và không gian trải nghiệm cho du khách. Xưởng mới được thiết kế với không gian mở, thân thiện với môi trường và trang bị các công cụ hiện đại kết hợp với kỹ thuật truyền thống."
                          : "Taboo Bamboo Workshop has just opened a new production facility in Hoi An, expanding production scale and experience space for visitors. The new workshop is designed with open space, environmentally friendly and equipped with modern tools combined with traditional techniques."}
                      </p>
                      <Link
                        href="/tin-tuc/1"
                        className="text-green-600 hover:text-green-800 font-medium inline-flex items-center text-sm"
                      >
                        {language === "vi" ? "Đọc tiếp" : "Read more"}
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

                  {/* News Item 2 */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative h-60 md:h-40 rounded-lg overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=160&width=240"
                          alt="Bamboo Art Exhibition"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{language === "vi" ? "10 Tháng 5, 2023" : "May 10, 2023"}</span>
                        <span className="mx-2">|</span>
                        <span>{language === "vi" ? "Triển lãm" : "Exhibition"}</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        <Link href="/tin-tuc/2" className="hover:text-green-700">
                          {language === "vi"
                            ? "Triển lãm nghệ thuật tre tại Bảo tàng Đà Nẵng"
                            : "Bamboo art exhibition at Da Nang Museum"}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {language === "vi"
                          ? "Taboo Bamboo Workshop hợp tác với Bảo tàng Đà Nẵng tổ chức triển lãm nghệ thuật tre với chủ đề 'Tre - Hồn Việt'. Triển lãm trưng bày hơn 50 tác phẩm nghệ thuật từ tre, từ các vật dụng hàng ngày đến các tác phẩm điêu khắc hiện đại, thể hiện sự kết hợp giữa truyền thống và hiện đại."
                          : "Taboo Bamboo Workshop collaborates with Da Nang Museum to organize a bamboo art exhibition with the theme 'Bamboo - Vietnamese Soul'. The exhibition displays more than 50 bamboo artworks, from everyday items to modern sculptures, showing the combination of tradition and modernity."}
                      </p>
                      <Link
                        href="/tin-tuc/2"
                        className="text-green-600 hover:text-green-800 font-medium inline-flex items-center text-sm"
                      >
                        {language === "vi" ? "Đọc tiếp" : "Read more"}
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

                  {/* News Item 3 */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative h-60 md:h-40 rounded-lg overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=160&width=240"
                          alt="Bamboo Workshop for Children"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{language === "vi" ? "25 Tháng 4, 2023" : "April 25, 2023"}</span>
                        <span className="mx-2">|</span>
                        <span>{language === "vi" ? "Giáo dục" : "Education"}</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        <Link href="/tin-tuc/3" className="hover:text-green-700">
                          {language === "vi"
                            ? "Khóa học làm đồ thủ công từ tre cho trẻ em"
                            : "Bamboo crafting workshop for children"}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {language === "vi"
                          ? "Taboo Bamboo Workshop tổ chức khóa học làm đồ thủ công từ tre dành cho trẻ em từ 8-12 tuổi. Khóa học kéo dài 3 buổi, giúp các em nhỏ làm quen với nguyên liệu tre và học cách tạo ra các sản phẩm đơn giản như diều, đèn lồng, và đồ chơi từ tre."
                          : "Taboo Bamboo Workshop organizes bamboo crafting courses for children aged 8-12. The course lasts for 3 sessions, helping children get acquainted with bamboo materials and learn how to create simple products such as kites, lanterns, and toys from bamboo."}
                      </p>
                      <Link
                        href="/tin-tuc/3"
                        className="text-green-600 hover:text-green-800 font-medium inline-flex items-center text-sm"
                      >
                        {language === "vi" ? "Đọc tiếp" : "Read more"}
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

                  {/* News Item 4 */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative h-60 md:h-40 rounded-lg overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=160&width=240"
                          alt="Bamboo Products Export"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{language === "vi" ? "15 Tháng 3, 2023" : "March 15, 2023"}</span>
                        <span className="mx-2">|</span>
                        <span>{language === "vi" ? "Kinh doanh" : "Business"}</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        <Link href="/tin-tuc/4" className="hover:text-green-700">
                          {language === "vi"
                            ? "Taboo Bamboo mở rộng thị trường xuất khẩu sang châu Âu"
                            : "Taboo Bamboo expands export market to Europe"}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {language === "vi"
                          ? "Taboo Bamboo Workshop vừa ký kết hợp đồng xuất khẩu sản phẩm thủ công mỹ nghệ từ tre sang thị trường châu Âu. Đây là bước tiến quan trọng trong chiến lược phát triển thị trường quốc tế của Taboo Bamboo, đưa các sản phẩm thủ công truyền thống Việt Nam ra thế giới."
                          : "Taboo Bamboo Workshop has just signed a contract to export bamboo handicrafts to the European market. This is an important step in Taboo Bamboo's international market development strategy, bringing Vietnamese traditional handicrafts to the world."}
                      </p>
                      <Link
                        href="/tin-tuc/4"
                        className="text-green-600 hover:text-green-800 font-medium inline-flex items-center text-sm"
                      >
                        {language === "vi" ? "Đọc tiếp" : "Read more"}
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

                {/* Pagination */}
                <div className="flex justify-center mt-10">
                  <nav className="inline-flex">
                    <a
                      href="#"
                      className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      {language === "vi" ? "Trước" : "Previous"}
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-green-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      {language === "vi" ? "Sau" : "Next"}
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              {/* Search */}
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "TÌM KIẾM" : "SEARCH"}
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={language === "vi" ? "Tìm kiếm..." : "Search..."}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "DANH MỤC" : "CATEGORIES"}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1 flex justify-between">
                      <span>{language === "vi" ? "Sự kiện" : "Events"}</span>
                      <span className="text-gray-500">(5)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1 flex justify-between">
                      <span>{language === "vi" ? "Triển lãm" : "Exhibitions"}</span>
                      <span className="text-gray-500">(3)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1 flex justify-between">
                      <span>{language === "vi" ? "Giáo dục" : "Education"}</span>
                      <span className="text-gray-500">(4)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1 flex justify-between">
                      <span>{language === "vi" ? "Kinh doanh" : "Business"}</span>
                      <span className="text-gray-500">(2)</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1 flex justify-between">
                      <span>{language === "vi" ? "Sản phẩm mới" : "New Products"}</span>
                      <span className="text-gray-500">(6)</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "BÀI VIẾT GẦN ĐÂY" : "RECENT POSTS"}
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Workshop Event"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                        <Link href="/tin-tuc/1">
                          {language === "vi"
                            ? "Khai trương xưởng sản xuất mới tại Hội An"
                            : "Grand opening of new workshop in Hoi An"}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === "vi" ? "15 Tháng 6, 2023" : "June 15, 2023"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Bamboo Art Exhibition"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                        <Link href="/tin-tuc/2">
                          {language === "vi"
                            ? "Triển lãm nghệ thuật tre tại Bảo tàng Đà Nẵng"
                            : "Bamboo art exhibition at Da Nang Museum"}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === "vi" ? "10 Tháng 5, 2023" : "May 10, 2023"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Bamboo Workshop for Children"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                        <Link href="/tin-tuc/3">
                          {language === "vi"
                            ? "Khóa học làm đồ thủ công từ tre cho trẻ em"
                            : "Bamboo crafting workshop for children"}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === "vi" ? "25 Tháng 4, 2023" : "April 25, 2023"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "THẺ" : "TAGS"}
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
                    {language === "vi" ? "Đèn tre" : "Bamboo Lamps"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Triển lãm" : "Exhibition"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Truyền thống" : "Traditional"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Nghệ thuật" : "Art"}
                  </Link>
                  <Link href="#" className="text-xs bg-gray-200 hover:bg-green-100 px-2 py-1 rounded">
                    {language === "vi" ? "Đồ thủ công" : "Crafts"}
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


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

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Header & Navigation */}
      <Header />

      {/* Banner */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="Giới thiệu Banner"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-medium text-white">
              {language === "vi" ? "GIỚI THIỆU VỀ CHÚNG TÔI" : "ABOUT US"}
            </h1>
            <p className="text-white text-lg mt-2 max-w-2xl mx-auto">
              {language === "vi"
                ? "Taboo Bamboo Workshop - Nghệ thuật thủ công tre truyền thống tại Hội An"
                : "Taboo Bamboo Workshop - Traditional bamboo craftsmanship in Hoi An"}
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
                <BreadcrumbLink href="/gioi-thieu" className="text-xs text-green-700 font-medium">
                  {language === "vi" ? "Giới thiệu" : "About Us"}
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
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "DANH MỤC" : "CATEGORIES"}
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Đèn tre" : "Bamboo Lamps"}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Đồng hồ tre" : "Bamboo Clocks"}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Tranh tre" : "Bamboo Paintings"}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-green-700 block py-1">
                      {language === "vi" ? "Lịnh vật bằng tre" : "Bamboo Figurines"}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "SẢN PHẨM XEM NHIỀU" : "POPULAR PRODUCTS"}
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Lịnh vật cá chép bằng tre"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                        <Link href="#">{language === "vi" ? "Lịnh vật cá chép bằng tre" : "Bamboo Carp Figurine"}</Link>
                      </h4>
                      <Link href="#" className="text-xs text-green-700 hover:underline mt-1 inline-block">
                        {language === "vi" ? "Liên hệ" : "Contact"}
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Sản phẩm thủ công mỹ nghệ Ông Vàng"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                        <Link href="#">
                          {language === "vi" ? "Sản phẩm thủ công mỹ nghệ Ông Vàng" : "Ong Vang Handicraft Products"}
                        </Link>
                      </h4>
                      <Link href="#" className="text-xs text-green-700 hover:underline mt-1 inline-block">
                        {language === "vi" ? "Liên hệ" : "Contact"}
                      </Link>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Đèn hoa sen bằng tre"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium line-clamp-2 hover:text-green-700">
                        <Link href="#">{language === "vi" ? "Đèn hoa sen bằng tre" : "Bamboo Lotus Lamp"}</Link>
                      </h4>
                      <Link href="#" className="text-xs text-green-700 hover:underline mt-1 inline-block">
                        {language === "vi" ? "Liên hệ" : "Contact"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <div className="bg-white">
                <h2 className="text-xl font-medium text-green-700 mb-4 pb-2 border-b border-gray-200">
                  {language === "vi" ? "Giới thiệu về chúng tôi" : "About Us"}
                </h2>

                <h3 className="text-lg font-medium mb-3">
                  {language === "vi"
                    ? "Giới thiệu về Taboo Bamboo Workshop - Nghệ thuật thủ công tre truyền thống tại Hội An"
                    : "About Taboo Bamboo Workshop - Traditional bamboo craftsmanship in Hoi An"}
                </h3>

                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    {language === "vi"
                      ? "Taboo Bamboo Workshop là một cơ sở thủ công mỹ nghệ nổi tiếng tại Hội An, chuyên sản xuất các sản phẩm từ tre. Tọa lạc trong một không gian xanh mát ở ngoại ô Hội An, Taboo Bamboo không chỉ là nơi gìn giữ và phát triển nghề thuật thủ công truyền thống mà còn là điểm đến lý tưởng cho những ai yêu thích sáng tạo và mong muốn khám phá vẻ đẹp tự nhiên của tre."
                      : "Taboo Bamboo Workshop is a renowned handicraft establishment in Hoi An, specializing in bamboo products. Located in a green space on the outskirts of Hoi An, Taboo Bamboo is not only a place to preserve and develop traditional craftsmanship but also an ideal destination for those who love creativity and want to explore the natural beauty of bamboo."}
                  </p>

                  <h4 className="font-medium text-green-700">
                    {language === "vi" ? "Sứ mệnh và giá trị cốt lõi" : "Mission and Core Values"}
                  </h4>

                  <p>
                    {language === "vi"
                      ? "Taboo Bamboo Workshop ra đời với sứ mệnh bảo tồn và phát huy các giá trị văn hóa truyền thống của nghề thủ công tre. Với tinh yêu và niềm đam mê đối với cây tre, chủ nhân của Taboo Bamboo đã xây dựng nên một không gian nghệ thuật nơi mà tre được biến hóa thành những sản phẩm tinh xảo, độc đáo, và thân thiện với môi trường."
                      : "Taboo Bamboo Workshop was born with the mission of preserving and promoting the traditional cultural values of bamboo craftsmanship. With love and passion for bamboo, the owner of Taboo Bamboo has built an artistic space where bamboo is transformed into sophisticated, unique, and environmentally friendly products."}
                  </p>

                  <p>
                    {language === "vi"
                      ? "Tại Taboo Bamboo, mỗi sản phẩm đều được chế tác thủ công một cách tỉ mỉ và công phu, từ các vật dụng hàng ngày như đèn, giỏ, và khay đựng cho đến các món đồ trang trí nghệ thuật. Sử dụng nguyên liệu hoàn toàn tự nhiên và quy trình sản xuất thân thiện với môi trường, các sản phẩm của Taboo Bamboo không chỉ có giá trị thẩm mỹ cao mà còn mang đậm nét truyền thống Việt Nam."
                      : "At Taboo Bamboo, each product is meticulously and elaborately handcrafted, from everyday items such as lamps, baskets, and trays to artistic decorative items. Using completely natural materials and environmentally friendly production processes, Taboo Bamboo's products not only have high aesthetic value but also carry the deep traditional traits of Vietnam."}
                  </p>

                  <div className="my-6">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="Taboo Bamboo Workshop"
                      width={800}
                      height={400}
                      className="w-full h-auto rounded"
                    />
                  </div>

                  <h4 className="font-medium text-green-700">
                    {language === "vi" ? "Quy trình sản xuất thủ công" : "Handcrafting Process"}
                  </h4>

                  <p>
                    {language === "vi"
                      ? "Quy trình sản xuất tại Taboo Bamboo được thực hiện hoàn toàn thủ công, từ việc chọn lọc và xử lý nguyên liệu đến khâu tạo hình và hoàn thiện sản phẩm. Tre sau khi được thu hoạch sẽ trải qua các giai đoạn xử lý như phơi khô, hun khói, và tẩm mầu tự nhiên để đảm bảo độ bền và tính thẩm mỹ của sản phẩm."
                      : "The production process at Taboo Bamboo is carried out entirely by hand, from selecting and processing materials to shaping and finishing products. After being harvested, bamboo goes through processing stages such as drying, smoking, and natural dyeing to ensure the durability and aesthetics of the product."}
                  </p>

                  <h4 className="font-medium text-green-700">
                    {language === "vi" ? "Những nghệ nhân tài hoa" : "Talented Artisans"}
                  </h4>

                  <p>
                    {language === "vi"
                      ? "Những nghệ nhân tại Taboo Bamboo không chỉ có tay nghề cao mà còn sở hữu sự sáng tạo và tinh thần cống hiến với nghề. Họ kết hợp các kỹ thuật truyền thống với những ý tưởng hiện đại để tạo ra các sản phẩm độc đáo, mang dấu ấn riêng của Taboo Bamboo."
                      : "The artisans at Taboo Bamboo not only have high skills but also possess creativity and dedication to the craft. They combine traditional techniques with modern ideas to create unique products bearing the distinctive mark of Taboo Bamboo."}
                  </p>

                  <div className="my-6">
                    <Image
                      src="/placeholder.svg?height=400&width=800"
                      alt="Nghệ nhân Taboo Bamboo"
                      width={800}
                      height={400}
                      className="w-full h-auto rounded"
                    />
                  </div>

                  <h4 className="font-medium text-green-700">
                    {language === "vi" ? "Hoạt động trải nghiệm và tham quan" : "Experience and Tour Activities"}
                  </h4>

                  <p>
                    {language === "vi"
                      ? "Ngoài việc sản xuất và kinh doanh các sản phẩm thủ công từ tre, Taboo Bamboo Workshop còn tổ chức các hoạt động trải nghiệm cho du khách. Khi đến đây, bạn sẽ có cơ hội trực tiếp tham gia vào quá trình làm ra các sản phẩm thủ công dưới sự hướng dẫn của các nghệ nhân. Đây là một trải nghiệm thú vị, giúp du khách hiểu thêm về nghề thủ công truyền thống và khám phá sự kỳ diệu của tre."
                      : "In addition to producing and selling bamboo handicrafts, Taboo Bamboo Workshop also organizes experience activities for visitors. When coming here, you will have the opportunity to directly participate in the process of making handicrafts under the guidance of artisans. This is an interesting experience, helping visitors understand more about traditional crafts and discover the wonder of bamboo."}
                  </p>

                  <p>
                    {language === "vi"
                      ? "Hãy đến và khám phá Taboo Bamboo Workshop để trải nghiệm không gian sáng tạo độc đáo và tìm hiểu về nghề thủ công truyền thống của Việt Nam!"
                      : "Come and explore Taboo Bamboo Workshop to experience a unique creative space and learn about Vietnam's traditional crafts!"}
                  </p>
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


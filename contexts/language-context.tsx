"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "vi" | "en"

type Translations = {
  [key: string]: {
    vi: string
    en: string
  }
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Translations = {
  // Top Bar
  "topbar.hours": {
    vi: "8-17h Thứ 2 đến Thứ 7 (CN nghỉ), Hotline: 0905312812",
    en: "8-17h Monday to Saturday (Sunday closed), Hotline: 0905312812",
  },
  "topbar.address": {
    vi: "Địa chỉ: Hội An, Quảng Nam",
    en: "Address: Hoi An, Quang Nam",
  },
  // Navigation
  "nav.home": {
    vi: "TRANG CHỦ",
    en: "HOME",
  },
  "nav.about": {
    vi: "GIỚI THIỆU",
    en: "ABOUT",
  },
  "nav.products": {
    vi: "SẢN PHẨM",
    en: "PRODUCTS",
  },
  "nav.news": {
    vi: "TIN TỨC",
    en: "NEWS",
  },
  "nav.calendar": {
    vi: "LỊCH HẸN",
    en: "CALENDAR",
  },
  "nav.contact": {
    vi: "LIÊN HỆ",
    en: "CONTACT",
  },
  // Search
  "search.placeholder": {
    vi: "Tìm kiếm...",
    en: "Search...",
  },
  "search.button": {
    vi: "TÌM KIẾM",
    en: "SEARCH",
  },
  // Home page
  "home.intro.title": {
    vi: "GIỚI THIỆU VỀ CHÚNG TÔI",
    en: "ABOUT US",
  },
  "home.intro.subtitle": {
    vi: "Taboo Bamboo Workshop - Nghệ thuật thủ công tre truyền thống tại Hội An",
    en: "Taboo Bamboo Workshop - Traditional bamboo craftsmanship in Hoi An",
  },
  "home.intro.paragraph1": {
    vi: "Tại Taboo Bamboo, chúng tôi chuyên thiết kế và sản xuất các sản phẩm thủ công mỹ nghệ từ tre, trúc, gỗ và các vật liệu tự nhiên khác. Với đội ngũ nghệ nhân lành nghề, chúng tôi tạo ra những sản phẩm độc đáo, tinh tế và thân thiện với môi trường.",
    en: "At Taboo Bamboo, we specialize in designing and producing handicrafts from bamboo, wood, and other natural materials. With our team of skilled artisans, we create unique, sophisticated, and environmentally friendly products.",
  },
  "home.intro.paragraph2": {
    vi: "Mỗi sản phẩm của chúng tôi đều được làm thủ công tỉ mỉ, kết hợp giữa kỹ thuật truyền thống và thiết kế hiện đại, mang đến những tác phẩm nghệ thuật độc đáo cho không gian sống của bạn.",
    en: "Each of our products is meticulously handcrafted, combining traditional techniques with modern design, bringing unique artistic pieces to your living space.",
  },
  "home.intro.button": {
    vi: "XEM THÊM",
    en: "READ MORE",
  },
  "home.products.title": {
    vi: "SẢN PHẨM CỦA CHÚNG TÔI",
    en: "OUR PRODUCTS",
  },
  "home.products.subtitle": {
    vi: "Dưới đây là một số sản phẩm tiêu biểu của chúng tôi",
    en: "Below are some of our featured products",
  },
  "home.products.item": {
    vi: "Sản phẩm thủ công từ tre",
    en: "Handcrafted bamboo product",
  },
  "home.products.button": {
    vi: "XEM",
    en: "VIEW",
  },
  "home.products.viewall": {
    vi: "XEM TẤT CẢ SẢN PHẨM",
    en: "VIEW ALL PRODUCTS",
  },
  // Workshop registration
  "workshop.registration.title": {
    vi: "Đăng ký Workshop",
    en: "Workshop Registration",
  },
  "workshop.registration.fullname": {
    vi: "Họ và tên",
    en: "Full Name",
  },
  "workshop.registration.email": {
    vi: "Email",
    en: "Email",
  },
  "workshop.registration.phone": {
    vi: "Số điện thoại",
    en: "Phone Number",
  },
  "workshop.registration.slots": {
    vi: "Số lượng chỗ",
    en: "Number of Slots",
  },
  "workshop.registration.available": {
    vi: "Còn trống",
    en: "Available",
  },
  "workshop.registration.confirm": {
    vi: "Xác nhận đăng ký",
    en: "Confirm Registration",
  },
  "workshop.registration.processing": {
    vi: "Đang xử lý...",
    en: "Processing...",
  },
  "workshop.registration.success": {
    vi: "Đăng ký thành công!",
    en: "Registration Successful!",
  },
  "workshop.registration.email_sent": {
    vi: "Chúng tôi đã gửi email xác nhận đến {email}. Vui lòng kiểm tra hộp thư.",
    en: "We've sent a confirmation email to {email}. Please check your inbox.",
  },
  "workshop.registration.close": {
    vi: "Đóng",
    en: "Close",
  },
  "workshop.registration.error.name": {
    vi: "Vui lòng nhập họ tên",
    en: "Please enter your name",
  },
  "workshop.registration.error.email_required": {
    vi: "Vui lòng nhập email",
    en: "Please enter your email",
  },
  "workshop.registration.error.email_invalid": {
    vi: "Email không hợp lệ",
    en: "Invalid email format",
  },
  "workshop.registration.error.phone": {
    vi: "Vui lòng nhập số điện thoại",
    en: "Please enter your phone number",
  },
  "workshop.registration.error.slots_min": {
    vi: "Số lượng phải lớn hơn 0",
    en: "Quantity must be greater than 0",
  },
  "workshop.registration.error.slots_max": {
    vi: "Chỉ còn {count} chỗ trống",
    en: "Only {count} slots available",
  },
  // Contact form
  "contact.title": {
    vi: "Liên hệ với chúng tôi",
    en: "Contact us",
  },
  "contact.subtitle": {
    vi: "Hãy điền thông tin của bạn vào form dưới đây để được chúng tôi tư vấn chi tiết về sản phẩm",
    en: "Please fill in your information below to receive detailed consultation about our products",
  },
  "contact.name": {
    vi: "Họ tên của bạn",
    en: "Your name",
  },
  "contact.phone": {
    vi: "Số điện thoại",
    en: "Phone number",
  },
  "contact.email": {
    vi: "Email",
    en: "Email",
  },
  "contact.content": {
    vi: "Nội dung",
    en: "Message",
  },
  "contact.submit": {
    vi: "GỬI THÔNG TIN",
    en: "SUBMIT",
  },
  // News section
  "news.title": {
    vi: "TIN TỨC LIÊN QUAN",
    en: "RELATED NEWS",
  },
  "news.readmore": {
    vi: "XEM THÊM",
    en: "READ MORE",
  },
  "news.testimonials": {
    vi: "Báo chí nói gì về chúng tôi?",
    en: "What the press says about us?",
  },
  // Footer
  "footer.copyright": {
    vi: "© 2023 Taboo Bamboo Workshop",
    en: "© 2023 Taboo Bamboo Workshop",
  },
  "footer.address": {
    vi: "Địa chỉ: Hội An, Quảng Nam",
    en: "Address: Hoi An, Quang Nam",
  },
  "footer.business": {
    vi: "MST: 0123456789 do Sở KH&ĐT Quảng Nam cấp ngày 01/01/2020",
    en: "Business License: 0123456789 issued by Quang Nam Department of Planning and Investment on 01/01/2020",
  },
  "footer.policies": {
    vi: "Chính sách & Điều khoản",
    en: "Policies & Terms",
  },
  "footer.privacy": {
    vi: "Chính sách bảo mật",
    en: "Privacy Policy",
  },
  "footer.terms": {
    vi: "Điều khoản sử dụng",
    en: "Terms of Use",
  },
  "footer.shipping": {
    vi: "Chính sách vận chuyển",
    en: "Shipping Policy",
  },
  "footer.returns": {
    vi: "Chính sách đổi trả",
    en: "Return Policy",
  },
  "footer.payment": {
    vi: "Phương thức thanh toán",
    en: "Payment Methods",
  },
  "footer.categories": {
    vi: "Danh mục sản phẩm",
    en: "Product Categories",
  },
  "footer.lamps": {
    vi: "Đèn tre",
    en: "Bamboo Lamps",
  },
  "footer.decor": {
    vi: "Đồ trang trí",
    en: "Decorative Items",
  },
  "footer.furniture": {
    vi: "Đồ nội thất",
    en: "Furniture",
  },
  "footer.gifts": {
    vi: "Quà tặng",
    en: "Gifts",
  },
  "footer.others": {
    vi: "Sản phẩm khác",
    en: "Other Products",
  },
  "footer.newsletter": {
    vi: "Đăng ký nhận tin",
    en: "Newsletter",
  },
  "footer.newsletter.desc": {
    vi: "Đăng ký để nhận thông tin về sản phẩm mới và khuyến mãi từ Taboo",
    en: "Subscribe to receive information about new products and promotions from Taboo",
  },
  "footer.newsletter.placeholder": {
    vi: "Email của bạn",
    en: "Your email",
  },
  "footer.newsletter.button": {
    vi: "ĐĂNG KÝ",
    en: "SUBSCRIBE",
  },
  "footer.rights": {
    vi: "© 2023 Taboo Bamboo Workshop. All Rights Reserved.",
    en: "© 2023 Taboo Bamboo Workshop. All Rights Reserved.",
  },
  // Products page
  "products.all": {
    vi: "Tất cả sản phẩm",
    en: "All Products",
  },
  "products.filter": {
    vi: "Lọc sản phẩm",
    en: "Filter Products",
  },
  "products.filter.price": {
    vi: "Giá",
    en: "Price",
  },
  "products.filter.material": {
    vi: "Chất liệu",
    en: "Material",
  },
  "products.filter.button": {
    vi: "Lọc sản phẩm",
    en: "Apply Filter",
  },
  "products.featured": {
    vi: "Sản phẩm nổi bật",
    en: "Featured Products",
  },
  "products.sort": {
    vi: "Sắp xếp:",
    en: "Sort by:",
  },
  "products.display": {
    vi: "Hiển thị:",
    en: "Display:",
  },
  // Calendar page
  "calendar.title": {
    vi: "Lịch Workshop Taboo Bamboo",
    en: "Taboo Bamboo Workshop Calendar",
  },
  "calendar.prev": {
    vi: "Tuần trước",
    en: "Previous Week",
  },
  "calendar.current": {
    vi: "Tuần này",
    en: "This Week",
  },
  "calendar.next": {
    vi: "Tuần sau",
    en: "Next Week",
  },
  "calendar.empty": {
    vi: "Không có workshop",
    en: "No workshops",
  },
  "calendar.register": {
    vi: "ĐĂNG KÝ",
    en: "REGISTER",
  },
  "calendar.info.title": {
    vi: "Thông tin workshop:",
    en: "Workshop information:",
  },
  "calendar.registration.title": {
    vi: "Thông tin đăng ký:",
    en: "Registration information:",
  },
  "calendar.registration.desc": {
    vi: 'Để đăng ký tham gia workshop, vui lòng nhấn vào nút "ĐĂNG KÝ" hoặc liên hệ với chúng tôi qua:',
    en: 'To register for a workshop, please click the "REGISTER" button or contact us via:',
  },
  // Contact page
  "contactpage.title": {
    vi: "LIÊN HỆ VỚI CHÚNG TÔI",
    en: "CONTACT US",
  },
  "contactpage.form.title": {
    vi: "Gửi thông tin liên hệ",
    en: "Send Contact Information",
  },
  "contactpage.form.department": {
    vi: "Chọn bộ phận",
    en: "Select Department",
  },
  "contactpage.form.name": {
    vi: "Họ và tên",
    en: "Full Name",
  },
  "contactpage.form.phone": {
    vi: "Số điện thoại",
    en: "Phone Number",
  },
  "contactpage.form.email": {
    vi: "Email",
    en: "Email",
  },
  "contactpage.form.subject": {
    vi: "Tiêu đề",
    en: "Subject",
  },
  "contactpage.form.message": {
    vi: "Nội dung",
    en: "Message",
  },
  "contactpage.form.submit": {
    vi: "GỬI TIN",
    en: "SUBMIT",
  },
  "contactpage.info.title": {
    vi: "Thông tin liên hệ",
    en: "Contact Information",
  },
  "contactpage.info.address": {
    vi: "Địa chỉ:",
    en: "Address:",
  },
  "contactpage.info.phone": {
    vi: "Điện thoại:",
    en: "Phone:",
  },
  "contactpage.info.email": {
    vi: "Email:",
    en: "Email:",
  },
  "contactpage.hours.title": {
    vi: "Giờ làm việc",
    en: "Working Hours",
  },
  "contactpage.hours.weekdays": {
    vi: "Thứ 2 - Thứ 7: 8:00 - 17:00",
    en: "Monday - Saturday: 8:00 - 17:00",
  },
  "contactpage.hours.sunday": {
    vi: "Chủ nhật: Nghỉ",
    en: "Sunday: Closed",
  },
  // Breadcrumbs
  "breadcrumb.home": {
    vi: "Trang chủ",
    en: "Home",
  },
  "breadcrumb.products": {
    vi: "Sản phẩm",
    en: "Products",
  },
  "breadcrumb.contact": {
    vi: "Liên hệ",
    en: "Contact",
  },
  "breadcrumb.calendar": {
    vi: "Lịch workshop",
    en: "Workshop Calendar",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("vi")

  useEffect(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Provide a default context instead of throwing an error
    console.warn("useLanguage was used outside of LanguageProvider, using default values")
    return {
      language: "vi",
      setLanguage: () => console.warn("setLanguage called outside of LanguageProvider"),
      t: (key: string) => {
        if (!translations[key]) {
          console.warn(`Translation key not found: ${key}`)
          return key
        }
        return translations[key]["vi"]
      },
    }
  }
  return context
}


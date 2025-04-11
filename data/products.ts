export interface ProductImage {
  id: number
  src: string
  alt: string
  isMain?: boolean
}

export interface ProductSpecification {
  name: {
    vi: string
    en: string
  }
  value: {
    vi: string
    en: string
  }
}

export interface Product {
  id: string
  name: {
    vi: string
    en: string
  }
  slug: {
    vi: string
    en: string
  }
  price: number
  salePrice?: number
  description: {
    vi: string
    en: string
  }
  details: {
    vi: string
    en: string
  }
  specifications: ProductSpecification[]
  images: ProductImage[]
  category: {
    id: string
    name: {
      vi: string
      en: string
    }
  }
  videoId?: string // YouTube video ID
  relatedProducts: string[] // Array of related product IDs
}

export const products: Product[] = [
  {
    id: "1",
    name: {
      vi: "Sản phẩm thủ công mỹ nghệ Ong Vàng",
      en: "Handcrafted Golden Bee Bamboo",
    },
    slug: {
      vi: "ong-vang-thu-cong-my-nghe",
      en: "handcrafted-golden-bamboo",
    },
    price: 450000,
    salePrice: 399000,
    description: {
      vi: "Sản phẩm thủ công mỹ nghệ Ong Vàng được làm từ tre già, qua quá trình xử lý tự nhiên và thủ công tỉ mỉ. Sản phẩm có màu vàng tự nhiên, bền đẹp theo thời gian.",
      en: "The handcrafted Golden Bee bamboo made from mature bamboo, processed naturally and meticulously handcrafted. The product has a natural golden color that remains beautiful over time.",
    },
    details: {
      vi: `<p>Sản phẩm thủ công mỹ nghệ Ong Vàng là sản phẩm tiêu biểu của làng nghề truyền thống, được chế tác từ những cây tre già từ 3-5 năm tuổi.</p>
      <p>Quy trình sản xuất:</p>
      <ul>
        <li>Chọn lựa tre già có chất lượng tốt</li>
        <li>Xử lý phòng chống mối mọt bằng phương pháp tự nhiên</li>
        <li>Phơi, sấy để đạt độ ẩm phù hợp</li>
        <li>Đánh bóng và hoàn thiện sản phẩm</li>
      </ul>
      <p>Sản phẩm có thể dùng làm đồ trang trí, lưu niệm hoặc quà tặng với ý nghĩa phong thủy tốt đẹp.</p>`,
      en: `<p>The handcrafted Golden Bee bamboo is a representative product of traditional craftsmanship, made from mature bamboo trees aged 3-5 years.</p>
      <p>Production process:</p>
      <ul>
        <li>Selection of high-quality mature bamboo</li>
        <li>Natural termite prevention treatment</li>
        <li>Sun-drying and kiln-drying to achieve appropriate moisture content</li>
        <li>Polishing and finishing the product</li>
      </ul>
      <p>The product can be used as decoration, souvenir, or gift with good feng shui meaning.</p>`,
    },
    specifications: [
      {
        name: {
          vi: "Kích thước",
          en: "Dimensions",
        },
        value: {
          vi: "Đường kính 5cm, dài 20cm",
          en: "5cm diameter, 20cm length",
        },
      },
      {
        name: {
          vi: "Chất liệu",
          en: "Material",
        },
        value: {
          vi: "Tre già tự nhiên",
          en: "Natural mature bamboo",
        },
      },
      {
        name: {
          vi: "Xuất xứ",
          en: "Origin",
        },
        value: {
          vi: "Việt Nam",
          en: "Vietnam",
        },
      },
      {
        name: {
          vi: "Bảo quản",
          en: "Preservation",
        },
        value: {
          vi: "Tránh ánh nắng trực tiếp, nơi ẩm ướt",
          en: "Avoid direct sunlight and humid places",
        },
      },
    ],
    images: [
      {
        id: 1,
        src: "https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//ong_vang.jpg",
        alt: "Ong vàng thủ công mỹ nghệ",
        isMain: true,
      },
      {
        id: 2,
        src: "https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//ong_vang_1.jpg",
        alt: "Chi tiết ong vàng 1",
      },
      {
        id: 3,
        src: "/placeholder.svg?height=600&width=600&text=Ống+Vàng+Chi+Tiết+2",
        alt: "Chi tiết ong vàng 2",
      },
      {
        id: 4,
        src: "/placeholder.svg?height=600&width=600&text=Ống+Vàng+Chi+Tiết+3",
        alt: "Chi tiết ong vàng 3",
      },
    ],
    category: {
      id: "1",
      name: {
        vi: "Đồ thủ công mỹ nghệ",
        en: "Handicrafts",
      },
    },
    videoId: "v2v6Pd_YXZM", // Placeholder YouTube video ID
    relatedProducts: ["2", "3", "4"],
  },
  {
    id: "2",
    name: {
      vi: "Giỏ tre đan thủ công",
      en: "Handwoven Bamboo Basket",
    },
    slug: {
      vi: "gio-tre-dan-thu-cong",
      en: "handwoven-bamboo-basket",
    },
    price: 350000,
    description: {
      vi: "Giỏ tre đan thủ công được làm từ tre non, đan tỉ mỉ bởi các nghệ nhân làng nghề truyền thống.",
      en: "Handwoven bamboo basket made from young bamboo, meticulously woven by artisans from traditional craft villages.",
    },
    details: {
      vi: "Chi tiết sản phẩm giỏ tre đan thủ công...",
      en: "Details of handwoven bamboo basket...",
    },
    specifications: [
      {
        name: {
          vi: "Kích thước",
          en: "Dimensions",
        },
        value: {
          vi: "30cm x 20cm x 15cm",
          en: "30cm x 20cm x 15cm",
        },
      },
      {
        name: {
          vi: "Chất liệu",
          en: "Material",
        },
        value: {
          vi: "Tre non",
          en: "Young bamboo",
        },
      },
    ],
    images: [
      {
        id: 1,
        src: "/placeholder.svg?height=600&width=600&text=Giỏ+Tre+Đan",
        alt: "Giỏ tre đan thủ công",
        isMain: true,
      },
    ],
    category: {
      id: "1",
      name: {
        vi: "Đồ thủ công mỹ nghệ",
        en: "Handicrafts",
      },
    },
    relatedProducts: ["1", "3", "4"],
  },
  {
    id: "3",
    name: {
      vi: "Đèn tre trang trí",
      en: "Bamboo Decorative Lamp",
    },
    slug: {
      vi: "den-tre-trang-tri",
      en: "bamboo-decorative-lamp",
    },
    price: 550000,
    salePrice: 499000,
    description: {
      vi: "Đèn tre trang trí với thiết kế độc đáo, tạo không gian ấm cúng và gần gũi với thiên nhiên.",
      en: "Bamboo decorative lamp with unique design, creating a cozy space close to nature.",
    },
    details: {
      vi: "Chi tiết sản phẩm đèn tre trang trí...",
      en: "Details of bamboo decorative lamp...",
    },
    specifications: [
      {
        name: {
          vi: "Kích thước",
          en: "Dimensions",
        },
        value: {
          vi: "Đường kính 25cm, cao 40cm",
          en: "25cm diameter, 40cm height",
        },
      },
    ],
    images: [
      {
        id: 1,
        src: "/placeholder.svg?height=600&width=600&text=Đèn+Tre+Trang+Trí",
        alt: "Đèn tre trang trí",
        isMain: true,
      },
    ],
    category: {
      id: "2",
      name: {
        vi: "Đồ trang trí",
        en: "Decorative Items",
      },
    },
    relatedProducts: ["1", "2", "4"],
  },
  {
    id: "4",
    name: {
      vi: "Bộ bàn ghế tre mini",
      en: "Mini Bamboo Table and Chairs Set",
    },
    slug: {
      vi: "bo-ban-ghe-tre-mini",
      en: "mini-bamboo-table-and-chairs-set",
    },
    price: 1200000,
    description: {
      vi: "Bộ bàn ghế tre mini phù hợp cho không gian nhỏ, ban công, sân vườn.",
      en: "Mini bamboo table and chairs set suitable for small spaces, balconies, and gardens.",
    },
    details: {
      vi: "Chi tiết sản phẩm bộ bàn ghế tre mini...",
      en: "Details of mini bamboo table and chairs set...",
    },
    specifications: [
      {
        name: {
          vi: "Kích thước bàn",
          en: "Table dimensions",
        },
        value: {
          vi: "60cm x 60cm x 50cm",
          en: "60cm x 60cm x 50cm",
        },
      },
    ],
    images: [
      {
        id: 1,
        src: "/placeholder.svg?height=600&width=600&text=Bộ+Bàn+Ghế+Tre+Mini",
        alt: "Bộ bàn ghế tre mini",
        isMain: true,
      },
    ],
    category: {
      id: "3",
      name: {
        vi: "Nội thất tre",
        en: "Bamboo Furniture",
      },
    },
    relatedProducts: ["1", "2", "3"],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductBySlug(slug: string, lang: string): Product | undefined {
  return products.find(
    (product) => (lang === "vi" && product.slug.vi === slug) || (lang === "en" && product.slug.en === slug),
  )
}

export function getRelatedProducts(productIds: string[]): Product[] {
  return products.filter((product) => productIds.includes(product.id))
}


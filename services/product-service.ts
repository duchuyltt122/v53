// services/product-service.ts
import { AppProduct, convertSupabaseProductToAppProduct } from '@/types/products';

// Danh mục sản phẩm mẫu (vì API không có thông tin về danh mục)
const sampleCategories = [
  {
    id: "1",
    name: {
      vi: "Đồ thủ công mỹ nghệ",
      en: "Handicrafts"
    }
  },
  {
    id: "2",
    name: {
      vi: "Đồ trang trí",
      en: "Decorative Items"
    }
  },
  {
    id: "3",
    name: {
      vi: "Nội thất tre",
      en: "Bamboo Furniture"
    }
  },
  {
    id: "4",
    name: {
      vi: "Quà tặng",
      en: "Gifts"
    }
  },
  {
    id: "5",
    name: {
      vi: "Khác",
      en: "Others"
    }
  }
];

// Lấy tất cả sản phẩm từ API
export async function getAllProducts(): Promise<AppProduct[]> {
  try {
    // Sử dụng fetch trực tiếp thay vì qua Supabase client
    console.log('Fetching products directly from Supabase REST API...');

    const response = await fetch('https://ipaionbpmtgtfmlkkaer.supabase.co/rest/v1/products?select=*', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYWlvbmJwbXRndGZtbGtrYWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTEyNTcsImV4cCI6MjA1ODQ2NzI1N30._MfrbZn9evsd6HXu0tbYExzG7B3yeXIzWY-qaffGr9g',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw products data:', data);

    if (!data || data.length === 0) {
      console.log('No products found in Supabase, using sample data');
      // Sử dụng dữ liệu mẫu nếu không có dữ liệu từ API
      return getSampleProducts();
    }

    // Chuyển đổi dữ liệu từ Supabase sang định dạng ứng dụng
    return data.map((product: any, index: number) => {
      // Gán danh mục ngẫu nhiên cho sản phẩm
      const categoryIndex = index % sampleCategories.length;
      return convertSupabaseProductToAppProduct(product, sampleCategories[categoryIndex]);
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    console.log('Using sample products due to error');
    // Sử dụng dữ liệu mẫu nếu có lỗi
    return getSampleProducts();
  }
}

// Lấy sản phẩm theo ID
export async function getProductById(id: string): Promise<AppProduct | null> {
  try {
    // Kiểm tra nếu ID bắt đầu bằng "sample-", trả về sản phẩm mẫu
    if (id.startsWith('sample-')) {
      const sampleProducts = getSampleProducts();
      return sampleProducts.find(p => p.id === id) || sampleProducts[0];
    }

    // Sử dụng fetch trực tiếp thay vì qua Supabase client
    console.log('Fetching product by ID directly from Supabase REST API...');

    const response = await fetch(`https://ipaionbpmtgtfmlkkaer.supabase.co/rest/v1/products?id=eq.${id}&select=*`, {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYWlvbmJwbXRndGZtbGtrYWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTEyNTcsImV4cCI6MjA1ODQ2NzI1N30._MfrbZn9evsd6HXu0tbYExzG7B3yeXIzWY-qaffGr9g',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw product data:', data);

    if (!data || data.length === 0) {
      console.log('No product found in Supabase, using sample data');
      // Nếu không tìm thấy sản phẩm, trả về sản phẩm mẫu đầu tiên
      const sampleProducts = getSampleProducts();
      return sampleProducts[0];
    }

    // Chuyển đổi dữ liệu từ Supabase sang định dạng ứng dụng
    return convertSupabaseProductToAppProduct(data[0], sampleCategories[0]);
  } catch (error) {
    console.error('Error in getProductById:', error);
    // Nếu có lỗi, trả về sản phẩm mẫu đầu tiên
    const sampleProducts = getSampleProducts();
    return sampleProducts[0];
  }
}

// Lấy danh mục sản phẩm
export function getProductCategories() {
  return sampleCategories;
}

// Dữ liệu sản phẩm mẫu khi không thể lấy dữ liệu từ API
export function getSampleProducts(): AppProduct[] {
  return [
    {
      id: "sample-1",
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
        vi: "Sản phẩm thủ công mỹ nghệ Ong Vàng là sản phẩm tiêu biểu của làng nghề truyền thống, được chế tác từ những cây tre già từ 3-5 năm tuổi.",
        en: "The handcrafted Golden Bee bamboo is a representative product of traditional craftsmanship, made from mature bamboo trees aged 3-5 years.",
      },
      specifications: {
        vi: "Kích thước:\nĐường kính 5cm, dài 20cm\nChất liệu:\nTre già tự nhiên\nXuất xứ:\nViệt Nam\nBảo quản:\nTránh ánh nắng trực tiếp, nơi ẩm ướt",
        en: "Dimensions:\n5cm diameter, 20cm length\nMaterial:\nNatural mature bamboo\nOrigin:\nVietnam\nPreservation:\nAvoid direct sunlight and humid places",
      },
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
      ],
      category: sampleCategories[0],
      videoId: "v2v6Pd_YXZM",
      relatedProducts: [],
    },
    {
      id: "sample-2",
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
      specifications: {
        vi: "Kích thước:\n30cm x 20cm x 15cm\nChất liệu:\nTre non\nXuất xứ:\nViệt Nam",
        en: "Dimensions:\n30cm x 20cm x 15cm\nMaterial:\nYoung bamboo\nOrigin:\nVietnam",
      },
      images: [
        {
          id: 1,
          src: "https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//ong_vang.jpg",
          alt: "Giỏ tre đan thủ công",
          isMain: true,
        },
      ],
      category: sampleCategories[1],
      relatedProducts: [],
    },
    {
      id: "sample-3",
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
      specifications: {
        vi: "Kích thước:\nĐường kính 25cm, cao 40cm\nChất liệu:\nTre\nXuất xứ:\nViệt Nam",
        en: "Dimensions:\n25cm diameter, 40cm height\nMaterial:\nBamboo\nOrigin:\nVietnam",
      },
      images: [
        {
          id: 1,
          src: "https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//ong_vang_1.jpg",
          alt: "Đèn tre trang trí",
          isMain: true,
        },
      ],
      category: sampleCategories[2],
      relatedProducts: [],
    },
    {
      id: "sample-4",
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
      specifications: {
        vi: "Kích thước bàn:\n60cm x 60cm x 50cm\nChất liệu:\nTre\nXuất xứ:\nViệt Nam",
        en: "Table dimensions:\n60cm x 60cm x 50cm\nMaterial:\nBamboo\nOrigin:\nVietnam",
      },
      images: [
        {
          id: 1,
          src: "https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//ong_vang.jpg",
          alt: "Bộ bàn ghế tre mini",
          isMain: true,
        },
      ],
      category: sampleCategories[3],
      relatedProducts: [],
    },
  ];
}

// Lấy sản phẩm liên quan
export async function getRelatedProducts(productId: string, limit = 4): Promise<AppProduct[]> {
  try {
    // Lấy tất cả sản phẩm mẫu
    const sampleProducts = getSampleProducts();

    // Tìm sản phẩm hiện tại trong danh sách mẫu
    const currentProduct = sampleProducts.find(p => p.id === productId);

    // Nếu không tìm thấy sản phẩm, trả về tất cả sản phẩm mẫu trừ sản phẩm đầu tiên
    if (!currentProduct) {
      return sampleProducts.slice(1, limit + 1);
    }

    // Trả về các sản phẩm mẫu khác
    return sampleProducts
      .filter(p => p.id !== productId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error in getRelatedProducts:', error);
    // Nếu có lỗi, trả về các sản phẩm mẫu
    return getSampleProducts().slice(0, limit);
  }
}

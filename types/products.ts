// types/products.ts

export interface SupabaseProduct {
  id: string;
  name: {
    en: string;
    vi: string;
  };
  price: {
    usd: number;
    vnd: number;
  };
  short_description: {
    en: string;
    vi: string;
  };
  full_description: {
    en: string;
    vi: string;
  };
  specifications: {
    en: string;
    vi: string;
  };
  youtube_url?: string;
  created_at: string;
  image_urls: string[];
}

export interface ProductCategory {
  id: string;
  name: {
    vi: string;
    en: string;
  };
}

// Chuyển đổi từ dữ liệu Supabase sang định dạng sử dụng trong ứng dụng
export interface AppProduct {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  slug: {
    vi: string;
    en: string;
  };
  price: number; // VND price
  salePrice?: number;
  description: {
    vi: string;
    en: string;
  };
  details: {
    vi: string;
    en: string;
  };
  specifications: {
    vi: string;
    en: string;
  };
  images: {
    id: number;
    src: string;
    alt: string;
    isMain?: boolean;
  }[];
  category: ProductCategory;
  videoId?: string;
  relatedProducts: string[];
}

// Hàm chuyển đổi từ SupabaseProduct sang AppProduct
export function convertSupabaseProductToAppProduct(product: SupabaseProduct, category?: ProductCategory): AppProduct {
  // Tạo slug từ tên sản phẩm
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  // Trích xuất YouTube video ID từ URL
  const extractYoutubeId = (url?: string) => {
    if (!url) return undefined;
    
    // Xử lý URL YouTube thông thường
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    // Xử lý URL YouTube Shorts
    const shortsRegExp = /^.*(youtube.com\/shorts\/)([^#&?]*).*/;
    const shortsMatch = url.match(shortsRegExp);
    
    return (match && match[2].length === 11) 
      ? match[2] 
      : (shortsMatch && shortsMatch[2].length === 11) 
        ? shortsMatch[2] 
        : undefined;
  };

  // Tạo mảng hình ảnh
  const images = product.image_urls.map((url, index) => ({
    id: index + 1,
    src: url,
    alt: product.name.vi || product.name.en,
    isMain: index === 0
  }));

  // Tạo sản phẩm mới
  return {
    id: product.id,
    name: {
      vi: product.name.vi,
      en: product.name.en
    },
    slug: {
      vi: createSlug(product.name.vi),
      en: createSlug(product.name.en)
    },
    price: product.price.vnd,
    // Giả định không có giá khuyến mãi từ API
    description: {
      vi: product.short_description.vi,
      en: product.short_description.en
    },
    details: {
      vi: product.full_description.vi,
      en: product.full_description.en
    },
    specifications: {
      vi: product.specifications.vi,
      en: product.specifications.en
    },
    images,
    category: category || {
      id: "1",
      name: {
        vi: "Đồ thủ công mỹ nghệ",
        en: "Handicrafts"
      }
    },
    videoId: extractYoutubeId(product.youtube_url),
    relatedProducts: [] // Không có thông tin về sản phẩm liên quan từ API
  };
}

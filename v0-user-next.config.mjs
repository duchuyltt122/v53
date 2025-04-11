/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tối ưu hóa hình ảnh
  images: {
    domains: ['ipaionbpmtgtfmlkkaer.supabase.co'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // Cache hình ảnh trong 60 giây
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon sizes
  },

  // Tối ưu hóa bundle size
  swcMinify: true,

  // Tối ưu hóa compiler
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Tối ưu hóa hiệu suất
  poweredByHeader: false, // Loại bỏ header X-Powered-By
  reactStrictMode: true,

  // Cấu hình experimental
  experimental: {
    optimizeCss: true, // Đã thêm package critters vào dependencies
    scrollRestoration: true, // Khôi phục vị trí scroll khi quay lại trang
    // legacyBrowsers: false, // Không hỗ trợ trình duyệt cũ để giảm bundle size
  },
};

export default nextConfig;


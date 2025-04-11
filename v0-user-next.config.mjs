/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipaionbpmtgtfmlkkaer.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  // Loại bỏ optimizeCss vì gây lỗi khi không có critters
  // experimental: {
  //   optimizeCss: true,
  // },
  // Tối ưu hóa bundle size
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;


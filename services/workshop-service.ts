// services/workshop-service.ts
import { Workshop } from '@/types/workshops';

// Lấy tất cả workshops từ API
export async function getAllWorkshops(): Promise<Workshop[]> {
  try {
    // Sử dụng fetch trực tiếp thay vì qua Supabase client
    console.log('Fetching workshops directly from Supabase REST API...');

    const response = await fetch('https://ipaionbpmtgtfmlkkaer.supabase.co/rest/v1/workshops?select=*', {
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYWlvbmJwbXRndGZtbGtrYWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTEyNTcsImV4cCI6MjA1ODQ2NzI1N30._MfrbZn9evsd6HXu0tbYExzG7B3yeXIzWY-qaffGr9g',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw workshops data:', data);

    if (!data || data.length === 0) {
      console.log('No workshops found in Supabase, using sample data');
      // Sử dụng dữ liệu mẫu nếu không có dữ liệu từ API
      return getSampleWorkshops();
    }

    // Dữ liệu từ API đã có cấu trúc giống với Workshop, trả về trực tiếp
    return data;
  } catch (error) {
    console.error('Error in getAllWorkshops:', error);
    console.log('Using sample workshops due to error');
    // Sử dụng dữ liệu mẫu nếu có lỗi
    return getSampleWorkshops();
  }
}

// Không cần hàm tạo màu ngẫu nhiên nữa vì dữ liệu từ API đã có màu

// Dữ liệu workshop mẫu khi không thể lấy dữ liệu từ API
export function getSampleWorkshops(): Workshop[] {
  return [
    {
      id: 1,
      title_vi: "Làm đèn tre cơ bản",
      title_en: "Basic Bamboo Lamp Making",
      time: "09:00 - 11:30",
      date: "2025-04-07",
      color: "#FF5252",
      instructor_vi: "Nguyễn Văn A",
      instructor_en: "Nguyen Van A",
      total_slots: 10,
      available_slots: 5,
      price_vnd: 250000,
      price_usd: 10
    },
    {
      id: 2,
      title_vi: "Đan giỏ tre truyền thống",
      title_en: "Traditional Bamboo Basket Weaving",
      time: "14:00 - 16:30",
      date: "2025-04-07",
      color: "#FFD600",
      instructor_vi: "Trần Thị B",
      instructor_en: "Tran Thi B",
      total_slots: 8,
      available_slots: 3,
      price_vnd: 300000,
      price_usd: 12
    },
    {
      id: 3,
      title_vi: "Làm cá chép tre",
      title_en: "Bamboo Carp Making",
      time: "09:00 - 12:00",
      date: "2025-04-08",
      color: "#00C853",
      instructor_vi: "Lê Văn C",
      instructor_en: "Le Van C",
      total_slots: 12,
      available_slots: 7,
      price_vnd: 350000,
      price_usd: 14
    },
    {
      id: 4,
      title_vi: "Kỹ thuật nhuộm tre nâng cao",
      title_en: "Advanced Bamboo Dyeing Techniques",
      time: "13:30 - 16:00",
      date: "2025-04-09",
      color: "#2979FF",
      instructor_vi: "Phạm Thị D",
      instructor_en: "Pham Thi D",
      total_slots: 6,
      available_slots: 2,
      price_vnd: 400000,
      price_usd: 16
    },
    {
      id: 5,
      title_vi: "Làm đồ trang trí từ tre",
      title_en: "Bamboo Decorative Items",
      time: "10:00 - 12:30",
      date: "2025-04-10",
      color: "#AA00FF",
      instructor_vi: "Hoàng Văn E",
      instructor_en: "Hoang Van E",
      total_slots: 8,
      available_slots: 4,
      price_vnd: 280000,
      price_usd: 11
    },
    {
      id: 6,
      title_vi: "Làm đèn lồng tre",
      title_en: "Bamboo Lantern Making",
      time: "15:00 - 17:30",
      date: "2025-04-11",
      color: "#00BFA5",
      instructor_vi: "Ngô Thị F",
      instructor_en: "Ngo Thi F",
      total_slots: 10,
      available_slots: 6,
      price_vnd: 320000,
      price_usd: 13
    },
    {
      id: 7,
      title_vi: "Workshop đặc biệt: Nghệ thuật tre",
      title_en: "Special Workshop: Bamboo Art",
      time: "09:30 - 15:00",
      date: "2025-04-12",
      color: "#FF6D00",
      instructor_vi: "Nghệ nhân G",
      instructor_en: "Artisan G",
      total_slots: 15,
      available_slots: 2,
      price_vnd: 500000,
      price_usd: 20
    }
  ];
}

// types/workshops.ts

// Định nghĩa kiểu dữ liệu Workshop
export interface Workshop {
  id: number;
  title_vi: string;
  title_en: string;
  time: string;
  date: string;
  color: string;
  instructor_vi: string;
  instructor_en: string;
  total_slots: number;
  available_slots: number;
  price_vnd: number;
  price_usd: number;
}

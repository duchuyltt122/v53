"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, Info } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedMonthName } from "@/utils/date-utils"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorkshopRegistrationForm from "@/components/workshop-registration-form"
import { getAllWorkshops } from "@/services/workshop-service"

// Import Workshop type from types folder
import { Workshop } from "@/types/workshops"

export default function CalendarPage() {
  const { t, language } = useLanguage()
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("calendar")

  // State for workshops data
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch workshops data from API
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true)
        const data = await getAllWorkshops()
        setWorkshops(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching workshops:', error)
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  // Loading state for calendar
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />
        <div className="flex-1 bg-[#f0f0f0] py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-black">
                <div className="flex justify-center items-center h-[400px]">
                  <div className="w-12 h-12 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
                  <span className="ml-3 text-lg font-medium">{language === "vi" ? "Đang tải lịch workshop..." : "Loading workshop calendar..."}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // For debugging only - not used in production
  const _sampleWorkshops: Workshop[] = [
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
      price_vnd: 250000, // 250.000 VND
      price_usd: 10, // 10 USD
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
      price_vnd: 300000, // 300.000 VND
      price_usd: 12, // 12 USD
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
      price_vnd: 350000, // 350.000 VND
      price_usd: 14, // 14 USD
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
      price_vnd: 400000, // 400.000 VND
      price_usd: 16, // 16 USD
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
      price_vnd: 280000, // 280.000 VND
      price_usd: 11, // 11 USD
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
      price_vnd: 320000, // 320.000 VND
      price_usd: 13, // 13 USD
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
      price_vnd: 500000, // 500.000 VND
      price_usd: 20, // 20 USD
    },
  ]

  // Function to get the dates for the current week
  const getWeekDates = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    const monday = new Date(date)
    monday.setDate(diff)

    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(monday)
      nextDate.setDate(monday.getDate() + i)
      weekDates.push(nextDate)
    }

    return weekDates
  }

  const weekDates = getWeekDates(currentWeek)

  // Function to format date as "DD/MM"
  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`
  }

  // Function to format date as "YYYY-MM-DD" for comparison with workshop dates
  const formatDateForComparison = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  }

  // Function to get day name
  const getDayName = (date: Date) => {
    if (language === "vi") {
      const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
      return days[date.getDay()]
    } else {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return days[date.getDay()]
    }
  }

  // Function to navigate to previous week
  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentWeek)
    prevWeek.setDate(prevWeek.getDate() - 7)
    setCurrentWeek(prevWeek)
  }

  // Function to navigate to next week
  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setCurrentWeek(nextWeek)
  }

  // Function to go to current week
  const goToCurrentWeek = () => {
    setCurrentWeek(new Date())
  }

  // Get month and year for display
  const getMonthYearDisplay = () => {
    const firstDay = weekDates[0]
    const lastDay = weekDates[6]

    const firstMonth = getLocalizedMonthName(firstDay, language)
    const lastMonth = getLocalizedMonthName(lastDay, language)

    if (firstDay.getMonth() === lastDay.getMonth()) {
      return `${firstMonth} ${firstDay.getFullYear()}`
    } else {
      return `${firstMonth} - ${lastMonth} ${firstDay.getFullYear()}`
    }
  }

  // Function to get the title based on language
  const getTitle = (workshop: Workshop) => {
    return language === "vi" ? workshop.title_vi : workshop.title_en
  }

  // Function to get the instructor based on language
  const getInstructor = (workshop: Workshop) => {
    return language === "vi" ? workshop.instructor_vi : workshop.instructor_en
  }

  // Function to format slots text
  const formatSlots = (workshop: Workshop) => {
    if (language === "vi") {
      return `${workshop.available_slots}/${workshop.total_slots} chỗ trống`
    } else {
      return `${workshop.available_slots}/${workshop.total_slots} slots available`
    }
  }

  // Function to get price based on language
  const getPrice = (workshop: Workshop) => {
    return language === "vi" ? workshop.price_vnd : workshop.price_usd
  }

  // Function to format price based on language
  const formatPrice = (workshop: Workshop) => {
    if (language === "vi") {
      return workshop.price_vnd.toLocaleString("vi-VN") + "₫"
    } else {
      return "$" + workshop.price_usd.toFixed(2)
    }
  }

  // Function to format total price based on language
  const formatTotalPrice = (workshop: Workshop, slots: number) => {
    if (language === "vi") {
      return (workshop.price_vnd * slots).toLocaleString("vi-VN") + "₫"
    } else {
      return "$" + (workshop.price_usd * slots).toFixed(2)
    }
  }

  // Function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString)
    if (language === "vi") {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    } else {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }
  }

  // Get all workshops for the current week
  const currentWeekWorkshops = weekDates.flatMap((date) => {
    const formattedDate = formatDateForComparison(date)
    return workshops.filter((workshop) => workshop.date === formattedDate)
  })

  // Function to get short day name
  const getShortDayName = (date: Date) => {
    if (language === "vi") {
      const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
      return days[date.getDay()]
    } else {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return days[date.getDay()]
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Header & Navigation */}
      <Header />

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
                <BreadcrumbLink href="/calendar" className="text-xs text-green-700 font-medium">
                  {language === "vi" ? "Lịch workshop" : "Workshop Calendar"}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Neo Brutalism Calendar */}
      <div className="flex-1 bg-[#f0f0f0] py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-lg border-2 md:border-4 border-black">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl md:text-3xl font-bold tracking-wide">{t("calendar.title")}</h1>
                <button
                  onClick={() => setShowInfoDialog(true)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="Show information"
                >
                  <Info className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Navigation */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 gap-3 md:gap-4">
                <div className="flex space-x-2 w-full md:w-auto justify-center md:justify-start">
                  <Button
                    onClick={goToPreviousWeek}
                    className="bg-black hover:bg-gray-800 text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-xs md:text-sm"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{t("calendar.prev")}</span>
                  </Button>
                  <Button
                    onClick={goToCurrentWeek}
                    className="bg-green-600 hover:bg-green-700 text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-xs md:text-sm"
                  >
                    {t("calendar.current")}
                  </Button>
                  <Button
                    onClick={goToNextWeek}
                    className="bg-black hover:bg-gray-800 text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] text-xs md:text-sm"
                  >
                    <span className="hidden sm:inline">{t("calendar.next")}</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <h2 className="text-base md:text-xl font-bold text-center md:text-right">{getMonthYearDisplay()}</h2>
              </div>

              {/* Tabs for mobile view */}
              <div className="md:hidden mb-4">
                <Tabs defaultValue="calendar" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="calendar" className="text-sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {language === "vi" ? "Lịch" : "Calendar"}
                    </TabsTrigger>
                    <TabsTrigger value="list" className="text-sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {language === "vi" ? "Danh sách" : "List"}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Desktop Calendar View */}
              <div className="hidden md:block">
                {/* Calendar Header - IMPROVED */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDates.map((date, index) => (
                    <div
                      key={index}
                      className={`p-2 md:p-3 text-center border-2 border-black font-bold flex flex-col justify-center items-center ${
                        date.getDay() === 0 ? "bg-red-100" : date.getDay() === 6 ? "bg-blue-100" : "bg-yellow-100"
                      }`}
                    >
                      <div className="text-base md:text-lg mb-1">{getDayName(date)}</div>
                      <div className="text-lg md:text-xl">{formatDate(date)}</div>
                    </div>
                  ))}
                </div>

                {/* Calendar Body */}
                <div className="grid grid-cols-7 gap-2 min-h-[400px] md:min-h-[500px]">
                  {weekDates.map((date, dateIndex) => {
                    const formattedDate = formatDateForComparison(date)
                    const dayWorkshops = workshops.filter((workshop) => workshop.date === formattedDate)

                    return (
                      <div
                        key={dateIndex}
                        className="border-2 border-black p-2 bg-white min-h-[400px] md:min-h-[500px] relative"
                      >
                        {/* Workshop events for this day */}
                        {dayWorkshops.map((workshop) => (
                          <div
                            key={workshop.id}
                            className="mb-3 p-2 md:p-3 border-2 border-black cursor-pointer transform transition-transform hover:-translate-y-1"
                            style={{
                              backgroundColor: workshop.color,
                              boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.8)",
                            }}
                            onClick={() => setSelectedWorkshop(workshop)}
                          >
                            <h3 className="font-bold text-white text-shadow-sm text-sm md:text-base">
                              {getTitle(workshop)}
                            </h3>
                            <div className="text-xs md:text-sm font-medium text-white">{workshop.time}</div>
                            <div className="text-xs mt-1 bg-white bg-opacity-30 p-1 rounded">
                              <div>
                                {language === "vi" ? "Hướng dẫn: " : "Instructor: "}
                                {getInstructor(workshop)}
                              </div>
                              <div>{formatSlots(workshop)}</div>
                              <div className="font-bold">
                                {language === "vi" ? "Giá: " : "Price: "}
                                {formatPrice(workshop)}/slot
                              </div>
                            </div>
                            <Button
                              className="mt-2 w-full bg-white text-black hover:bg-gray-100 border-2 border-black rounded-none text-xs font-bold"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedWorkshop(workshop)
                                setIsRegistrationOpen(true)
                              }}
                            >
                              {t("calendar.register")}
                            </Button>
                          </div>
                        ))}

                        {/* Empty state for days with no workshops */}
                        {dayWorkshops.length === 0 && (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400 text-center italic">{t("calendar.empty")}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Calendar View - IMPROVED */}
              {activeTab === "calendar" && (
                <div className="md:hidden">
                  {/* Mobile Calendar Header - IMPROVED */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDates.map((date, index) => (
                      <div
                        key={index}
                        className={`py-1 px-0.5 text-center border-2 border-black font-bold flex flex-col justify-center items-center ${
                          date.getDay() === 0 ? "bg-red-100" : date.getDay() === 6 ? "bg-blue-100" : "bg-yellow-100"
                        }`}
                      >
                        <div className="text-[10px] leading-tight">{getShortDayName(date)}</div>
                        <div className="text-xs leading-tight">{formatDate(date)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Calendar Body - Full Display */}
                  <div className="space-y-4">
                    {weekDates.map((date, dateIndex) => {
                      const formattedDate = formatDateForComparison(date)
                      const dayWorkshops = workshops.filter((workshop) => workshop.date === formattedDate)

                      if (dayWorkshops.length === 0) return null

                      return (
                        <div key={dateIndex} className="border-2 border-black bg-white">
                          {/* Date Header - IMPROVED */}
                          <div
                            className={`py-2 px-3 text-center font-bold flex justify-center items-center ${
                              date.getDay() === 0 ? "bg-red-100" : date.getDay() === 6 ? "bg-blue-100" : "bg-yellow-100"
                            } border-b-2 border-black`}
                          >
                            <span className="text-sm mr-2">{getShortDayName(date)}</span>
                            <span className="text-sm">{formatDate(date)}</span>
                          </div>

                          {/* Workshop events for this day */}
                          <div className="p-2 space-y-3">
                            {dayWorkshops.map((workshop) => (
                              <div
                                key={workshop.id}
                                className="p-2 border-2 border-black cursor-pointer"
                                style={{
                                  backgroundColor: workshop.color,
                                  boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.8)",
                                }}
                                onClick={() => setSelectedWorkshop(workshop)}
                              >
                                <h3 className="font-bold text-white text-shadow-sm text-sm">{getTitle(workshop)}</h3>
                                <div className="text-xs font-medium text-white">{workshop.time}</div>
                                <div className="text-xs mt-1 bg-white bg-opacity-30 p-1 rounded">
                                  <div>
                                    {language === "vi" ? "Hướng dẫn: " : "Instructor: "}
                                    {getInstructor(workshop)}
                                  </div>
                                  <div>{formatSlots(workshop)}</div>
                                  <div className="font-bold">
                                    {language === "vi" ? "Giá: " : "Price: "}
                                    {formatPrice(workshop)}/slot
                                  </div>
                                </div>
                                <Button
                                  className="mt-2 w-full bg-white text-black hover:bg-gray-100 border-2 border-black rounded-none text-xs font-bold"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedWorkshop(workshop)
                                    setIsRegistrationOpen(true)
                                  }}
                                >
                                  {t("calendar.register")}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}

                    {/* Empty state if no workshops in the week */}
                    {currentWeekWorkshops.length === 0 && (
                      <div className="border-2 border-black p-4 bg-white text-center">
                        <p className="text-gray-400 italic">{t("calendar.empty")}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile List View */}
              {activeTab === "list" && (
                <div className="md:hidden space-y-3">
                  {currentWeekWorkshops.length > 0 ? (
                    currentWeekWorkshops.map((workshop) => (
                      <div
                        key={workshop.id}
                        className="p-3 border-2 border-black cursor-pointer"
                        style={{
                          backgroundColor: workshop.color,
                          boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.8)",
                        }}
                        onClick={() => setSelectedWorkshop(workshop)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-white text-shadow-sm text-sm">{getTitle(workshop)}</h3>
                          <div className="text-xs bg-white text-black px-2 py-1 rounded-full">
                            {formatDateForDisplay(workshop.date)}
                          </div>
                        </div>
                        <div className="text-xs font-medium text-white mt-1">{workshop.time}</div>
                        <div className="text-xs mt-2 bg-white bg-opacity-30 p-1 rounded">
                          <div>
                            {language === "vi" ? "Hướng dẫn: " : "Instructor: "}
                            {getInstructor(workshop)}
                          </div>
                          <div>{formatSlots(workshop)}</div>
                          <div className="font-bold">
                            {language === "vi" ? "Giá: " : "Price: "}
                            {formatPrice(workshop)}/slot
                          </div>
                        </div>
                        <Button
                          className="mt-2 w-full bg-white text-black hover:bg-gray-100 border-2 border-black rounded-none text-xs font-bold"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedWorkshop(workshop)
                            setIsRegistrationOpen(true)
                          }}
                        >
                          {t("calendar.register")}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {language === "vi" ? "Không có workshop trong tuần này" : "No workshops this week"}
                    </div>
                  )}
                </div>
              )}

              {/* Workshop Detail Dialog */}
              <Dialog
                open={!!selectedWorkshop && !isRegistrationOpen}
                onOpenChange={(open) => !open && setSelectedWorkshop(null)}
              >
                <DialogContent className="border-2 border-black max-w-sm sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold" style={{ color: selectedWorkshop?.color }}>
                      {selectedWorkshop && getTitle(selectedWorkshop)}
                    </DialogTitle>
                  </DialogHeader>

                  {selectedWorkshop && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">{language === "vi" ? "Ngày:" : "Date:"}</div>
                        <div>{formatDateForDisplay(selectedWorkshop.date)}</div>

                        <div className="font-medium">{language === "vi" ? "Thời gian:" : "Time:"}</div>
                        <div>{selectedWorkshop.time}</div>

                        <div className="font-medium">{language === "vi" ? "Hướng dẫn viên:" : "Instructor:"}</div>
                        <div>{getInstructor(selectedWorkshop)}</div>

                        <div className="font-medium">{language === "vi" ? "Chỗ trống:" : "Available slots:"}</div>
                        <div>{formatSlots(selectedWorkshop)}</div>

                        <div className="font-medium">{language === "vi" ? "Giá:" : "Price:"}</div>
                        <div>{formatPrice(selectedWorkshop)}/slot</div>
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-black rounded-none text-sm font-bold"
                        onClick={() => {
                          setIsRegistrationOpen(true)
                        }}
                      >
                        {t("calendar.register")}
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Info Dialog */}
              <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
                <DialogContent className="border-2 border-black max-w-sm sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-green-700">
                      {language === "vi" ? "Thông tin Workshop" : "Workshop Information"}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-base mb-2">{t("calendar.info.title")}</h3>
                      <ul className="grid grid-cols-1 gap-2 text-sm">
                        {workshops.slice(0, 5).map((workshop) => (
                          <li key={workshop.id} className="flex items-center">
                            <div
                              className="w-3 h-3 md:w-4 md:h-4 border border-black mr-2"
                              style={{ backgroundColor: workshop.color }}
                            ></div>
                            <span className="text-xs md:text-sm">
                              {getTitle(workshop)} - {formatPrice(workshop)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-base mb-2">{t("calendar.registration.title")}</h3>
                      <p className="mb-2 text-xs md:text-sm">{t("calendar.registration.desc")}</p>
                      <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm">
                        <li>
                          {language === "vi" ? "Hotline: " : "Hotline: "}
                          <span className="font-medium">0905312812</span>
                        </li>
                        <li>
                          {language === "vi" ? "Email: " : "Email: "}
                          <span className="font-medium">contact@tabooworkshop.com</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Legend - Responsive */}
              <div className="mt-6 md:mt-8 p-3 md:p-4 border-2 border-black bg-gray-100">
                <h3 className="font-bold text-base md:text-lg mb-2">{t("calendar.info.title")}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {workshops.map((workshop) => (
                    <li key={workshop.id} className="flex items-center">
                      <div
                        className="w-3 h-3 md:w-4 md:h-4 border border-black mr-2"
                        style={{ backgroundColor: workshop.color }}
                      ></div>
                      <span className="text-xs md:text-sm">
                        {getTitle(workshop)} - {formatPrice(workshop)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Registration Info - Responsive */}
              <div className="mt-4 md:mt-6 p-3 md:p-4 border-2 border-black bg-green-100">
                <h3 className="font-bold text-base md:text-lg mb-2">{t("calendar.registration.title")}</h3>
                <p className="mb-2 text-xs md:text-sm">{t("calendar.registration.desc")}</p>
                <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm">
                  <li>
                    {language === "vi" ? "Hotline: " : "Hotline: "}
                    <span className="font-medium">0905312812</span>
                  </li>
                  <li>
                    {language === "vi" ? "Email: " : "Email: "}
                    <span className="font-medium">contact@tabooworkshop.com</span>
                  </li>
                  <li>
                    {language === "vi" ? "Địa chỉ: " : "Address: "}
                    <span className="font-medium">
                      {language === "vi"
                        ? "Tổ 4, Thôn Võng Nhi, Xã Cẩm Thanh, Thành Phố Hội An, Tỉnh Quảng Nam"
                        : "Group 4, Vong Nhi Village, Cam Thanh Commune, Hoi An City, Quang Nam Province"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Registration Form */}
      <WorkshopRegistrationForm
        workshop={selectedWorkshop}
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
      />

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


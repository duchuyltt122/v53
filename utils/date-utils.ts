export function getLocalizedMonthName(date: Date, language: "vi" | "en"): string {
  if (language === "vi") {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ]
    return months[date.getMonth()]
  } else {
    return date.toLocaleString("en-US", { month: "long" })
  }
}


"use server"

import { Resend } from "resend"

export type RegistrationData = {
  name: string
  email: string
  phone: string
  slots: number
  workshopTitle: string
  workshopDate: string
  workshopTime: string
  language: "vi" | "en"
  price_vnd: number // Giá VND
  price_usd: number // Giá USD
  totalPrice: number // Tổng giá
}

export async function sendConfirmationEmail(data: RegistrationData) {
  try {
    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Log for debugging
    console.log("Initializing Resend with API key available:", !!process.env.RESEND_API_KEY)

    const {
      name,
      email,
      phone,
      slots,
      workshopTitle,
      workshopDate,
      workshopTime,
      language,
      price_vnd,
      price_usd,
      totalPrice,
    } = data

    const subject =
      language === "vi"
        ? `Xác nhận đăng ký Workshop: ${workshopTitle}`
        : `Workshop Registration Confirmation: ${workshopTitle}`

    // Create a simple HTML email instead of using React Email components
    const htmlContent = createEmailHtml(data)

    // Send the email
    const { data: emailData, error } = await resend.emails.send({
      from: "Taboo Bamboo Workshop <onboarding@resend.dev>", // Use Resend's default sender for testing
      to: email,
      subject: subject,
      html: htmlContent,
    })

    if (error) {
      console.error("Resend API error:", error)
      return { success: false, error: error.message }
    }

    console.log("Email sent successfully:", emailData)
    return {
      success: true,
      data: emailData,
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

// Create HTML email content
function createEmailHtml(data: RegistrationData): string {
  const {
    name,
    email,
    phone,
    slots,
    workshopTitle,
    workshopDate,
    workshopTime,
    language,
    price_vnd,
    price_usd,
    totalPrice,
  } = data

  const translations = {
    greeting: {
      vi: `Xin chào ${name},`,
      en: `Hello ${name},`,
    },
    thankYou: {
      vi: "Cảm ơn bạn đã đăng ký tham gia workshop của Taboo Bamboo.",
      en: "Thank you for registering for a Taboo Bamboo workshop.",
    },
    confirmationDetails: {
      vi: "Dưới đây là thông tin chi tiết về đăng ký của bạn:",
      en: "Below are the details of your registration:",
    },
    workshopInfo: {
      vi: "Thông tin Workshop",
      en: "Workshop Information",
    },
    workshopTitle: {
      vi: "Tên Workshop:",
      en: "Workshop Title:",
    },
    date: {
      vi: "Ngày:",
      en: "Date:",
    },
    time: {
      vi: "Thời gian:",
      en: "Time:",
    },
    registrationInfo: {
      vi: "Thông tin đăng ký",
      en: "Registration Information",
    },
    nameLabel: {
      vi: "Họ tên:",
      en: "Name:",
    },
    emailLabel: {
      vi: "Email:",
      en: "Email:",
    },
    phoneLabel: {
      vi: "Số điện thoại:",
      en: "Phone:",
    },
    slotsLabel: {
      vi: "Số lượng chỗ:",
      en: "Number of slots:",
    },
    priceLabel: {
      vi: "Giá mỗi slot:",
      en: "Price per slot:",
    },
    totalPriceLabel: {
      vi: "Tổng thanh toán:",
      en: "Total payment:",
    },
    instructions: {
      vi: "Vui lòng đến sớm 15 phút trước giờ bắt đầu workshop. Nếu bạn cần thay đổi hoặc hủy đăng ký, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại bên dưới.",
      en: "Please arrive 15 minutes before the workshop starts. If you need to change or cancel your registration, please contact us via email or phone number below.",
    },
    paymentInfo: {
      vi: "Thông tin thanh toán",
      en: "Payment Information",
    },
    paymentMethod: {
      vi: "Phương thức thanh toán:",
      en: "Payment method:",
    },
    paymentCash: {
      vi: "Thanh toán tại chỗ",
      en: "Pay on arrival",
    },
    questions: {
      vi: "Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:",
      en: "If you have any questions, please contact:",
    },
    visitWebsite: {
      vi: "Ghé thăm website của chúng tôi",
      en: "Visit our website",
    },
    footer: {
      vi: "© 2023 Taboo Bamboo Workshop. Tất cả các quyền được bảo lưu.",
      en: "© 2023 Taboo Bamboo Workshop. All rights reserved.",
    },
  }

  // Format price based on language
  const formatPrice = () => {
    if (language === "vi") {
      return price_vnd.toLocaleString("vi-VN") + "₫"
    } else {
      return "$" + price_usd.toFixed(2)
    }
  }

  // Format total price based on language
  const formatTotalPrice = () => {
    if (language === "vi") {
      return (price_vnd * slots).toLocaleString("vi-VN") + "₫"
    } else {
      return "$" + (price_usd * slots).toFixed(2)
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${language === "vi" ? "Xác nhận đăng ký Workshop" : "Workshop Registration Confirmation"}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #1e7e34;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        .details {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
        }
        .detail-row {
          margin-bottom: 10px;
        }
        .detail-label {
          font-weight: bold;
          color: #666;
        }
        .price-row {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #ddd;
        }
        .total-price {
          font-size: 18px;
          font-weight: bold;
          color: #1e7e34;
        }
        .button {
          display: inline-block;
          background-color: #1e7e34;
          color: #ffffff;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #999;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <h1>Taboo Bamboo Workshop</h1>
        </div>
        <div class="content">
          <p>${translations.greeting[language]}</p>
          <p>${translations.thankYou[language]}</p>
          <p>${translations.confirmationDetails[language]}</p>
          
          <h2>${translations.workshopInfo[language]}</h2>
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">${translations.workshopTitle[language]}</span>
              <span>${workshopTitle}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${translations.date[language]}</span>
              <span>${workshopDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${translations.time[language]}</span>
              <span>${workshopTime}</span>
            </div>
          </div>
          
          <h2>${translations.registrationInfo[language]}</h2>
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">${translations.nameLabel[language]}</span>
              <span>${name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${translations.emailLabel[language]}</span>
              <span>${email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${translations.phoneLabel[language]}</span>
              <span>${phone}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${translations.slotsLabel[language]}</span>
              <span>${slots}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">${translations.priceLabel[language]}</span>
              <span>${formatPrice()}</span>
            </div>
            <div class="detail-row price-row">
              <span class="detail-label">${translations.totalPriceLabel[language]}</span>
              <span class="total-price">${formatTotalPrice()}</span>
            </div>
          </div>
          
          <h2>${translations.paymentInfo[language]}</h2>
          <div class="details">
            <div class="detail-row">
              <span class="detail-label">${translations.paymentMethod[language]}</span>
              <span>${translations.paymentCash[language]}</span>
            </div>
          </div>
          
          <p>${translations.instructions[language]}</p>
          
          <p>${translations.questions[language]}</p>
          <p>Email: contact@taboobambooworkshop.com</p>
          <p>Phone: 0905312812</p>
          
          <div style="text-align: center;">
            <a href="https://taboobambooworkshop.com" class="button">${translations.visitWebsite[language]}</a>
          </div>
          
          <div class="footer">
            ${translations.footer[language]}
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}


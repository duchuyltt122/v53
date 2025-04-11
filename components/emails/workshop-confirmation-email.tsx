import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Img,
  Button,
  Row,
  Column,
} from "@react-email/components"

interface WorkshopConfirmationEmailProps {
  name: string
  email: string
  phone: string
  slots: number
  workshopTitle: string
  workshopDate: string
  workshopTime: string
  language: "vi" | "en"
}

export function WorkshopConfirmationEmail({
  name,
  email,
  phone,
  slots,
  workshopTitle,
  workshopDate,
  workshopTime,
  language,
}: WorkshopConfirmationEmailProps) {
  const translations = {
    preview: {
      vi: `Xác nhận đăng ký Workshop: ${workshopTitle}`,
      en: `Workshop Registration Confirmation: ${workshopTitle}`,
    },
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
    name: {
      vi: "Họ tên:",
      en: "Name:",
    },
    email: {
      vi: "Email:",
      en: "Email:",
    },
    phone: {
      vi: "Số điện thoại:",
      en: "Phone:",
    },
    slots: {
      vi: "Số lượng chỗ:",
      en: "Number of slots:",
    },
    instructions: {
      vi: "Vui lòng đến sớm 15 phút trước giờ bắt đầu workshop. Nếu bạn cần thay đổi hoặc hủy đăng ký, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại bên dưới.",
      en: "Please arrive 15 minutes before the workshop starts. If you need to change or cancel your registration, please contact us via email or phone number below.",
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

  return (
    <Html>
      <Head />
      <Preview>{translations.preview[language]}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/taboo-bamboo-logo-placeholder.png"
              width="150"
              height="60"
              alt="Taboo Bamboo Workshop"
              style={logo}
            />
          </Section>
          <Section style={content}>
            <Text style={paragraph}>{translations.greeting[language]}</Text>
            <Text style={paragraph}>{translations.thankYou[language]}</Text>
            <Text style={paragraph}>{translations.confirmationDetails[language]}</Text>

            <Heading as="h2" style={heading}>
              {translations.workshopInfo[language]}
            </Heading>
            <Section style={detailsContainer}>
              <Row>
                <Column>
                  <Text style={detailLabel}>{translations.workshopTitle[language]}</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{workshopTitle}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={detailLabel}>{translations.date[language]}</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{workshopDate}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={detailLabel}>{translations.time[language]}</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{workshopTime}</Text>
                </Column>
              </Row>
            </Section>

            <Heading as="h2" style={heading}>
              {translations.registrationInfo[language]}
            </Heading>
            <Section style={detailsContainer}>
              <Row>
                <Column>
                  <Text style={detailLabel}>{translations.name[language]}</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{name}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={detailLabel}>{translations.email[language]}</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{email}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={detailLabel}>{translations.phone[language]}</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{phone}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={detailLabel}>{translations.slots[language]}</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{slots}</Text>
                </Column>
              </Row>
            </Section>

            <Text style={paragraph}>{translations.instructions[language]}</Text>

            <Text style={paragraph}>{translations.questions[language]}</Text>
            <Text style={contactInfo}>Email: contact@taboobambooworkshop.com</Text>
            <Text style={contactInfo}>Phone: 0905312812</Text>

            <Section style={buttonContainer}>
              <Button pX={20} pY={12} style={button} href="https://taboobambooworkshop.com">
                {translations.visitWebsite[language]}
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>{translations.footer[language]}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
}

const logoContainer = {
  padding: "20px",
  textAlign: "center" as const,
}

const logo = {
  margin: "0 auto",
}

const content = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
}

const heading = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1e7e34",
  marginTop: "30px",
  marginBottom: "15px",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333",
  margin: "16px 0",
}

const detailsContainer = {
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "5px",
  margin: "15px 0",
}

const detailLabel = {
  fontSize: "14px",
  color: "#666",
  margin: "5px 0",
  fontWeight: "bold",
}

const detailValue = {
  fontSize: "14px",
  color: "#333",
  margin: "5px 0",
}

const contactInfo = {
  fontSize: "14px",
  color: "#666",
  margin: "5px 0",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const button = {
  backgroundColor: "#1e7e34",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
}

const hr = {
  borderColor: "#e6e6e6",
  margin: "30px 0",
}

const footer = {
  fontSize: "12px",
  color: "#999",
  textAlign: "center" as const,
}


import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

type OrderItem = {
  name: string
  price: number
  quantity: number
}

type OrderConfirmationEmailProps = {
  name: string
  orderItems: OrderItem[]
  totalAmount: number
  shippingAddress: string
  phoneNumber: string
  notes: string
  language: string
}

export function OrderConfirmationEmail({
  name,
  orderItems,
  totalAmount,
  shippingAddress,
  phoneNumber,
  notes,
  language,
}: OrderConfirmationEmailProps) {
  const isVietnamese = language === "vi"

  const formatCurrency = (amount: number) => {
    return isVietnamese ? `${amount.toLocaleString("vi-VN")}₫` : `$${(amount / 23000).toFixed(2)}`
  }

  return (
    <Html>
      <Head />
      <Preview>
        {isVietnamese
          ? `Xác nhận đơn hàng của bạn từ Taboo Bamboo Workshop`
          : `Your order confirmation from Taboo Bamboo Workshop`}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-8 rounded shadow-sm my-8 mx-auto">
            <Section>
              <Img
                src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//logo.png"
                width="120"
                height="50"
                alt="Taboo Bamboo Workshop"
                className="mx-auto mb-4"
              />
              <Heading className="text-xl text-center text-gray-800 my-4">
                {isVietnamese ? "Xác nhận đơn hàng" : "Order Confirmation"}
              </Heading>
              <Text className="text-gray-700">{isVietnamese ? `Xin chào ${name},` : `Hello ${name},`}</Text>
              <Text className="text-gray-700">
                {isVietnamese
                  ? "Cảm ơn bạn đã đặt hàng tại Taboo Bamboo Workshop. Dưới đây là chi tiết đơn hàng của bạn:"
                  : "Thank you for your order with Taboo Bamboo Workshop. Here are your order details:"}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-4" />

            <Section>
              <Heading as="h3" className="text-base font-semibold text-gray-800 mb-2">
                {isVietnamese ? "Chi tiết đơn hàng:" : "Order Details:"}
              </Heading>

              {orderItems.map((item, index) => (
                <Row key={index} className="mb-2">
                  <Column>
                    <Text className="text-gray-700 m-0">
                      {item.name} x {item.quantity}
                    </Text>
                  </Column>
                  <Column align="right">
                    <Text className="text-gray-700 m-0 text-right">{formatCurrency(item.price * item.quantity)}</Text>
                  </Column>
                </Row>
              ))}

              <Hr className="border-gray-200 my-2" />

              <Row>
                <Column>
                  <Text className="text-gray-800 font-semibold m-0">{isVietnamese ? "Tổng cộng:" : "Total:"}</Text>
                </Column>
                <Column align="right">
                  <Text className="text-gray-800 font-semibold m-0 text-right">{formatCurrency(totalAmount)}</Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 my-4" />

            <Section>
              <Heading as="h3" className="text-base font-semibold text-gray-800 mb-2">
                {isVietnamese ? "Thông tin giao hàng:" : "Shipping Information:"}
              </Heading>
              <Text className="text-gray-700 m-0">
                <strong>{isVietnamese ? "Địa chỉ:" : "Address:"}</strong> {shippingAddress}
              </Text>
              <Text className="text-gray-700 m-0">
                <strong>{isVietnamese ? "Số điện thoại:" : "Phone:"}</strong> {phoneNumber}
              </Text>
              {notes && (
                <Text className="text-gray-700 m-0">
                  <strong>{isVietnamese ? "Ghi chú:" : "Notes:"}</strong> {notes}
                </Text>
              )}
            </Section>

            <Hr className="border-gray-200 my-4" />

            <Section>
              <Text className="text-gray-700 text-center">
                {isVietnamese
                  ? "Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi tại support@taboobamboo.com"
                  : "If you have any questions, please contact us at support@taboobamboo.com"}
              </Text>
              <Text className="text-gray-700 text-center mt-4">
                {isVietnamese
                  ? "Cảm ơn bạn đã mua sắm tại Taboo Bamboo Workshop!"
                  : "Thank you for shopping with Taboo Bamboo Workshop!"}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}


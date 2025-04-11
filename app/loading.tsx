import Image from "next/image"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col items-center p-8 rounded-lg">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Taboo Logo"
            width={100}
            height={100}
            className="animate-pulse"
          />
        </div>
        <h2 className="text-xl font-medium text-green-700 mb-2">Đang tải...</h2>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}


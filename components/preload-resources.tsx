"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { preloadFont } from "next/font/google"

export function PreloadResources() {
  const pathname = usePathname()

  useEffect(() => {
    // Preload important pages based on current path
    if (pathname === "/") {
      // On homepage, preload product page
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = "/san-pham"
      document.head.appendChild(link)
    }
    
    if (pathname.includes("/san-pham")) {
      // On product page, preload checkout
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = "/checkout"
      document.head.appendChild(link)
    }
    
    // Preload critical images
    const preloadCriticalImages = () => {
      const criticalImages = [
        // Thay đổi đường dẫn theo cấu trúc thực tế của project
        "https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img/logo.png",
        "https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img/slide21.jpg",
      ]
      
      criticalImages.forEach(imageSrc => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = imageSrc
        document.head.appendChild(link)
      })
    }
    
    // Use requestIdleCallback to preload during browser idle time
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preloadCriticalImages)
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(preloadCriticalImages, 1000)
    }
    
    return () => {
      // Clean up if needed
    }
  }, [pathname])
  
  return null
}


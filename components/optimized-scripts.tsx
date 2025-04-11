"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

// Component to load scripts only when needed
export function OptimizedScripts() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    // Check if we need to load scripts (e.g., user has scrolled or interacted)
    const handleUserInteraction = () => {
      if (!scriptsLoaded) {
        setScriptsLoaded(true)
      }
    }

    // Add event listeners for user interaction
    window.addEventListener("scroll", handleUserInteraction, { passive: true, once: true })
    window.addEventListener("click", handleUserInteraction, { passive: true, once: true })
    
    // Load scripts after a delay if no interaction
    const timer = setTimeout(() => {
      setScriptsLoaded(true)
    }, 5000) // 5 seconds delay
    
    return () => {
      window.removeEventListener("scroll", handleUserInteraction)
      window.removeEventListener("click", handleUserInteraction)
      clearTimeout(timer)
    }
  }, [scriptsLoaded])

  if (!scriptsLoaded) {
    return null
  }

  return (
    <>
      {/* Add any third-party scripts here */}
      {/* Example: Google Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EXAMPLE');
          `,
        }}
      />
    </>
  )
}

"use client"

import type React from "react"

import { LanguageProvider } from "./language-context"

export function LanguageProviderWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}


"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"

export default function Footer() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")

  return (
    <footer className="bg-green-700 text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4 flex justify-center sm:justify-start">
              <Image
                src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//logo.png"
                alt="Taboo Logo"
                width={140}
                height={60}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-xs mb-2 text-center sm:text-left">{t("footer.copyright")}</p>
            <p className="text-xs mb-2 text-center sm:text-left">{t("footer.address")}</p>
            <p className="text-xs mb-2 text-center sm:text-left">{t("footer.business")}</p>
            <div className="flex space-x-2 mt-4 justify-center sm:justify-start">
              <Link href="#" className="bg-white/20 rounded-full p-1 hover:bg-white/30">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="bg-white/20 rounded-full p-1 hover:bg-white/30">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="bg-white/20 rounded-full p-1 hover:bg-white/30">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="bg-white/20 rounded-full p-1 hover:bg-white/30">
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="font-medium mb-4 text-sm text-center sm:text-left">{t("footer.policies")}</h3>
            <ul className="space-y-2 text-xs text-center sm:text-left">
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.shipping")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.returns")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.payment")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="font-medium mb-4 text-sm text-center sm:text-left">{t("footer.categories")}</h3>
            <ul className="space-y-2 text-xs text-center sm:text-left">
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.lamps")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.decor")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.furniture")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.gifts")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  {t("footer.others")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4 md:mt-0">
            <h3 className="font-medium mb-4 text-sm text-center sm:text-left">{t("footer.newsletter")}</h3>
            <p className="text-xs mb-3 text-center sm:text-left">{t("footer.newsletter.desc")}</p>
            <div className="flex max-w-xs mx-auto sm:mx-0">
              <Input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="text-sm rounded-l-sm rounded-r-none text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-xs rounded-l-none rounded-r-sm">
                {t("footer.newsletter.button")}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4 text-center text-xs">
          <p>{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}


"use client"
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import React from 'react'


const FooterWrapper = () => {
    const pathname = usePathname();
  return (<>
    {pathname !== "/ai" && <Footer />}
    </>
  )
}

export default FooterWrapper
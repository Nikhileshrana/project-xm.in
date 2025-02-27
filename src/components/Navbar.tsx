"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Ai } from "@/components/Ai";

function AnnouncementBanner() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="cursor-pointer inline-flex items-center gap-1 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-100">
          <span className="hidden sm:inline">🎉</span>
          <span className="font-semibold">New : </span>
          <span className="text-xs sm:text-sm hidden md:inline tracking-tighter lg:max-w-xl font-regular">
            Try Our AI. Let AI Plan Your Next Adventure!
          </span>
          <span className="text-xs sm:text-sm inline md:hidden">
            Try Our AI!
          </span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="tracking-tighter font-regular">
            Indian Travel Tour AI 🧠
          </SheetTitle>
          <SheetDescription>
            Your personal travel companion. Ask about destinations, tours,
            weather, or get travel tips.
          </SheetDescription>
        </SheetHeader>
        <Ai />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ReviewButton({
  platform,
  imageSrc,
}: {
  platform: string;
  imageSrc: string;
}) {
  return (
    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted">
      <Image
        src={imageSrc}
        alt={`${platform} Reviews`}
        height={24}
        width={24}
        className="h-6 w-6"
      />
    </button>
  );
}

export function Navbar() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  function MobileNavLink({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        onClick={() => setSheetOpen(false)}
        className="flex items-center gap-2 rounded-lg p-3 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
      >
        {children}
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto">
        <div className="relative flex h-16 items-center justify-between px-4">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Announcement - Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <AnnouncementBanner />
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden items-center gap-4 lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    target="_blank"
                    href="https://www.tripadvisor.in/Attraction_Review-g304551-d4101098-Reviews-Indian_Travel_Tour_Private_Day_Tours-New_Delhi_National_Capital_Territory_of_Delh.html"
                  >
                    <ReviewButton
                      platform="TripAdvisor"
                      imageSrc="/Logos/tripadvisor.svg"
                    />
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    target="_blank"
                    href="https://www.trustpilot.com/review/indianexperience.in"
                  >
                    <ReviewButton
                      platform="Trustpilot"
                      imageSrc="/Logos/trustpilot.svg"
                    />
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
                  >
                    <Link href="/tour" className="gap-1">
                      Find Tours
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 hover:text-orange-800"
                  >
                    <Link href="/" className="gap-1">
                      Home
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden tracking-tighter lg:max-w-xl font-regular">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setSheetOpen(true)}
                  aria-label="Open menu" // 👈 Added accessible name
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Explore our website</SheetDescription>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-2">
                  <MobileNavLink href="/">
                    Home
                    <ArrowUpRight className="h-4 w-4" />
                  </MobileNavLink>
                  <MobileNavLink href="/tour">
                    Find Tours
                    <ArrowUpRight className="h-4 w-4" />
                  </MobileNavLink>
                  <MobileNavLink href="https://www.tripadvisor.in/Attraction_Review-g304551-d4101098-Reviews-Indian_Travel_Tour_Private_Day_Tours-New_Delhi_National_Capital_Territory_of_Delh.html">
                    <Image
                      src="/Logos/tripadvisor.svg"
                      alt="TripAdvisor"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    TripAdvisor Reviews
                  </MobileNavLink>
                  <MobileNavLink href="https://www.trustpilot.com/review/indianexperience.in">
                    <Image
                      src="/Logos/trustpilot.svg"
                      alt="Trustpilot"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                    Trustpilot Reviews
                  </MobileNavLink>
                  <MobileNavLink href="/contact">
                    <Phone className="h-4 w-4" />
                    Contact Us
                  </MobileNavLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import confetti from "canvas-confetti";
import Link from "next/link";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  image: {
    light: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
}: HeroProps) {

  const handleClick = () => {
    confetti({ spread: 360, particleCount: 100 });
  };

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-20 md:py-20 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 sm:gap-24">
        <div className="flex flex-col items-center gap-10 text-center sm:gap-7">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-muted-foreground">{badge.text}</span>
              <Link
                href={badge.action.href}
                onClick={handleClick}
                className="flex items-center gap-1"
              >
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </Badge>
          )}

          <AnimatedText
            text="Namaste World!"
            textClassName="text-3xl sm:text-5xl font-bold mb-2"
            underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
            underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
            underlineDuration={1.5}
          />

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>

          {/* Description */}
          <h2 className="text-md relative z-10 max-w-[790px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
            {description}
          </h2>

          <div className="w-[95%] sm:w-[75%]">
            <HeroVideoDialog
              className="block"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/upBlZIbCXVQ"
              thumbnailSrc="/hero.webp"
              thumbnailAlt="Hero Video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

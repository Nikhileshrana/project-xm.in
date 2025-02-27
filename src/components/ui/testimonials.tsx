"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { User, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Booking through Indian Travel Tour was the best decision! The guides were incredibly knowledgeable, and the places felt unreal. The entire trip was seamless!",
  },
  {
    name: "Samantha",
    text: "The 24/7 support truly sets them apart. Our driver was polite, and the experience felt exclusive. Would book again!",
  },
  {
    name: "Kevin",
    text: "From Jaipur to Agra, every moment was magical. The guides explained history so well, it felt like traveling through time!",
  },
  {
    name: "Emily Carter",
    text: "Highly professional team! The Taj Mahal at sunrise was breathtaking. The itinerary was well-planned, and customer support was always available.",
  },
  {
    name: "John Smith",
    text: "I had an unforgettable experience in Rajasthan! The entire tour was well-organized, and the guides were extremely helpful. I will definitely recommend Indian Travel Tour!",
  },
  {
    name: "Claire Dupont",
    text: "What an amazing journey! From Delhi to Agra, every stop was a new adventure. The customer support was excellent and always there to help. A five-star experience.",
  },
  {
    name: "David Harris",
    text: "I loved the personalized touch Indian Travel Tour provided. The private tour was so convenient, and the quality of the experience exceeded all expectations!",
  },
  {
    name: "Olivia Martin",
    text: "I felt safe and well taken care of throughout the trip. The guides provided insightful information, and I got to experience the beauty of India in the most authentic way.",
  },
  {
    name: "Lukas Müller",
    text: "The entire booking process was smooth, and the trip was unforgettable. The guides were patient and friendly, making it feel like a local experience with a global touch!",
  },
  {
    name: "Marta Rodríguez",
    text: "Amazing service from start to finish! The Taj Mahal and Jaipur were just as incredible as I'd imagined. Highly recommended for anyone planning a trip to India.",
  },
];


function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, current]);

  return (
    <div className="w-full py-10">
      <div className="container mx-auto">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
            Our Happy Travelers
          </h2>
          <p className="text-sm leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-left">
          <strong>Please note:</strong> The individuals featured are previous travelers who have kindly granted us permission to share their testimonials.</p>
          </div>
          <Carousel setApi={setApi} className="w-full ">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem className="lg:basis-1/3 p-4" key={index}>
                  <div className="bg-accent/70 rounded-md p-4 shadow-sm flex flex-col gap-3 h-[200px]">
                    <div className="flex items-center gap-2">
                      <User className="w-6 h-6 stroke-1" />
                      <span className="font-semibold">{testimonial.name}</span>
                    </div>
                    <p className="text-sm">{testimonial.text}</p>
                    <div className="flex gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Testimonials };

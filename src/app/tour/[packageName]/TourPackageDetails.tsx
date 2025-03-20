"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  BadgeDollarSign,
  XCircle,
  CalendarDays,
  Users2,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/DottedBox";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import type { TourPackage } from "@/lib/types";
import axios from "axios";
import Link from "next/link";
import BookingProcess from "./BookingProcess";
import { MapPin, Landmark, Utensils } from "lucide-react";

export default function TourPackageDetails({
  tourPackage,
}: {
  tourPackage: TourPackage;
}) {
  const [itinerary, setItinerary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getItinerary = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/ai", {
        destination: tourPackage?.location,
        days: tourPackage?.duration,
        preferences: "culture, food, sightseeing",
        summaryDescription: tourPackage?.description,
        tourPackage: tourPackage.heading1,
      });

      // Log the raw response to see if it’s a string
      console.log("API Response:", response.data);

      // Check if response.data is a string and parse it to an array
      let itineraryData = response.data;
      if (typeof itineraryData === "string") {
        itineraryData = JSON.parse(itineraryData);
      }

      // Ensure the parsed data is an array
      if (Array.isArray(itineraryData)) {
        setItinerary(itineraryData);
      } else {
        console.error("Itinerary is not an array:", itineraryData);
        setItinerary(null);
      }
    } catch (error) {
      console.error("Error fetching itinerary", error);
      setItinerary(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItinerary();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6 lg:space-y-8">
          <div className="relative h-[250px] sm:h-[350px] lg:h-[450px] rounded-lg overflow-hidden">
            <Image
              src={tourPackage.imageURL ?? "/placeholder.svg"}
              alt={tourPackage.heading1 ?? "Tour Package Image"}
              fill
              loading="eager"
              quality={70} // Consider lowering this slightly if needed
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjusted for mobile if container is full width
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-4 left-4" variant="default">
              Featured Tour
            </Badge>
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          <Card>
            <div className="flex justify-evenly items-center">
              <div className="flex flex-col items-center text-center">
                <CalendarDays className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Duration
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                  {tourPackage.duration}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users2 className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Group Size
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                  Min 1 People
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Rating
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                  {tourPackage.rating} out of 5
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BadgeDollarSign className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Best Price
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
                  Guarantee
                </p>
              </div>
            </div>
            <Badge className="flex justify-center text-center text-sm font-medium tracking-tight p-1 mt-3">Need to clear doubts? WhatsApp us at +91 9811171495</Badge>
          </Card>
        </div>

        <Card className="w-full sm:max-w-2xl mx-auto overflow-hidden backdrop-blur-md">
          <CardContent className="p-2 sm:p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Badge>Verified</Badge>

                  <Link
                    href="https://www.tripadvisor.in/Attraction_Review-g304551-d4101098-Reviews-Indian_Travel_Tour_Private_Day_Tours-New_Delhi_National_Capital_Territory_of_Delh.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-2 group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  >
                    Reviews on Tripadvisor
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>

                <h1 className="text-gray-800 dark:text-gray-200  text-3xl md:text-3xl tracking-tighter lg:max-w-xl font-regular">
                  {tourPackage.heading1}
                </h1>
                <h2 className="leading-snug text-gray-600  dark:text-gray-200 text-lg md:text-xl tracking-tighter lg:max-w-xl font-regular">
                  {tourPackage.heading2}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-200 tracking-tighter lg:max-w-xl font-regular">
                {tourPackage.description}
              </p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Price per person</p>
                  <p className="text-5xl font-bold dark:text-gray-200 text-gray-800">
                    ${tourPackage.price}
                  </p>
                </div>
                <div>
                  <BookingProcess tourPackage={tourPackage} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
      </div>

      <Card variant="dots">
        <h2 className="text-gray-800 dark:text-gray-200  text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
          Itinerary
        </h2>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center h-64"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={40}
              height={40}
              viewBox="0 0 24 24"
            >
              <title>Loading...</title>
              <circle cx="4" cy="12" r="2" fill="currentColor">
                <animate
                  id="ellipsis1"
                  begin="0;ellipsis3.end+0.25s"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.6s"
                  values="12;6;12"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
              </circle>
              <circle cx="12" cy="12" r="2" fill="currentColor">
                <animate
                  begin="ellipsis1.begin+0.1s"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.6s"
                  values="12;6;12"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
              </circle>
              <circle cx="20" cy="12" r="2" fill="currentColor">
                <animate
                  id="ellipsis3"
                  begin="ellipsis1.begin+0.2s"
                  attributeName="cy"
                  calcMode="spline"
                  dur="0.6s"
                  values="12;6;12"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                />
              </circle>
            </svg>
            <div className="text-center text-gray-800 dark:text-gray-200  text-2xl md:text-4xl tracking-tighter font-regularr">
              Generating an amazing itinerary for an amazing traveler. 😊✨
            </div>
          </motion.div>
        ) : itinerary ? (
          <>
            <div className="space-y-6">
              {itinerary.map((day: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mt-4 p-4 border rounded-lg"
                >
                  <h3 className="text-xl font-semibold">
                    {day.day} - {day.title}
                  </h3>

                  {day.activities.map((activity: any, i: number) => (
                    <div key={i} className="mt-2 flex items-start space-x-4">
                      <span>
                        <Clock className="w-4 h-4 text-primary mt-1" />
                      </span>
                      <div>
                        <p className="text-md font-medium">
                          <strong>{activity.time}</strong>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col md:flex-row gap-8 mt-8 justify-start">
                    {[
                      {
                        icon: (
                          <Landmark className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                        ),
                        title: "Places to Visit",
                        items: day.placesToVisit,
                        bgColor:
                          "bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100",
                      },
                      {
                        icon: (
                          <MapPin className="h-5 w-5 text-red-600 dark:text-red-300" />
                        ),
                        title: "Must-Visit Places",
                        items: day.mustVisitPlaces,
                        bgColor:
                          "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
                      },
                      {
                        icon: (
                          <Utensils className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                        ),
                        title: "Food to Try",
                        items: day.foodToTry,
                        bgColor:
                          "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
                      },
                    ].map((section, index) => (
                      <div key={index} className="space-y-3">
                        <div className="text-gray-800 dark:text-gray-200 font-semibold text-base md:text-lg tracking-tighter font-regular">
                          {section.title}
                        </div>
                        <div className="flex flex-wrap gap-2 ">
                          {section.icon}
                          {section.items.map((item: any, idx: any) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className={`${section.bgColor} text-xs`}
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Note: Itinerary is generated by AI. It’s fully customizable.
              </p>
            </div>
          </>
        ) : (
          <p>Failed to load itinerary. Please try again later.</p>
        )}
      </Card>

      <Card variant="dots">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-20">
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              What's Included
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {tourPackage.whatIncluded.map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What's Not Included */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
              What's Not Included
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {tourPackage.whatNotIncluded.map(
                (item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </Card>


      <div className="flex justify-center">
      <BookingProcess tourPackage={tourPackage} />
      </div>
    </div>
  );
}

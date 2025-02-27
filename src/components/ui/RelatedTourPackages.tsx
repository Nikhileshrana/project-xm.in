"use client"
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const RelatedTourPackages = ({ packages }: any) => {
  return (
    <div className="sm:w-full pt-20 pb-10">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Related Tour Packages
          </h4>
          <Link href="/tour">
            <Button className="gap-4">
              View all packages <MoveRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages?.map((tour: any, index: any) => (
              <Link
              key={index}
                  href={`/tour/${tour.slug}`}
                  aria-label={`View more details about ${tour.heading1}`}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <div className="relative w-full h-44">
                        <Image
                          src={tour.imageURL || "/placeholder.svg"}
                          alt={`Image of ${tour.heading1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={50}
                          placeholder="blur"
                          blurDataURL="/placeholder.svg"
                          loading="lazy"
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <Badge
                        className="absolute top-2 right-2"
                        variant="default"
                      >
                        {tour.duration}
                      </Badge>
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <h2 className="text-xl font-semibold mb-2">
                        {tour.heading1}
                      </h2>
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {tour.location}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {tour.duration}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {tour.rating.toFixed(1)}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 flex items-center justify-between bg-muted">
                      <span className="text-xl font-bold">${tour.price}</span>
                      <Button size="sm">View More</Button>
                    </CardFooter>
                  </Card>
                </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { RelatedTourPackages };

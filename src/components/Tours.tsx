"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, MapPin, Clock, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Tour } from "@/lib/types";

const rating = ["1", "2", "3", "4", "5"];
const durations = ["1-3 days", "4-7 days", "8-14 days", "15+ days"];

export default function Tours({ initialTours }: { initialTours: Tour[] }) {
  const [filteredTours, setFilteredTours] = useState<Tour[]>(initialTours);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, Math.max(...initialTours.map(tour => tour.price))]);  // Set max price dynamically
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price_low" | "price_high" | "rating">(
    "price_low"
  );
  const [visibleTours, setVisibleTours] = useState(9);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    if (!filtersApplied) return;

    const result = initialTours.filter(
      (initialTours) =>
        initialTours.heading1
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        initialTours.price >= priceRange[0] &&
        initialTours.price <= priceRange[1] &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(initialTours.rating.toString())) &&
        (selectedDurations.length === 0 ||
          selectedDurations.includes(
            getDurationCategory(initialTours.duration)
          ))
    );

    result.sort((a, b) => {
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      return b.rating - a.rating;
    });

    setFilteredTours(result);
  }, [
    initialTours,
    searchTerm,
    priceRange,
    selectedCategories,
    selectedDurations,
    sortBy,
    filtersApplied,
  ]);

  const getDurationCategory = (duration: string): string => {
    const days = Number.parseInt(duration);
    if (days <= 3) return "1-3 days";
    if (days <= 7) return "4-7 days";
    if (days <= 14) return "8-14 days";
    return "15+ days";
  };

  const loadMoreTours = () => {
    setVisibleTours((prev) => prev + 6);
  };

  const handleFilterChange = () => {
    setFiltersApplied(true);
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="py-12">
        <div className="flex gap-4 pb-4 flex-col items-start">
          <Badge>Featured</Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
            Tour Packages
          </h2>
          <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
            Serving you a variety of tour packages to select from. Don't worry,
            we do custom ones too. Just give us a call.
          </p>
        </div>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          name="search"
          placeholder="Search your adventure..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilterChange();
          }}
          className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-primary/70 focus:border-primary focus:outline-none focus:ring-0"
          style={{ outline: "none", boxShadow: "none" }}
          aria-label="Search tours"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}

        <div className="w-full md:w-1/4 space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent className="w-full">
                <Slider
                  min={0}
                  max={Math.max(...initialTours.map((tour) => tour.price))}
                  step={50}
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value);
                    handleFilterChange();
                  }}
                  className="w-full"
                  aria-label="Select price range"
                />
                <div className="flex justify-between mt-2">
                  <span>
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                {rating.map((rating, index) => (
                  <div
                    key={rating || index}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Checkbox
                      id={rating}
                      checked={selectedCategories.includes(rating)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories(
                          checked
                            ? [...selectedCategories, rating]
                            : selectedCategories.filter((c) => c !== rating)
                        );
                        handleFilterChange();
                      }}
                      aria-labelledby={`rating-${rating}`}
                    />
                    <label
                      htmlFor={rating}
                      className="text-sm font-medium"
                      id={`rating-${rating}`}
                    >
                      {rating}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="duration">
              <AccordionTrigger>Duration</AccordionTrigger>
              <AccordionContent>
                {durations.map((duration) => (
                  <div
                    key={duration}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Checkbox
                      id={duration}
                      checked={selectedDurations.includes(duration)}
                      onCheckedChange={(checked) => {
                        setSelectedDurations(
                          checked
                            ? [...selectedDurations, duration]
                            : selectedDurations.filter((d) => d !== duration)
                        );
                        handleFilterChange();
                      }}
                      aria-labelledby={`duration-${duration}`}
                    />
                    <label
                      htmlFor={duration}
                      className="text-sm font-medium"
                      id={`duration-${duration}`}
                    >
                      {duration}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <Label>Sort By</Label>
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value as "price_low" | "price_high" | "rating");
                handleFilterChange();
              }}
            >
              <SelectTrigger aria-label="Sort by">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tour Cards */}
        <motion.div
          layout
          className="w-full md:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredTours.slice(0, visibleTours).map((tour, index) => (
              <motion.div
                key={tour.id || index}
                layout
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
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
                          sizes="(max-width: 768px) 320px, (max-width: 1200px) 50vw, 33vw"
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
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredTours.length === 0 && (
            <>
              <p className="text-center text-muted-foreground mt-8">
                Looks like we overslept please reload. :)
              </p>
              <Link href="/tour">
                <Button>Go to Tours</Button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
      {filteredTours.length > visibleTours && (
        <div className="text-center mt-4 mx-auto justify-center w-full sm:ml-[28.5%] sm:w-[70%]">
          <Button onClick={loadMoreTours} size="lg" className="mt-5" variant="default">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
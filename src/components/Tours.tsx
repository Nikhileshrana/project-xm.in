"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
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
import {
  Star,
  MapPin,
  Clock,
  Search,
  Filter,
  X,
  ChevronDown,
  Heart,
  LucideLink2,
} from "lucide-react";
import type { Tour } from "@/lib/types";
import Link from "next/link";

const ratings = ["1", "2", "3", "4", "5"];
const durations = ["1-3 days", "4-7 days", "8-14 days", "15+ days"];

export default function Tours({ initialTours }: { initialTours: Tour[] }) {
  const [filteredTours, setFilteredTours] = useState<Tour[]>(initialTours);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([
    0,
    Math.max(...initialTours.map((tour) => tour.price)),
  ]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"price_low" | "price_high" | "rating">(
    "price_low"
  );
  const [visibleTours, setVisibleTours] = useState(9);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const maxPrice = Math.max(...initialTours.map((tour) => tour.price));

  useEffect(() => {
    if (!filtersApplied && searchTerm === "") {
      setFilteredTours(initialTours);
      return;
    }

    const result = initialTours.filter(
      (tour) =>
        tour.heading1.toLowerCase().includes(searchTerm.toLowerCase()) &&
        tour.price >= priceRange[0] &&
        tour.price <= priceRange[1] &&
        (selectedRatings.length === 0 ||
          selectedRatings.includes(tour.rating.toString())) &&
        (selectedDurations.length === 0 ||
          selectedDurations.includes(getDurationCategory(tour.duration)))
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
    selectedRatings,
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

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, maxPrice]);
    setSelectedRatings([]);
    setSelectedDurations([]);
    setSortBy("price_low");
    setFiltersApplied(false);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeFilterCount = [
    searchTerm !== "",
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    selectedRatings.length > 0,
    selectedDurations.length > 0,
  ].filter(Boolean).length;

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Clear all
            <X className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["price", "rating", "duration"]}
        className="w-full"
      >
        <AccordionItem value="price" className="border-b">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="flex items-center">
              Price Range
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <Slider
              min={0}
              max={maxPrice}
              step={50}
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value);
                handleFilterChange();
              }}
              className="w-full"
              aria-label="Select price range"
            />
            <div className="flex justify-between mt-4">
              <div className="bg-muted px-3 py-1 rounded-md">
                <span className="text-sm font-medium">${priceRange[0]}</span>
              </div>
              <div className="bg-muted px-3 py-1 rounded-md">
                <span className="text-sm font-medium">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating" className="border-b">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="flex items-center">
              Rating
              {selectedRatings.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedRatings.length}
                </Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => {
                    setSelectedRatings(
                      checked
                        ? [...selectedRatings, rating]
                        : selectedRatings.filter((c) => c !== rating)
                    );
                    handleFilterChange();
                  }}
                  aria-labelledby={`rating-label-${rating}`}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-medium flex items-center cursor-pointer"
                  id={`rating-label-${rating}`}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${rating}-${i}`}
                      className={`h-4 w-4 ${
                        i < parseInt(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="duration" className="border-b">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="flex items-center">
              Duration
              {selectedDurations.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedDurations.length}
                </Badge>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            {durations.map((duration) => (
              <div key={duration} className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={selectedDurations.includes(duration)}
                  onCheckedChange={(checked) => {
                    setSelectedDurations(
                      checked
                        ? [...selectedDurations, duration]
                        : selectedDurations.filter((d) => d !== duration)
                    );
                    handleFilterChange();
                  }}
                  aria-labelledby={`duration-label-${duration}`}
                />
                <label
                  htmlFor={`duration-${duration}`}
                  className="text-sm font-medium cursor-pointer"
                  id={`duration-label-${duration}`}
                >
                  {duration}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-2">
        <Label htmlFor="sort-by" className="block mb-2">
          Sort By
        </Label>
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value as "price_low" | "price_high" | "rating");
            handleFilterChange();
          }}
        >
          <SelectTrigger id="sort-by" aria-label="Sort by" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="py-8 md:py-12">
        <div className="flex gap-4 pb-4 flex-col items-start">
          <Badge className="bg-primary hover:bg-primary/90">Featured</Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h1 className="text-3xl md:text-5xl tracking-tighter font-medium">
            Tour Packages
          </h1>
          <p className="text-lg max-w-xl lg:max-w-2xl leading-relaxed tracking-tight text-muted-foreground">
            Discover our handpicked tour packages designed for unforgettable
            experiences. Need something custom? We've got you covered.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full mx-auto transition-all duration-200">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 w-full">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground/70 transition-colors duration-200 group-hover:text-primary" />
                <Input
                  name="search"
                  placeholder="Search destinations, activities, or keywords..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleFilterChange();
                  }}
                  className="pl-11 pr-4 py-6 w-full rounded-xl bg-background border-input hover:border-ring focus:border-ring transition-colors duration-200"
                  aria-label="Search tours"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-muted/50 transition-colors duration-200"
                    onClick={() => {
                      setSearchTerm("");
                      handleFilterChange();
                    }}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                className="hidden md:flex items-center gap-2 px-6 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                onClick={handleFilterChange}
              >
                Search
                <Search className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="md:hidden flex items-center justify-center gap-2 w-full h-12 rounded-xl border-input hover:bg-muted/50 transition-colors duration-200"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>

              <div className="hidden md:block">
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value as "price_low" | "price_high" | "rating");
                    handleFilterChange();
                  }}
                >
                  <SelectTrigger
                    aria-label="Sort by"
                    className="w-[180px] h-12 rounded-xl bg-background border-input hover:border-ring transition-colors duration-200"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {activeFilterCount > 0 && (
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
            )}

            {searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search:{" "}
                {searchTerm.length > 15
                  ? searchTerm.substring(0, 15) + "..."
                  : searchTerm}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <Badge variant="outline" className="flex items-center gap-1">
                Price: ${priceRange[0]} - ${priceRange[1]}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => setPriceRange([0, maxPrice])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {selectedRatings.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                Rating: {selectedRatings.join(", ")}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => setSelectedRatings([])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {selectedDurations.length > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                Duration: {selectedDurations.length} selected
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => setSelectedDurations([])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-background z-50 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterSidebar />
            <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t mt-6">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="w-1/2"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button
                  className="w-1/2"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block w-full md:w-1/4 sticky top-4 self-start">
          <FilterSidebar />
        </div>

        {/* Tour Cards */}
        <div className="w-full md:w-3/4">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-muted-foreground">
              {filteredTours.length}{" "}
              {filteredTours.length === 1 ? "tour" : "tours"} found
            </p>
          </div>

          {filteredTours.length === 0 ? (
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No tours found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search criteria to find more
                options.
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.slice(0, visibleTours).map((tour, index) => (
                <Link
                  key={tour.id !== undefined ? tour.id : index}
                  className="group"
                  href={`/tour/${tour.slug}`}
                >
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <div className="relative w-full h-52 overflow-hidden">
                        <Image
                          src={tour.imageURL || "/placeholder.svg"}
                          alt={`Image of ${tour.heading1}`}
                          fill
                          sizes="(max-width: 768px) 320px, (max-width: 1200px) 50vw, 33vw"
                          quality={50}
                          placeholder="blur"
                          blurDataURL="/placeholder.svg"
                          loading="lazy"
                          className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
                        <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground">
                          {tour.duration}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 rounded-full bg-background/80 hover:bg-background ${
                            favorites.includes(tour.id)
                              ? "text-red-500"
                              : "text-muted-foreground"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(tour.id);
                          }}
                          aria-label={
                            favorites.includes(tour.id)
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(tour.id) ? "fill-current" : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-5 flex-grow">
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {tour.heading1}
                      </h2>
                      <div className="flex items-center mb-3">
                        <MapPin className="w-4 h-4 mr-1 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {tour.location}
                        </span>
                      </div>
                      <div className="flex items-center mb-3">
                        <Clock className="w-4 h-4 mr-1 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {tour.duration}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={`star-${tour.id}-${i}`}
                            className={`w-4 h-4 ${
                              i < Math.floor(tour.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < tour.rating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-muted"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">
                          {tour.rating.toFixed(1)}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 flex items-center justify-between bg-muted/50 border-t">
                      <span className="text-xl font-bold">${tour.price}</span>
                      <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        View Details
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {filteredTours.length > visibleTours && (
            <div className="text-center mt-8">
              <Button
                onClick={loadMoreTours}
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-medium"
              >
                Load More Tours
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

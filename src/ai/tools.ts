import { tool as createTool } from "ai";
import { z } from "zod";
import { getTours } from "@/lib/api";
import axios from "axios";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=b5269146dcc74267ab1194322251302&q=${location}&aqi=no`
    );
    const data = await response.json();
    return {
      weather: data.current.condition.text,
      temperature: data.current.temp_c,
      location,
    };
  },
});

export const tourPackageTool = createTool({
  description:
    "Fetch the closest matching tour packages based on user query for travelling/searching/any query",
  parameters: z.object({
    query: z
      .string()
      .describe("The user query describing the tour they are looking for"),
  }),
  execute: async function ({ query }) {
    const tours = await getTours();

    // Convert query to lowercase for case-insensitive comparison
    const queryLower = query.toLowerCase();

    // Find matching tours based on heading1, heading2, or keywords
    let matches = tours.filter(
      (tour: any) =>
        tour.heading1.toLowerCase().includes(queryLower) ||
        tour.location.toLowerCase().includes(queryLower) ||
        tour.heading2.toLowerCase().includes(queryLower) ||
        (tour.keywords && tour.keywords.toLowerCase().includes(queryLower))
    );

    // If less than 3 matches, add more closest available tours
    if (matches.length < 3) {
      const remainingTours = tours.filter((tour) => !matches.includes(tour));

      // Sort remaining tours by a basic similarity metric (word occurrences)
      const sortedRemaining = remainingTours
        .map((tour) => ({
          tour,
          score:
            tour.heading1
              .toLowerCase()
              .split(" ")
              .filter((word) => queryLower.includes(word)).length +
            tour.heading2
              .toLowerCase()
              .split(" ")
              .filter((word) => queryLower.includes(word)).length +
            (tour.keywords
              ? tour.keywords
                  .toLowerCase()
                  .split(" ")
                  .filter((word) => queryLower.includes(word)).length
              : 0),
        }))
        .sort((a, b) => b.score - a.score) // Sort by highest score
        .map((entry) => entry.tour);

      matches = [...matches, ...sortedRemaining].slice(0, 3);
    }

    return matches.map((match) => ({
      name: match.heading1,
      description: match.heading2,
      price: match.price,
      image: match.imageURL,
      link: `/tour/${match.slug}`,
    }));
  },
});

export const contactInfoTool = createTool({
  description: "Provide contact information for assistance",
  parameters: z.object({}),
  execute: async function () {
    return {
      contactNumber: "+91 9811171495",
      email: "contactravelforce@gmail.com",
      twitter: "indiantravltour",
      contactPageLink: "/contact",
    };
  },
});

export const showToursTool = createTool({
  description: "Show all available tours if user asks for it",
  parameters: z.object({}),
  execute: async function () {
    const tours = await getTours();
    return tours;
  },
});

export const bookingTool = createTool({
  description:
    "Book a tour package. Provide the necessary details to book a tour and ask one by one",
  parameters: z.object({
    name: z.string().describe("travellers name"),
    email: z.string().describe("travellers email"),
    contactNumber: z.string().describe("Contact number of traveller"),
    tourPackage: z.string().describe("Tour package to book"),
    numberOfAdults: z.number().describe("Number of adults"),
    numberOfChildren: z.number().describe("Number of children"),
  }),
  execute: async function ({ name, email, contactNumber, tourPackage,numberOfAdults,numberOfChildren }) {
    try {
      const formData = {
        startDate: new Date(),
        adults: numberOfAdults,
        children: numberOfChildren,
        name: name,
        email: email,
        phone: contactNumber,
        paymentMethod: "Pay on Arrival Booked Via AI Bot",
        tourPackageBooked: tourPackage,
        tourPackagePrice: 0,
      };
      
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/mongoDB/book`,formData);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/nodemailer/book`, formData);

      return {
        message: "Booking successful",
        data: { name, email, contactNumber, tourPackage },
        success: true,
      };
    } catch (error) {
      return {
        message: "Booking unsuccessful",
        success: false,
        error: error,
      };
    }
  },
});

export const tools = {
  booking: bookingTool,
  displayWeather: weatherTool,
  fetchTourPackage: tourPackageTool,
  getContactInfo: contactInfoTool,
  showTours: showToursTool,
};

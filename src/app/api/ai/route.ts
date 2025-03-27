export const maxDuration = 60;

import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Get the Gemini API key from the environment variables
const geminiApi = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "Not Found";
const genAI = new GoogleGenerativeAI(geminiApi);

// Define the schema for the itinerary response
const schema = {
  description: "Travel Itinerary with Timed Activities",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      title: {
        type: SchemaType.STRING,
        description: "Title summarizing the day's activities",
        nullable: false,
      },
      day: {
        type: SchemaType.STRING,
        description: "Day of the trip",
        nullable: false,
      },
      activities: {
        type: SchemaType.ARRAY,
        description: "List of activities for the day with respective time and detailed descriptions",
        items: {
          type: SchemaType.OBJECT,
          properties: {
            time: {
              type: SchemaType.STRING,
              description: "Time for the activity (e.g., 8:00 AM, 2:30 PM)",
              nullable: false,
            },
            description: {
              type: SchemaType.STRING,
              description: "Detailed activity description (minimum 70 words)",
              nullable: false,
            },
          },
          required: ["time", "description"],
        },
      },
      placesToVisit: {
        type: SchemaType.ARRAY,
        description: "List of places to visit on the day",
        items: {
          type: SchemaType.STRING,
          description: "A place to visit",
        },
      },
      mustVisitPlaces: {
        type: SchemaType.ARRAY,
        description: "Must-visit places for the trip",
        items: {
          type: SchemaType.STRING,
          description: "A must-visit place",
        },
      },
      foodToTry: {
        type: SchemaType.ARRAY,
        description: "List of food to try",
        items: {
          type: SchemaType.STRING,
          description: "Food to try on this day",
        },
      },
    },
    required: [
      "title",
      "day",
      "activities",
      "placesToVisit",
      "mustVisitPlaces",
      "foodToTry",
    ],
  },
};

// Set up Gemini's generative model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

// Define the POST handler for the Next.js API route
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the incoming JSON body
    console.log("📩 Received Request Body in api/ai :", body);

    // Extract relevant information from the body (destination, days, preferences)
    const { destination, days, preferences, summaryDescription, tourPackage } = body;

    // Ensure all required fields are present
    if (!destination || !days || !preferences) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create the prompt to send to the Gemini model
    const prompt = `
      Generate a structured ${days}-day travel itinerary for a trip to ${destination}, focusing on ${preferences}. Package name is ${tourPackage}. 
      The itinerary should follow a clear timeline with departure times, guided tour details, and key attractions. 

      For each day:
      - Provide a **title** summarizing the day's theme.
      - List activities with **specific times** (e.g., 8:30 AM - Visit Taj Mahal) and ensure **each description is at least 70 words**.
      - Mention **places to visit**, highlighting must-visit locations.
      - Include **local food recommendations** based on the day’s locations.
      
      The itinerary should be well-structured and easy to follow. The description of the tour package is: ${summaryDescription}.
    `;

    // Generate the content using Gemini's model
    const result = await model.generateContent(prompt);

    console.log(result.response.text());

    // Return the generated response as JSON
    return NextResponse.json(result.response.text());
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

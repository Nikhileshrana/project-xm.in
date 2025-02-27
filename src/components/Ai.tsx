"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { AudioLines, Loader2, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

interface TourPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  link: string;
}

const starterPrompts = [
  {
    title: "Find Popular Tours",
    description: "Discover top-rated tours in your desired destination",
    emoji: "🗺️",
    prompt: "Show me popular tours in Agra",
  },
  {
    title: "Check Weather",
    description: "Planning a trip? Get the latest weather updates",
    emoji: "☀️",
    prompt: "What's the weather like in Jaipur for travelling?",
  },
  {
    title: "I need human assistance.",
    description: "Get help planning your perfect trip schedule",
    emoji: "📅",
    prompt: "I need human support for planning my trip. give me contact details",
  },
  {
    title: "Book a tour package",
    description: "Get expert travel advice and recommendations",
    emoji: "✈️",
    prompt: "Book a tour package from delhi to agra",
  },
];

export function Ai() {
  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: "/api/ai/genui",
    });
  const [showStarter, setShowStarter] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const maxLength = 1000;

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handlePromptClick = async (prompt: string) => {
    setShowStarter(false);
    setInput(prompt);
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  const renderTourCards = (tours: TourPackage[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {tours.map((tour, id) => (
        <Link href={tour.link} key={id} className="block">
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
            <div className="h-32 relative">
              <Image
                src={tour.image || "/placeholder.svg"}
                alt={tour.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-1">
                <h3 className="text-sm font-semibold text-white">
                  {tour.name}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {tour.duration}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm font-medium">
                    {tour.rating}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {tour.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">
                  ${tour.price}
                </span>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full mx-auto">
      <ScrollArea
        ref={scrollAreaRef}
        className="w-full flex-1 px-4 lg:px-8 py-6 overflow-y-auto mb-16 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        <div className="max-w-5xl mx-auto">
          <AnimatePresence>
            {showStarter && messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {starterPrompts.map((prompt, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/50 transition-all rounded-lg border border-gray-300"
                        onClick={() => handlePromptClick(prompt.prompt)}
                      >
                        <div className="text-2xl">{prompt.emoji}</div>
                        <div className="text-left">
                          <h3 className="font-semibold">{prompt.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {prompt.description}
                          </p>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } gap-3`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <AudioLines className="h-5 w-5 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert">
                    <Markdown>{message.content}</Markdown>
                  </div>

                  {message.toolInvocations?.map((toolInvocation) => {
                    const { toolName, toolCallId, state } = toolInvocation;

                    if (state === "result") {
                      if (toolName === "displayWeather") {
                        const { result } = toolInvocation;
                        return (
                          <Card
                            key={toolCallId}
                            className="mt-4 p-4 bg-card/50 backdrop-blur"
                          >
                            <h3 className="font-semibold">
                              Weather in {result.location}
                            </h3>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-2xl font-bold">
                                {result.temperature}°C
                              </span>
                              <span className="text-muted-foreground">
                                {result.weather}
                              </span>
                            </div>
                          </Card>
                        );
                      }

                      if (toolName === "fetchTourPackage") {
                        const { result } = toolInvocation;
                        return (
                          <div key={toolCallId} className="mt-4 w-full">
                            {result?.length ? (
                              renderTourCards(result)
                            ) : (
                              <p className="text-muted-foreground">
                                No tours found matching your criteria
                              </p>
                            )}
                          </div>
                        );
                      }

                      if (toolName === "getContactInfo") {
                        const { result } = toolInvocation;
                        return (
                          <Card
                            key={toolCallId}
                            className="mt-4 p-4 bg-card/50 backdrop-blur"
                          >
                            <h3 className="font-semibold">Contact Us</h3>
                            <p>
                              📞 <strong>Phone/WhatsApp</strong>:{" "}
                              {result.contactNumber}
                            </p>
                            <p>
                              📧 <strong>Email</strong>: {result.email}
                            </p>
                            <p>
                              🐦 <strong>Twitter</strong>:{" "}
                              <Link
                                href={`https://twitter.com/${result.twitter}`}
                                className=" underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                @{result.twitter}
                              </Link>
                            </p>
                            <Link href={result.contactPageLink}>
                              <Button
                                variant="default"
                                size="lg"
                                className="mt-2"
                              >
                                Visit Contact Page
                              </Button>
                            </Link>
                          </Card>
                        );
                      }

                      if (toolName === "booking") {
                        const { result } = toolInvocation;
                        return (
                          <>
                            <Card className="w-full mt-5 p-8 text-center bg-[#ecfdf5] border-[#34d399] border-2 rounded-xl shadow-xl"
                            >
                              <div className="mb-6">
                                <div className="mx-auto w-20 h-20 bg-[#34d399] rounded-full flex items-center justify-center animate-scale-up">
                                  <Check className="w-12 h-12 text-white" />
                                </div>
                              </div>

                              <h1 className="text-3xl font-bold mb-6 text-[#065f46]">
                                Thanks for booking this trip!
                              </h1>

                              <div className="space-y-4 bg-white/50 rounded-lg p-6 backdrop-blur-sm">
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">
                                    Name
                                  </p>
                                  <p className="font-medium text-lg">
                                    {result.data.name}
                                  </p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">
                                    Email
                                  </p>
                                  <p className="font-medium text-lg">
                                    {result.data.email}
                                  </p>
                                </div>
                              </div>

                              <p className="mt-6 text-sm text-[#059669]">
                                A confirmation email has been sent to your inbox
                              </p>
                            </Card>
                          </>
                        );
                      }
                    }
                    return (
                      <div
                        key={toolCallId}
                        className="flex items-center gap-2 text-muted-foreground mt-2"
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>
                          {toolName === "fetchTourPackage"
                            ? "Searching for tours..."
                            : toolName === "displayWeather"
                            ? "Fetching weather data..."
                            : toolName === "contactInfoTool"
                            ? "Fetching contact information..."
                            : "Ahmmm I think i have overslept today... You can continue writing another prompt. :) "}{" "}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">U</span>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>

      <div className="relative bottom-8 left-0 right-0 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-3xl p-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask anything..."
                className={cn(
                  "min-h-[56px] w-full resize-none rounded-2xl border-2 bg-background px-4 py-4 pr-20 text-base focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200",
                  isFocused ? "shadow-lg" : "shadow-md"
                )}
                maxLength={maxLength}
              />
              <div className="absolute right-3 bottom-4">
                <button
                  type="submit"
                  className={cn(
                    "h-10 w-10 transition-all duration-200 rounded-full bg-primary/40 flex items-center justify-center",
                    input.length === 0 && "cursor-not-allowed"
                  )}
                  disabled={input.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary-foreground" />
                  ) : (
                    <ArrowUp className="h-7 w-7" color="black" />
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground">
              AI responses may take a few moments. Please be patient.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

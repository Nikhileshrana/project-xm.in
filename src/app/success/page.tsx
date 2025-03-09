"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function page() {
  const [showElements, setShowElements] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setShowElements(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24">
            {/* Success checkmark circle */}
            <svg 
              className="h-full w-full" 
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M30 50L45 65L70 35"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
              />
            </svg>
            
            {/* Animated plane */}
            <motion.div
              className="absolute left-full top-0"
              initial={{ x: -200, y: 100, opacity: 0 }}
              animate={{ x: 100, y: -100, opacity: showElements ? 1 : 0 }}
              transition={{ duration: 2, delay: 1.8, ease: "easeOut" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M21.5 15L15.5 9L18.5 3L15.5 5L12.5 2L11 7L4 0L3 1L9 9L4 11L1 9L0 12.5L4.5 14L6 18.5L9.5 17.5L11 23L12 22L9 15L15 13L21.5 15Z" 
                  fill="hsl(var(--primary))"
                />
              </svg>
            </motion.div>
            
            {/* Animated luggage */}
            <motion.div
              className="absolute bottom-0 right-full"
              initial={{ x: 100, y: -50, opacity: 0 }}
              animate={{ x: -80, y: 50, opacity: showElements ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="16" height="12" rx="2" stroke="hsl(var(--primary))" strokeWidth="2"/>
                <path d="M16 8V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V8" stroke="hsl(var(--primary))" strokeWidth="2"/>
                <path d="M9 12V16" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 12V16" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-2 text-2xl font-bold text-foreground">Booking Successful!</h1>
          <p className="mb-6 text-muted-foreground">
            Your trip has been successfully booked. Get ready for an amazing adventure!
          </p>
          
          <motion.div
            className="mb-6 rounded-lg bg-muted p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p className="text-sm text-muted-foreground">
              We've sent a confirmation email with all your booking details.
              You can also find your itinerary in your account dashboard.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex justify-center"
          >
            <Link href="/">
            <Button size="lg" className="px-8">
              Go to Home Page
            </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Confetti elements */}
      {showElements && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                background: `hsl(var(--${['primary', 'secondary', 'accent'][i % 3]}))`,
                top: `${Math.random() * 40 + 30}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, Math.random() * 100 + 50],
                x: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5 + 2,
                repeat: 0
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"

export default function TravelPopup() {
  const [open, setOpen] = useState(false)
  const [country, setCountry] = useState("")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 7900)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('/api/mongoDB/lead', {
        country,
        message,
        email,
        phone
      })
      console.log("Contact info submitted:", { country, message, email, phone })
      setOpen(false)
    } catch (error) {
      console.error("Error submitting contact info:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm sm:w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Planning a Trip? Let’s Make It Special!🌟✈️</DialogTitle>
          <DialogDescription className="text-center">
            Share Your Details & Let’s Craft Your Perfect Journey!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Your Country</Label>
            <Input
              id="country"
              type="text"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Any Message?</Label>
            <Textarea
              id="Message"
              value={message}
              rows={2}
              placeholder="Any message to us?"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
         

          <p className="text-xs text-muted-foreground text-center">
            Don't worry, we do not spam messages. You can trust us.
          </p>

          <DialogFooter className="sm:justify-center gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
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

export default function TravelPopup() {
  const [open, setOpen] = useState(false)
  const [contactInfo, setContactInfo] = useState("")
  const [isEmail, setIsEmail] = useState(false) // Changed to false to make phone the default

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prepare data with default values if empty
    let email = isEmail ? contactInfo : "phone@gmail.com"
    let phone = !isEmail ? contactInfo : "9999999999"
    
    try {
      await axios.post('/api/mongoDB/lead', {
        email,
        phone
      })
      console.log("Contact info submitted:", { email, phone })
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
          Share Your Phone/Email & Let’s Craft Your Perfect Journey!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2">
            <Button
              type="button"
              variant={!isEmail ? "default" : "outline"}
              onClick={() => setIsEmail(false)}
              className="w-24"
            >
              Phone
            </Button>
            <Button
              type="button"
              variant={isEmail ? "default" : "outline"}
              onClick={() => setIsEmail(true)}
              className="w-24"
            >
              Email
            </Button>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">{isEmail ? "Email address" : "Phone number"}</Label>
            <Input
              id="contact"
              type={isEmail ? "email" : "tel"}
              placeholder={isEmail ? "you@example.com" : "+1 (555) 000-0000"}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
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
"use client"

import { useState, type FormEvent } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Check, Mail, Phone, MapPin } from "lucide-react"
import axios from "axios"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    const response  = await axios.post("/api/nodemailer/contact", formData)
    console.log(response.data);
    setIsSubmitting(false)
    setSubmitMessage(response.data.success ? "Message sent successfully!" : "Failed to send message")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 sm:mt-14">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4" variant="default">
                Contact Us
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Get in touch!</h1>
              <p className="text-xl text-muted-foreground">
                We're here to help with any questions about our travel services.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Our team is available round the clock to assist you.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">We aim to respond to all inquiries within 24 hours.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Our travel experts have years of experience in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="lg:sticky lg:top-4">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {submitMessage && <p className="text-center text-green-600">{submitMessage}</p>}
              </form>

              {/* Additional Contact Information */}
              <div className="mt-8 pt-8 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <p>contactravelforce@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <p>+91 9811171495</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <p>222, Pocket, 7, Sector 21, Rohini, New Delhi, Delhi, 110086</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
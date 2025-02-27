"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  ShoppingCartIcon as PaypalIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import type { TourPackage } from "@/lib/types";
import axios from "axios";
import confetti from "canvas-confetti";
import { ToastContainer, toast, Slide } from "react-toastify";
import { FullScreenCalendar } from "@/components/ui/fullscreen-calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingProcess({
  tourPackage,
}: {
  tourPackage: TourPackage;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [nextButtonLoading, setnextButtonLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState({
    startDate: selectedDate,
    adults: 1,
    children: 0,
    name: "",
    email: "",
    phone: "",
    paymentMethod: "Pay on Arrival",
    tourPackageBooked: tourPackage.heading1,
    tourPackagePrice: tourPackage.price,
  });

  const countries = [
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" },
    { name: "Andorra", code: "+376" },
    { name: "Angola", code: "+244" },
    { name: "Argentina", code: "+54" },
    { name: "Armenia", code: "+374" },
    { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" },
    { name: "Azerbaijan", code: "+994" },
    { name: "Bahamas", code: "+1242" },
    { name: "Bahrain", code: "+973" },
    { name: "Bangladesh", code: "+880" },
    { name: "Barbados", code: "+1246" },
    { name: "Belarus", code: "+375" },
    { name: "Belgium", code: "+32" },
    { name: "Belize", code: "+501" },
    { name: "Benin", code: "+229" },
    { name: "Bhutan", code: "+975" },
    { name: "Bolivia", code: "+591" },
    { name: "Bosnia and Herzegovina", code: "+387" },
    { name: "Botswana", code: "+267" },
    { name: "Brazil", code: "+55" },
    { name: "Brunei", code: "+673" },
    { name: "Bulgaria", code: "+359" },
    { name: "Burkina Faso", code: "+226" },
    { name: "Burundi", code: "+257" },
    { name: "Cambodia", code: "+855" },
    { name: "Cameroon", code: "+237" },
    { name: "Canada", code: "+1_" },
    { name: "Cape Verde", code: "+238" },
    { name: "Central African Republic", code: "+236" },
    { name: "Chad", code: "+235" },
    { name: "Chile", code: "+56" },
    { name: "China", code: "+86" },
    { name: "Colombia", code: "+57" },
    { name: "Comoros", code: "+269" },
    { name: "Congo", code: "+242" },
    { name: "Costa Rica", code: "+506" },
    { name: "Croatia", code: "+385" },
    { name: "Cuba", code: "+53" },
    { name: "Cyprus", code: "+357" },
    { name: "Czech Republic", code: "+420" },
    { name: "Denmark", code: "+45" },
    { name: "Djibouti", code: "+253" },
    { name: "Dominica", code: "+1767" },
    { name: "Dominican Republic", code: "+1809" },
    { name: "East Timor", code: "+670" },
    { name: "Ecuador", code: "+593" },
    { name: "Egypt", code: "+20" },
    { name: "El Salvador", code: "+503" },
    { name: "Equatorial Guinea", code: "+240" },
    { name: "Eritrea", code: "+291" },
    { name: "Estonia", code: "+372" },
    { name: "Ethiopia", code: "+251" },
    { name: "Fiji", code: "+679" },
    { name: "Finland", code: "+358" },
    { name: "France", code: "+33" },
    { name: "Gabon", code: "+241" },
    { name: "Gambia", code: "+220" },
    { name: "Georgia", code: "+995" },
    { name: "Germany", code: "+49" },
    { name: "Ghana", code: "+233" },
    { name: "Greece", code: "+30" },
    { name: "Grenada", code: "+1473" },
    { name: "Guatemala", code: "+502" },
    { name: "Guinea", code: "+224" },
    { name: "Guinea-Bissau", code: "+245" },
    { name: "Guyana", code: "+592" },
    { name: "Haiti", code: "+509" },
    { name: "Honduras", code: "+504" },
    { name: "Hong Kong", code: "+852" },
    { name: "Hungary", code: "+36" },
    { name: "Iceland", code: "+354" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Iran", code: "+98" },
    { name: "Iraq", code: "+964" },
    { name: "Ireland", code: "+353" },
    { name: "Israel", code: "+972" },
    { name: "Italy", code: "+39" },
    { name: "Jamaica", code: "+1876" },
    { name: "Japan", code: "+81" },
    { name: "Jordan", code: "+962" },
    { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" },
    { name: "Kiribati", code: "+686" },
    { name: "Kuwait", code: "+965" },
    { name: "Kyrgyzstan", code: "+996" },
    { name: "Laos", code: "+856" },
    { name: "Latvia", code: "+371" },
    { name: "Lebanon", code: "+961" },
    { name: "Lesotho", code: "+266" },
    { name: "Liberia", code: "+231" },
    { name: "Libya", code: "+218" },
    { name: "Liechtenstein", code: "+423" },
    { name: "Lithuania", code: "+370" },
    { name: "Luxembourg", code: "+352" },
    { name: "Macau", code: "+853" },
    { name: "Madagascar", code: "+261" },
    { name: "Malawi", code: "+265" },
    { name: "Malaysia", code: "+60" },
    { name: "Maldives", code: "+960" },
    { name: "Mali", code: "+223" },
    { name: "Malta", code: "+356" },
    { name: "Marshall Islands", code: "+692" },
    { name: "Mauritania", code: "+222" },
    { name: "Mauritius", code: "+230" },
    { name: "Mexico", code: "+52" },
    { name: "Micronesia", code: "+691" },
    { name: "Moldova", code: "+373" },
    { name: "Monaco", code: "+377" },
    { name: "Mongolia", code: "+976" },
    { name: "Montenegro", code: "+382" },
    { name: "Morocco", code: "+212" },
    { name: "Mozambique", code: "+258" },
    { name: "Myanmar", code: "+95" },
    { name: "Namibia", code: "+264" },
    { name: "Nauru", code: "+674" },
    { name: "Nepal", code: "+977" },
    { name: "Netherlands", code: "+31" },
    { name: "New Zealand", code: "+64" },
    { name: "Nicaragua", code: "+505" },
    { name: "Niger", code: "+227" },
    { name: "Nigeria", code: "+234" },
    { name: "North Korea", code: "+850" },
    { name: "North Macedonia", code: "+389" },
    { name: "Norway", code: "+47" },
    { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" },
    { name: "Palau", code: "+680" },
    { name: "Palestine", code: "+970" },
    { name: "Panama", code: "+507" },
    { name: "Papua New Guinea", code: "+675" },
    { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" },
    { name: "Philippines", code: "+63" },
    { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" },
    { name: "Qatar", code: "+974" },
    { name: "Romania", code: "+40" },
    { name: "Russia", code: "+7" },
    { name: "Rwanda", code: "+250" },
    { name: "Saint Kitts and Nevis", code: "+1869" },
    { name: "Saint Lucia", code: "+1758" },
    { name: "Saint Vincent and the Grenadines", code: "+1784" },
    { name: "Samoa", code: "+685" },
    { name: "San Marino", code: "+378" },
    { name: "Sao Tome and Principe", code: "+239" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Senegal", code: "+221" },
    { name: "Serbia", code: "+381" },
    { name: "Seychelles", code: "+248" },
    { name: "Sierra Leone", code: "+232" },
    { name: "Singapore", code: "+65" },
    { name: "Slovakia", code: "+421" },
    { name: "Slovenia", code: "+386" },
    { name: "Solomon Islands", code: "+677" },
    { name: "Somalia", code: "+252" },
    { name: "South Africa", code: "+27" },
    { name: "South Korea", code: "+82" },
    { name: "South Sudan", code: "+211" },
    { name: "Spain", code: "+34" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Sudan", code: "+249" },
    { name: "Suriname", code: "+597" },
    { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" },
    { name: "Syria", code: "+963" },
    { name: "Taiwan", code: "+886" },
    { name: "Tajikistan", code: "+992" },
    { name: "Tanzania", code: "+255" },
    { name: "Thailand", code: "+66" },
    { name: "Togo", code: "+228" },
    { name: "Tonga", code: "+676" },
    { name: "Trinidad and Tobago", code: "+1868" },
    { name: "Tunisia", code: "+216" },
    { name: "Turkey", code: "+90" },
    { name: "Turkmenistan", code: "+993" },
    { name: "Tuvalu", code: "+688" },
    { name: "Uganda", code: "+256" },
    { name: "Ukraine", code: "+380" },
    { name: "United Arab Emirates", code: "+971" },
    { name: "United Kingdom", code: "+44" },
    { name: "United States", code: "+1" },
    { name: "Uruguay", code: "+598" },
    { name: "Uzbekistan", code: "+998" },
    { name: "Vanuatu", code: "+678" },
    { name: "Vatican City", code: "+379" },
    { name: "Venezuela", code: "+58" },
    { name: "Vietnam", code: "+84" },
    { name: "Yemen", code: "+967" },
    { name: "Zambia", code: "+260" },
    { name: "Zimbabwe", code: "+263" }
  ];

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    const newPhone = value + phoneNumber;
    setFormData(prev => ({ ...prev, phone: newPhone }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    const newPhone = selectedCountry + value;
    setFormData(prev => ({ ...prev, phone: newPhone }));
  };

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setFormData((prev) => ({ ...prev, startDate: date }));
    console.log("Selected Date:", format(date, "yyyy-MM-dd"));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (currentStep === 1 && !selectedDate) {
      toast.error("Please select a date for your tour.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (
        !formData.adults ||
        !formData.name ||
        !formData.email ||
        !formData.phone
      ) {
        toast.error("Please fill all required fields.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        return;
      }

      setnextButtonLoading(true);
      try {
        await axios.post("/api/mongoDB/book", formData);
        await axios.post("/api/nodemailer/book", formData);
        setCurrentStep(3);
      } catch (error) {
        console.error("Error processing booking:", error);
        toast.error("An error occurred. Please try again later.");
      } finally {
        setnextButtonLoading(false);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    confetti({ spread: 360, particleCount: 100 });
    toast.success("🎉 Booking Confirmed!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });

    setTimeout(() => {
      setIsOpen(false);
      setCurrentStep(1);
    }, 2000);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="bg-yellow-400 text-black hover:bg-yellow-500 sm:text-lg sm:py-6"
          >
            Reserve Now at $0
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[370px] sm:max-w-[800px] p-0 overflow-hidden rounded-xl bg-white">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold align-middle">
              Indian Travel Tour - Book
            </DialogTitle>
          </DialogHeader>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <ScrollArea className="space-y-6 px-6 h-[60vh] sm:h-[70vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-3 border-b pb-4">
                  <div className="flex items-center">
                    <Image
                      src={tourPackage.imageURL || "/placeholder.svg"}
                      alt={tourPackage.heading1}
                      width={80}
                      height={40}
                      className="h-20 w-40 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tourPackage.heading1}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ${tourPackage.price}
                        </span>
                        <Badge className="bg-yellow-400 text-black">
                          Selected Package
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {currentStep === 1 ? (
                  <FullScreenCalendar
                    data={[]}
                    onDateSelect={handleDateSelect}
                  />
                ) : currentStep === 2 ? (
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <Label htmlFor="adults">Adults</Label>
                        <Input
                          id="adults"
                          name="adults"
                          type="number"
                          min="1"
                          value={formData.adults}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="children">Children</Label>
                        <Input
                          id="children"
                          name="children"
                          type="number"
                          min="0"
                          value={formData.children}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="flex gap-2">
                        <Select value={selectedCountry} onValueChange={handleCountryChange}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code + country.name} value={country.code}>
                                {country.name} ({country.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          className="flex-1"
                          placeholder="123 456 7890"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-semibold">
                        Payment Method
                      </Label>
                      <RadioGroup
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentMethod: value,
                          }))
                        }
                        className="flex flex-col space-y-2 mt-2"
                      >
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem
                            value="credit-card"
                            id="credit-card"
                          />
                          <Label
                            htmlFor="credit-card"
                            className="flex items-center cursor-pointer"
                          >
                            <CreditCard className="mr-2 h-5 w-5 text-yellow-500" />
                            Pay on Arrival
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label
                            htmlFor="paypal"
                            className="flex items-center cursor-pointer"
                          >
                            <PaypalIcon className="mr-2 h-5 w-5 text-blue-500" />
                            PayPal
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-4 text-lg">
                        Booking Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-semibold">
                            {tourPackage.heading1}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          {selectedDate && (
                            <span>
                              Date:{" "}
                              <span className="font-semibold">
                                {format(selectedDate, "MMMM d, yyyy")}
                              </span>
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <span>Travelers:</span>
                          <span className="font-semibold">
                            {Number(formData.adults) +
                              Number(formData.children)}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold mt-4 pt-2 border-t">
                          <span>Total Payable:</span>
                          <span className="text-yellow-600">
                            $
                            {(
                              (tourPackage.price || 0) *
                              (Number(formData.adults) +
                                Number(formData.children))
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>

          <DialogFooter className="px-6 py-4 bg-gray-50">
            <div className="flex justify-between w-full">
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="hover:bg-gray-100"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              )}

              {nextButtonLoading === true && (
                <Button
                  className="ml-auto bg-yellow-400 text-black hover:bg-yellow-500"
                  disabled
                >
                  Processing...
                </Button>
              )}

              {nextButtonLoading === false && (
                <Button
                  onClick={currentStep < 3 ? handleNext : handleSubmit}
                  className={`${
                    currentStep === 1 ? "ml-auto" : ""
                  } bg-yellow-400 text-black hover:bg-yellow-500`}
                >
                  {currentStep < 3 ? (
                    <>
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Complete Booking"
                  )}
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
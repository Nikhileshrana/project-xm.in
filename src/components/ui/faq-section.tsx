import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How do I book a tour online?",
    answer:
      "You can book your preferred tour package through our website by selecting the destination and choosing the 'Reserve' option. You will receive an instant confirmation via email and WhatsApp.",
  },
  {
    question: "Do I need a booking voucher or printout?",
    answer:
      "No printout is required. After booking, you will receive a confirmation email and WhatsApp message with all necessary details. A valid ID proof is required at the time of check-in.",
  },
  {
    question: "What destinations do you cover?",
    answer:
      "We specialize in Agra, Rajasthan, and Delhi tours but also offer travel packages across India, covering major tourist attractions and heritage sites.",
  },
  {
    question: "Are your tours private or shared?",
    answer:
      "We offer both private and group tour packages. Private tours ensure a personalized experience, while group tours are more budget-friendly.",
  },
  {
    question: "What safety measures do you follow?",
    answer:
      "We adhere to strict safety protocols, including licensed tour guides, sanitized vehicles, and verified accommodations. All our services comply with government safety standards.",
  },
  {
    question: "Is your company government-verified?",
    answer:
      "Yes, we are a government-authorized travel company, ensuring the highest standards of quality and safety.",
  },
  {
    question: "Are you listed on TripAdvisor, Google Reviews, and Trustpilot?",
    answer:
      "Yes, we are highly rated on TripAdvisor, Google Reviews, and Trustpilot, with thousands of satisfied travelers sharing their experiences.",
  },
  {
    question: "Do you provide 24/7 customer support?",
    answer:
      "Yes, our customer support is available 24/7 to assist you with bookings, queries, and emergencies.",
  },
];

function FAQ_Section() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="default">Frequently Asked Questions</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  FAQ
                </h3>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  Get answers to your questions about booking, safety, and our services.
                </p>
              </div>
              <div>
                <Link href="/contact">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
                </Link>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={"faq-" + index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQ_Section };

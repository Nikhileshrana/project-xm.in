import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Features() {
  return (
    <div className="w-[90%] py-10 lg:py-10 mx-auto">
      <div className="container mx-auto">
        <div className="flex gap-4 py-20 flex-col items-start">
          <div>
            <Badge>Trust</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              Our Promise
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              We promise to provide you with the best travel experience possible
              with our 20+ years of Experience.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-5 h-5 mt-2" color="green" />
                <div className="flex flex-col gap-1">
                  <p>24/7 Support</p>
                  <p className="text-muted-foreground text-sm">
                    Round-the-clock assistance for all your travel needs.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-5 h-5 mt-2" color="green" />
                <div className="flex flex-col gap-1">
                  <p>Safe & Sanitized Travel</p>
                  <p className="text-muted-foreground text-sm">
                    Regularly sanitized vehicles and hotels that meet the
                    highest hygiene standards.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-5 h-5 mt-2" color="green" />
                <div className="flex flex-col gap-1">
                  <p>Full Cancellation Refund*</p>
                  <p className="text-muted-foreground text-sm">
                    Flexible booking with complete peace of mind.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-5 h-5 mt-2" color="green" />
                <div className="flex flex-col gap-1">
                  <p>Guaranteed Satisfaction</p>
                  <p className="text-muted-foreground text-sm">
                    We ensure your trip exceeds expectations.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-5 h-5 mt-2" color="green" />
                <div className="flex flex-col gap-1">
                  <p>Pan-India Coverage</p>
                  <p className="text-muted-foreground text-sm">
                    Explore all of India with our comprehensive services.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-5 h-5 mt-2" color="green" />
                <div className="flex flex-col gap-1">
                  <p>Best Price Guarantee</p>
                  <p className="text-muted-foreground text-sm">
                    Unbeatable rates compared to any other platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Features };

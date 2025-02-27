import { Check, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Pricing() {
  return (
    <div className="w-full pt-20 lg:pt-40">
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge>Comparison</Badge>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
              Why Choose Us Over Others?
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
            See how we compare to Big Players and third-party agents.
            </p>
          </div>
          <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x pt-20">
            <div className="col-span-3 lg:col-span-1"></div>
            <div className="px-3 py-1 md:px-6 md:py-4  gap-2 flex flex-col">
              <p className="text-2xl">3rd Party</p>
              <p className="text-sm text-muted-foreground">
                Skyrocketting prices and shitty services.
              </p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col">
              <p className="text-2xl">Xyz Brand</p>
              <p className="text-sm text-muted-foreground">
                Confusing and services are not up to the mark.
              </p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col">
              <p className="text-2xl">Us</p>
              <p className="text-sm text-muted-foreground">
                With 20+ years of experience, we provide the best services. FYI we have a 70% repetition rate.
              </p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1  py-4">
              <b>Features</b>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">Verified & Government Approved</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Minus className="w-5 h-5 text-muted-foreground" color="red"/>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-5 h-5 text-primary" color="green" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-5 h-5 text-primary" color="green" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">Direct Communication</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-5 h-5 text-primary" color="green" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Minus className="w-5 h-5 text-muted-foreground" color="red"/>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-5 h-5 text-primary" color="green"/>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">Trust & Authenticity</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-5 h-5 text-muted-foreground" color="red"/>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-5 h-5 text-primary" color="green"/>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-5 h-5 text-primary" color="green" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">Handpicked Hotels
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">No</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">No</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-muted-foreground text-sm">Yes</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">Expert Local Guides</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-5 h-5 text-muted-foreground" color="red" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-5 h-5 text-muted-foreground" color="red"/>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
            <Check className="w-5 h-5 text-primary" color="green"/>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">Best Price Guarantee</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-5 h-5 text-muted-foreground" color="red"/>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Minus className="w-5 h-5 text-muted-foreground" color="red"/>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-5 h-5 text-primary" color="green"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Pricing };

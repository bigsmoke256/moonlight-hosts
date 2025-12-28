import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Users, MapPin, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").regex(/^\+?256[0-9]{9}$|^0[0-9]{9}$/, "Invalid Uganda phone number format"),
  eventType: z.string().min(1, "Event type is required"),
  serviceTier: z.string().min(1, "Service tier is required"),
  eventDate: z.string().min(1, "Event date is required"),
  location: z.string().trim().min(1, "Location is required").max(200, "Location must be less than 200 characters"),
  guestCount: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num >= 1 && num <= 10000;
  }, "Guest count must be between 1 and 10,000"),
  message: z.string().max(1000, "Message must be less than 1000 characters"),
});

const BookUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    serviceTier: "",
    eventDate: "",
    location: "",
    guestCount: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = bookingSchema.parse(formData);
      
      const message = `
*Hospitality Team Request*

Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}

Event Type: ${validatedData.eventType}
Service Tier: ${validatedData.serviceTier}
Event Date: ${validatedData.eventDate}
Location: ${validatedData.location}
Guest Count: ${validatedData.guestCount}

Additional Details:
${validatedData.message || "None provided"}
      `.trim();

      const whatsappUrl = `https://wa.me/256703140409?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      toast({
        title: "Request Sent",
        description: "We'll respond within 24 hours with a tailored hospitality plan.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const serviceTiers = [
    { value: "standard", label: "Standard", description: "Professional hosting for everyday excellence" },
    { value: "executive", label: "Executive", description: "Enhanced service for premium events" },
    { value: "vip", label: "VIP", description: "Exclusive, discreet, world-class hospitality" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        
        <div className="editorial-container relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Begin Your Experience</p>
            <h1 className="text-display-sm md:text-display font-heading font-semibold mb-6">
              Request Our <span className="text-gradient-gold">Team</span>
            </h1>
            <p className="text-body-lg text-muted-foreground font-light">
              Tell us about your event. We'll craft a hospitality solution 
              that exceeds your expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding-sm">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-8 md:p-12 luxury-border animate-fade-in">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-muted-foreground text-sm">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your full name"
                          className="mt-2 bg-background border-border/50 focus:border-accent"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-muted-foreground text-sm">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="your@email.com"
                          className="mt-2 bg-background border-border/50 focus:border-accent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phone" className="text-muted-foreground text-sm">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+256 XXX XXX XXX"
                          className="mt-2 bg-background border-border/50 focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-6">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="eventType" className="text-muted-foreground text-sm">Event Type *</Label>
                        <Select
                          required
                          value={formData.eventType}
                          onValueChange={(value) => handleChange("eventType", value)}
                        >
                          <SelectTrigger className="mt-2 bg-background border-border/50">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding Ceremony</SelectItem>
                            <SelectItem value="introduction">Introduction / Kukyala</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="birthday">Birthday Celebration</SelectItem>
                            <SelectItem value="dinner">Dinner / Awards</SelectItem>
                            <SelectItem value="vip">VIP / Private Event</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="serviceTier" className="text-muted-foreground text-sm">Service Tier *</Label>
                        <Select
                          required
                          value={formData.serviceTier}
                          onValueChange={(value) => handleChange("serviceTier", value)}
                        >
                          <SelectTrigger className="mt-2 bg-background border-border/50">
                            <SelectValue placeholder="Select service level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="eventDate" className="text-muted-foreground text-sm">Event Date *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          required
                          value={formData.eventDate}
                          onChange={(e) => handleChange("eventDate", e.target.value)}
                          className="mt-2 bg-background border-border/50 focus:border-accent"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestCount" className="text-muted-foreground text-sm">Estimated Guests *</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          required
                          value={formData.guestCount}
                          onChange={(e) => handleChange("guestCount", e.target.value)}
                          placeholder="100"
                          className="mt-2 bg-background border-border/50 focus:border-accent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="location" className="text-muted-foreground text-sm">Event Location *</Label>
                        <Input
                          id="location"
                          required
                          value={formData.location}
                          onChange={(e) => handleChange("location", e.target.value)}
                          placeholder="Venue name and address"
                          className="mt-2 bg-background border-border/50 focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div>
                    <Label htmlFor="message" className="text-muted-foreground text-sm">Additional Details</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us more about your vision, special requirements, or any questions..."
                      rows={5}
                      className="mt-2 bg-background border-border/50 focus:border-accent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6"
                  >
                    Submit Request
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Response Time */}
              <div className="bg-card p-6 luxury-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <Clock className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">24-Hour Response</h3>
                <p className="text-muted-foreground text-sm font-light">
                  We respond within 24 hours with a tailored hospitality plan.
                </p>
              </div>

              {/* Free Consultation */}
              <div className="bg-card p-6 luxury-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Users className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">Free Consultation</h3>
                <p className="text-muted-foreground text-sm font-light">
                  Every inquiry includes a complimentary event planning session.
                </p>
              </div>

              {/* Nationwide */}
              <div className="bg-card p-6 luxury-border animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <MapPin className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">Nationwide Service</h3>
                <p className="text-muted-foreground text-sm font-light">
                  We serve events across Uganda with consistent excellence.
                </p>
              </div>

              {/* Direct Contact */}
              <div className="bg-accent p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Phone className="w-8 h-8 text-accent-foreground mb-4" />
                <h3 className="font-heading font-semibold text-lg text-accent-foreground mb-2">Prefer to Call?</h3>
                <p className="text-accent-foreground/80 text-sm mb-4">Available on WhatsApp</p>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/256703140409"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-accent-foreground font-semibold hover:underline"
                  >
                    0703 140 409
                  </a>
                  <a
                    href="tel:+256773179969"
                    className="block text-accent-foreground font-semibold hover:underline"
                  >
                    0773 179 969
                  </a>
                </div>
              </div>

              {/* Service Tiers */}
              <div className="bg-card p-6 luxury-border animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <h3 className="font-heading font-semibold text-lg mb-4">Service Tiers</h3>
                <div className="space-y-4">
                  {serviceTiers.map((tier, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{tier.label}</p>
                        <p className="text-muted-foreground text-xs">{tier.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookUs;

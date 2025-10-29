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
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const BookUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    location: "",
    guestCount: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `
*New Booking Request*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Type: ${formData.eventType}
Event Date: ${formData.eventDate}
Location: ${formData.location}
Guest Count: ${formData.guestCount}
Message: ${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/256703140409?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Request Sent!",
      description: "We'll get back to you shortly via WhatsApp.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary to-background">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-primary-foreground">
              Book <span className="text-accent">Our Services</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Let's make your event unforgettable. Fill out the form below and we'll get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="luxury-border animate-fade-in">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="John Doe"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="john@example.com"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+256 XXX XXX XXX"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select
                          required
                          value={formData.eventType}
                          onValueChange={(value) => handleChange("eventType", value)}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding Ceremony</SelectItem>
                            <SelectItem value="introduction">Introduction / Kukyala</SelectItem>
                            <SelectItem value="birthday">Birthday Party</SelectItem>
                            <SelectItem value="conference">Conference Meeting</SelectItem>
                            <SelectItem value="dinner">Dinner / Awards</SelectItem>
                            <SelectItem value="concert">Concert / Seminar</SelectItem>
                            <SelectItem value="burial">Burial</SelectItem>
                            <SelectItem value="festival">Festival</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="eventDate">Event Date *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          required
                          value={formData.eventDate}
                          onChange={(e) => handleChange("eventDate", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestCount">Estimated Guest Count *</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          required
                          value={formData.guestCount}
                          onChange={(e) => handleChange("guestCount", e.target.value)}
                          placeholder="100"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Event Location *</Label>
                      <Input
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="Venue name and address"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Details</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us more about your event..."
                        rows={6}
                        className="mt-2"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-primary"
                    >
                      Submit Booking Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info Cards */}
            <div className="space-y-6">
              <Card className="luxury-border hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardContent className="p-6">
                  <Calendar className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Quick Response</h3>
                  <p className="text-muted-foreground text-sm">
                    We typically respond to booking requests within 24 hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-6">
                  <Users className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Free Consultation</h3>
                  <p className="text-muted-foreground text-sm">
                    Every booking includes a complimentary planning consultation.
                  </p>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardContent className="p-6">
                  <MapPin className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Nationwide Service</h3>
                  <p className="text-muted-foreground text-sm">
                    We serve events across Uganda with the same level of excellence.
                  </p>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift bg-accent text-primary animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardContent className="p-6">
                  <Phone className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Prefer to Call?</h3>
                  <p className="text-sm mb-3">We're available on WhatsApp</p>
                  <div className="space-y-1">
                    <a
                      href="https://wa.me/256703140409"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold underline block"
                    >
                      0703 140 409
                    </a>
                    <a
                      href="tel:+256773179969"
                      className="text-sm font-semibold underline block"
                    >
                      0773 179 969
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookUs;

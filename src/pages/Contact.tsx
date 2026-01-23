import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import galleryVestBack from "@/assets/gallery-vest-back.jpg";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = contactSchema.parse(formData);
      
      // Create mailto link with validated data
      const mailtoLink = `mailto:matamabrenda@gmail.com,kobusingbarbara89@gmail.com?subject=${encodeURIComponent(
        validatedData.subject
      )}&body=${encodeURIComponent(
        `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`
      )}`;
      
      window.location.href = mailtoLink;

      toast({
        title: "Opening Email Client",
        description: "Your message is ready to send.",
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

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary to-background">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-primary-foreground">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="luxury-border animate-fade-in">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-heading font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
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
                        <Label htmlFor="email">Your Email *</Label>
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

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        placeholder="What is this regarding?"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us what you need help with..."
                        rows={8}
                        className="mt-2"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-primary"
                    >
                      <Send className="mr-2" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="luxury-border hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <CardContent className="p-6">
                  <Phone className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Available Monday - Saturday, 8am - 8pm
                  </p>
                  <div className="space-y-1">
                    <a
                      href="tel:+256703140409"
                      className="text-accent hover:underline font-semibold block"
                    >
                      0703 140 409
                    </a>
                    <a
                      href="tel:+256773179969"
                      className="text-accent hover:underline font-semibold block"
                    >
                      0773 179 969
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-6">
                  <Mail className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    We'll respond within 24 hours
                  </p>
                  <div className="space-y-1">
                    <a
                      href="mailto:matamabrenda@gmail.com"
                      className="text-accent hover:underline font-semibold block text-sm"
                    >
                      matamabrenda@gmail.com
                    </a>
                    <a
                      href="mailto:kobusingbarbara89@gmail.com"
                      className="text-accent hover:underline font-semibold block text-sm"
                    >
                      kobusingbarbara89@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardContent className="p-6">
                  <MapPin className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">Office</h3>
                  <p className="text-muted-foreground text-sm">
                    Kampala, Uganda
                    <br />
                    Plot XXX, Street Name
                    <br />
                    Building Name, Floor X
                  </p>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift bg-accent text-primary animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-3">Connect With Us</h3>
                  <div className="space-y-2">
                    <a
                      href="https://wa.me/256703140409"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="https://www.tiktok.com/@moonlighthosts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline"
                    >
                      TikTok
                    </a>
                    <a
                      href="https://www.instagram.com/moonlighthosts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline"
                    >
                      Instagram
                    </a>
                    <a
                      href="mailto:matamabrenda@gmail.com"
                      className="block hover:underline"
                    >
                      Gmail (Brenda)
                    </a>
                    <a
                      href="mailto:kobusingbarbara89@gmail.com"
                      className="block hover:underline"
                    >
                      Gmail (Barbara)
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <Card className="luxury-border animate-fade-in overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src={galleryVestBack} 
                alt="Moonlight Hosts - Graceful Welcomes, Lasting Impressions"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center pb-8">
                <div className="text-center">
                  <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">
                    Graceful Welcomes, Lasting Impressions
                  </h3>
                  <p className="text-primary-foreground/80">
                    Kampala, Uganda - At Your Service
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

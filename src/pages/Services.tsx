import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Cake,
  Briefcase,
  Award,
  Music,
  Flower,
  PartyPopper,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import galleryServiceTrays from "@/assets/gallery-service-trays.jpg";
import galleryFormalSuits from "@/assets/gallery-formal-suits.jpg";
import galleryBlackUniforms from "@/assets/gallery-black-uniforms.jpg";

const Services = () => {
  const services = [
    {
      icon: <Heart className="w-10 h-10 text-accent" />,
      title: "Introduction / Kukyala",
      description:
        "Traditional Ugandan introduction ceremonies handled with cultural sensitivity and modern elegance. Our hosts ensure every custom is honored while maintaining a smooth flow.",
      image: galleryServiceTrays,
    },
    {
      icon: <Cake className="w-10 h-10 text-accent" />,
      title: "Birthday Parties",
      description:
        "From children's birthday parties to milestone celebrations, we bring joy and professionalism to every age. Elegant hosting that lets you enjoy your special day.",
      image: galleryFormalSuits,
    },
    {
      icon: <Briefcase className="w-10 h-10 text-accent" />,
      title: "Conference Meetings",
      description:
        "Professional hosting for corporate conferences, seminars, and business meetings. We ensure your attendees feel welcomed and your event runs seamlessly.",
      image: galleryBlackUniforms,
    },
    {
      icon: <Heart className="w-10 h-10 text-accent" />,
      title: "Wedding Ceremonies",
      description:
        "Make your wedding day perfect with our elegant hosts who manage every detail. From guest reception to coordination, we ensure your celebration flows beautifully.",
      image: galleryServiceTrays,
    },
    {
      icon: <Award className="w-10 h-10 text-accent" />,
      title: "Dinners / Awards",
      description:
        "Formal dinners and award ceremonies demand sophistication. Our hosts bring the refinement and coordination needed for these prestigious events.",
      image: galleryFormalSuits,
    },
    {
      icon: <Music className="w-10 h-10 text-accent" />,
      title: "Concerts / Seminars",
      description:
        "Large-scale events require experienced coordination. We handle crowd management, guest services, and logistics with professional grace.",
      image: galleryBlackUniforms,
    },
    {
      icon: <Flower className="w-10 h-10 text-accent" />,
      title: "Burials",
      description:
        "During difficult times, we provide respectful, dignified hosting services. Our team handles logistics with sensitivity, allowing families to focus on what matters.",
      image: galleryServiceTrays,
    },
    {
      icon: <PartyPopper className="w-10 h-10 text-accent" />,
      title: "Festivals",
      description:
        "Community festivals and cultural celebrations come alive with our energetic yet professional hosting. We manage large crowds with efficiency and warmth.",
      image: galleryFormalSuits,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary to-background">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-primary-foreground">
              Our <span className="text-accent">Premium Services</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Professional hosting for every occasion - from intimate gatherings to grand celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="luxury-border hover-lift overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                  <div className="absolute bottom-4 left-6">{service.icon}</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link to="/book">
                    <Button
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-primary"
                    >
                      Book This Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              What's <span className="text-gradient-gold">Included</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every Moon Light Hosts service comes with premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Professional hosts in elegant black & gold uniforms",
              "Pre-event consultation and planning",
              "Guest reception and coordination",
              "Event flow management",
              "MC services (upon request)",
              "Professional etiquette training",
              "Flexible packages for all budgets",
              "Post-event cleanup coordination",
              "24/7 customer support",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to <span className="text-accent">Book Your Event?</span>
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how Moon Light Hosts can make your event exceptional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-lg"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-primary px-8 py-6 text-lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

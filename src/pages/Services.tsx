import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Cake,
  Briefcase,
  Award,
  Music,
  Flower,
  PartyPopper,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import galleryServiceTrays from "@/assets/gallery-service-trays.jpg";
import galleryFormalSuits from "@/assets/gallery-formal-suits.jpg";
import galleryBlackUniforms from "@/assets/gallery-black-uniforms.jpg";
import galleryRedVests from "@/assets/gallery-red-vests.jpg";
import galleryRedDresses from "@/assets/gallery-red-dresses.jpg";
import galleryMixedFormal from "@/assets/gallery-mixed-formal.jpg";
import galleryTeamFull from "@/assets/gallery-team-full.jpg";
import teamSage from "@/assets/moonlight-team-sage.jpg.asset.json";
import tableService from "@/assets/moonlight-table-service.jpg.asset.json";
import drinksService from "@/assets/moonlight-drinks-service.jpg.asset.json";
import guestUmbrella from "@/assets/moonlight-guest-umbrella.jpg.asset.json";
import menuService from "@/assets/moonlight-menu-service.jpg.asset.json";
import diningService from "@/assets/moonlight-dining-service.jpg.asset.json";

const Services = () => {
  const services = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Wedding Ceremonies",
      tagline: "Timeless Elegance",
      description: "Where love meets perfection. Our hosts ensure every moment flows with grace and every guest feels the magic.",
      image: tableService.url,
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Corporate Events",
      tagline: "Executive Precision",
      description: "Polished professionalism that reflects your brand. Conferences, galas, and business gatherings elevated.",
      image: guestUmbrella.url,
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Introduction / Kukyala",
      tagline: "Cultural Heritage",
      description: "Traditional ceremonies handled with deep cultural respect and contemporary sophistication.",
      image: drinksService.url,
    },
    {
      icon: <Cake className="w-6 h-6" />,
      title: "Birthday Celebrations",
      tagline: "Joyful Moments",
      description: "From intimate gatherings to grand celebrations, we bring warmth and elegance to every milestone.",
      image: menuService.url,
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Dinners & Awards",
      tagline: "Refined Glamour",
      description: "Formal occasions demand exceptional service. We deliver sophistication that matches the prestige.",
      image: diningService.url,
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Concerts & Seminars",
      tagline: "Crowd Excellence",
      description: "Large-scale events with seamless coordination. Managing energy while maintaining composure.",
      image: galleryMixedFormal,
    },
  ];

  const inclusions = [
    "Professionally trained hosts in premium attire",
    "Pre-event consultation and planning session",
    "Guest reception and seamless coordination",
    "Event flow management and timing",
    "MC services available upon request",
    "Post-event coordination and cleanup",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        
        <div className="editorial-container relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Services</p>
            <h1 className="text-display-sm md:text-display font-heading font-semibold mb-6">
              Experiences, Not Just <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-body-lg text-muted-foreground font-light">
              Every event is unique. Our approach is tailored, our execution flawless. 
              Discover how we transform occasions into unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Editorial Style */}
      <section className="section-padding-sm">
        <div className="editorial-container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center animate-fade-in ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className={`relative group overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="aspect-[4/3] overflow-hidden luxury-border">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover filter-editorial transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Gold Accent Corner */}
                  <div className="absolute top-0 left-0 w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-px bg-accent" />
                    <div className="absolute top-0 left-0 h-full w-px bg-accent" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16">
                    <div className="absolute bottom-0 right-0 w-full h-px bg-accent" />
                    <div className="absolute bottom-0 right-0 h-full w-px bg-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                  <div className={`flex items-center gap-3 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                    <span className="w-10 h-10 flex items-center justify-center border border-accent/30 text-accent">
                      {service.icon}
                    </span>
                    <span className="text-accent text-sm tracking-[0.2em] uppercase">{service.tagline}</span>
                  </div>
                  
                  <h2 className="text-headline font-heading font-semibold">{service.title}</h2>
                  
                  <p className="text-muted-foreground text-body-lg font-light leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Link to="/book">
                    <Button
                      variant="outline"
                      className={`border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent mt-4 ${
                        index % 2 === 1 ? "lg:ml-auto" : ""
                      }`}
                    >
                      Book This Experience
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-muted/30">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Every Booking Includes</p>
              <h2 className="text-headline font-heading font-semibold mb-8">
                The Moonlight <span className="text-gradient-gold">Promise</span>
              </h2>
              
              <div className="space-y-4">
                {inclusions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <p className="text-foreground font-light">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="aspect-square overflow-hidden luxury-border">
                <img
                  src={teamSage.url}
                  alt="Moonlight Hosts team in coordinated sage green uniforms"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/30" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="editorial-container text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Let's Create Together</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold mb-6">
              Ready to Transform Your <span className="text-gradient-gold">Event?</span>
            </h2>
            <p className="text-muted-foreground text-body-lg font-light mb-10">
              Every event deserves excellence. Let's discuss how Moonlight Hosts 
              can deliver an experience that exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6"
                >
                  Request Our Team
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent px-10 py-6"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;

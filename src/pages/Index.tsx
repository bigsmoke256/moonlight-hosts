import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Sparkles, 
  Shield, 
  HeartHandshake, 
  ArrowRight,
  Star,
  MessageSquareQuote
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VisitorRegistrationForm from "@/components/VisitorRegistrationForm";
import ShowreelSection from "@/components/ShowreelSection";
import { useVisitorRegistration } from "@/hooks/useVisitorRegistration";
import heroImage from "@/assets/hero-image.jpg";
import galleryTeamFull from "@/assets/gallery-team-full.jpg";
import galleryRedVests from "@/assets/gallery-red-vests.jpg";
import galleryFormalSuits from "@/assets/gallery-formal-suits.jpg";
import teamSage from "@/assets/moonlight-team-sage.jpg.asset.json";
import guestUmbrella from "@/assets/moonlight-guest-umbrella.jpg.asset.json";
import trayService from "@/assets/moonlight-tray-service.jpg.asset.json";

const moonlightStandards = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Precision & Timing",
      description: "Every second counts. Our hosts are trained to anticipate, not react.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Grooming & Presentation",
      description: "Immaculate appearance that reflects the elegance of your event.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Guest Psychology & Etiquette",
      description: "Understanding the unspoken needs of every guest we serve.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Confidentiality & Professionalism",
      description: "Discretion is our default. Your event, your privacy.",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Crisis-Ready Hospitality",
      description: "Calm under pressure. Solutions before problems arise.",
    },
  ];

const clientJourney = [
    {
      step: "01",
      title: "Consultation & Event Profiling",
      description: "We listen. We understand your vision, guest profile, and expectations.",
    },
    {
      step: "02",
      title: "Team Matching & Styling",
      description: "Handpicked hosts matched to your event's character and dress code.",
    },
    {
      step: "03",
      title: "Pre-Event Briefing",
      description: "Comprehensive walkthrough ensuring every detail is aligned.",
    },
    {
      step: "04",
      title: "Flawless Execution",
      description: "Seamless service from first arrival to final farewell.",
    },
    {
      step: "05",
      title: "Post-Event Review",
      description: "Feedback loop to continuously elevate our partnership.",
    },
  ];

const testimonials = [
    {
      name: "Sarah Nakato",
      role: "Bride, Kampala",
      content: "They didn't just host our wedding—they orchestrated an experience. Every guest felt like royalty.",
    },
    {
      name: "James Okello",
      role: "Corporate Director",
      content: "Impeccable. Professional. Invisible until needed. Exactly what executive events require.",
    },
    {
      name: "Grace Namuli",
      role: "Event Planner",
      content: "I've worked with many teams. None match Moonlight's attention to detail and composure.",
    },
  ];

const trustedVenues = [
    "Serena Hotel",
    "Kampala Sheraton",
    "Lake Victoria",
    "Munyonyo Resort",
    "Speke Resort",
  ];

const Index = () => {
  const { isFormOpen, closeForm } = useVisitorRegistration();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <VisitorRegistrationForm isOpen={isFormOpen} onClose={closeForm} />

      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 overlay-cinematic" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="space-y-8 animate-fade-in-up">
            {/* Accent Line */}
            <div className="flex justify-center">
              <div className="accent-line-wide" />
            </div>
            
            <h1 className="text-display-sm md:text-display font-heading font-semibold text-foreground">
              Graceful Welcomes.
              <br />
              <span className="text-gradient-gold">Lasting Impressions.</span>
            </h1>
            
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Elite hospitality for events that demand excellence. 
              We don't just serve—we elevate every moment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/book">
                <Button
                  size="lg"
                  className="btn-glossy text-accent-foreground font-medium px-8 py-6 text-base tracking-wide"
                >
                  Request Our Team
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent px-8 py-6 text-base tracking-wide"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        </div>
      </section>

      {/* The Moonlight Standard */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="absolute inset-0 glossy-aura" />
        
        <div className="editorial-container relative">
          <div className="text-center mb-16 md:mb-24 animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold mb-6">
              The Moonlight <span className="text-gradient-gold">Standard</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-body-lg font-light">
              Five pillars that define elite hospitality. The invisible framework behind every flawless event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {moonlightStandards.map((standard, index) => (
              <div
                key={index}
                className="group p-8 card-3d text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-accent/30 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                  {standard.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">{standard.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Image Section */}
      <ShowreelSection />

      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${teamSage.url})` }}
        />
        <div className="absolute inset-0 overlay-editorial" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Trusted Excellence</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold text-foreground max-w-3xl">
              Where Presence Becomes <span className="italic">Performance</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section className="section-padding bg-background">
        <div className="editorial-container">
          <div className="text-center mb-16 md:mb-24 animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">The Experience</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold mb-6">
              What Working With Us <span className="text-gradient-gold">Looks Like</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-body-lg font-light">
              A structured approach to delivering exceptional hospitality, every time.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            
            <div className="space-y-8 lg:space-y-0">
              {clientJourney.map((step, index) => (
                <div
                  key={index}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-12 animate-fade-in ${
                    index % 2 === 0 ? "" : "lg:direction-rtl"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:col-start-2 lg:pl-16"}`}>
                    <div className="card-3d p-8">
                      <span className="text-accent font-heading text-4xl font-semibold">{step.step}</span>
                      <h3 className="font-heading font-semibold text-xl mt-4 mb-3">{step.title}</h3>
                      <p className="text-muted-foreground font-light">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-muted/30">
        <div className="editorial-container">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Services</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold mb-6">
              Experiences, Not Just <span className="text-gradient-gold">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: trayService.url, title: "Wedding Ceremonies", caption: "Timeless Elegance" },
              { image: galleryFormalSuits, title: "Corporate Events", caption: "Executive Precision" },
              { image: guestUmbrella.url, title: "VIP & Private Events", caption: "Discreet Excellence" },
            ].map((service, index) => (
              <Link
                key={index}
                to="/services"
                className="group relative aspect-[3/4] overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover filter-editorial transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Gold Overlay on Hover */}
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <p className="text-accent text-xs tracking-[0.2em] uppercase mb-2">{service.caption}</p>
                  <h3 className="font-heading font-semibold text-2xl text-foreground">{service.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button
                variant="outline"
                className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent px-8 py-6"
              >
                View All Services
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="editorial-container">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Testimonials</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold">
              Words From Those <span className="text-gradient-gold">We've Served</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-3d p-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MessageSquareQuote className="w-8 h-8 text-accent/50 mb-6" />
                <p className="text-foreground/90 mb-8 italic font-light leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-heading font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted At */}
      <section className="py-16 bg-muted/20 border-y border-border/30">
        <div className="editorial-container">
          <p className="text-center text-muted-foreground text-sm tracking-[0.2em] uppercase mb-8">
            Trusted At Premier Venues
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustedVenues.map((venue, index) => (
              <span
                key={index}
                className="text-accent/60 font-heading text-lg hover:text-accent transition-colors cursor-default"
              >
                {venue}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
        </div>
        
        <div className="editorial-container relative text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-headline md:text-display-sm font-heading font-semibold mb-6">
              Ready to Elevate Your <span className="text-gradient-gold">Event?</span>
            </h2>
            <p className="text-muted-foreground text-body-lg font-light mb-10">
              Let's discuss how Moonlight Hosts can deliver an experience 
              that exceeds expectations and creates lasting impressions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button
                  size="lg"
                  className="btn-glossy text-accent-foreground px-10 py-6 text-base"
                >
                  Request Our Team
                </Button>
              </Link>
              <Link to="/vip">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent px-10 py-6 text-base"
                >
                  VIP & Private Events
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm mt-8">
              We respond within 24 hours with a tailored hospitality plan.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

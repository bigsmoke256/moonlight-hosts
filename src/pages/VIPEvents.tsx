import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import galleryFormalSuits from "@/assets/gallery-formal-suits.jpg";
import galleryBlackUniforms from "@/assets/gallery-black-uniforms.jpg";
import galleryMixedFormal from "@/assets/gallery-mixed-formal.jpg";

const VIPEvents = () => {
  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "NDA-Ready Teams",
      description: "Confidentiality is non-negotiable. Our hosts are trained in discretion and bound by strict non-disclosure protocols.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "High-Security Coordination",
      description: "Seamless integration with private security teams. We understand protocols and respect boundaries.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Discreet Presence",
      description: "Professional without being intrusive. Our hosts anticipate needs while maintaining invisible excellence.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Executive-Level Service",
      description: "Embassy-grade hospitality standards. Polished, composed, and prepared for any environment.",
    },
  ];

  const eventTypes = [
    "Private celebrity gatherings",
    "High-net-worth family celebrations",
    "Embassy and diplomatic functions",
    "Executive board retreats",
    "Confidential corporate summits",
    "Exclusive product launches",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${galleryFormalSuits})` }}
        />
        <div className="absolute inset-0 overlay-cinematic" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-6">Exclusive Services</p>
          <h1 className="text-display-sm md:text-display font-heading font-semibold mb-6">
            VIP & Private <span className="text-gradient-gold">Events</span>
          </h1>
          <p className="text-body-lg text-muted-foreground font-light max-w-2xl mx-auto">
            For events that demand the highest level of discretion, security, and excellence. 
            Where every detail matters and nothing is left to chance.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="editorial-container">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Why Choose Us</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold">
              The VIP <span className="text-gradient-gold">Difference</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-card luxury-border hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-accent/30 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Image Break */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${galleryBlackUniforms})` }}
        />
        <div className="absolute inset-0 overlay-editorial" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 animate-fade-in">
            <blockquote className="text-headline md:text-display-sm font-heading font-normal italic text-foreground max-w-3xl">
              "Discretion is our <span className="text-accent">default</span>."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section-padding bg-muted/30">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Expertise</p>
              <h2 className="text-headline font-heading font-semibold mb-8">
                Events We <span className="text-gradient-gold">Excel At</span>
              </h2>
              
              <div className="space-y-4">
                {eventTypes.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <p className="text-foreground font-light">{event}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="aspect-[4/5] overflow-hidden luxury-border">
                <img
                  src={galleryMixedFormal}
                  alt="VIP Event Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-accent/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="editorial-container">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Process</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold">
              Tailored <span className="text-gradient-gold">Approach</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Confidential Consultation", description: "Secure discussion of your requirements, protocols, and expectations." },
              { step: "02", title: "Vetted Team Selection", description: "Handpicked hosts with proven discretion and executive service experience." },
              { step: "03", title: "Seamless Execution", description: "Flawless delivery with ongoing communication and real-time coordination." },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 bg-card luxury-border text-center hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-accent font-heading text-5xl font-semibold">{item.step}</span>
                <h3 className="font-heading font-semibold text-xl mt-6 mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/20">
        <div className="editorial-container text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Private Inquiry</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold mb-6">
              Let's Discuss Your <span className="text-gradient-gold">Requirements</span>
            </h2>
            <p className="text-muted-foreground text-body-lg font-light mb-10">
              All inquiries are handled with complete confidentiality. 
              We respond within 24 hours with a personalized consultation plan.
            </p>
            <Link to="/book">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6"
              >
                Request Confidential Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VIPEvents;

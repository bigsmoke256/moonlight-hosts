import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Award, Heart, ArrowRight, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";
import weddingService from "@/assets/wedding-service.jpg";
import conferenceService from "@/assets/conference-service.jpg";
import birthdayService from "@/assets/birthday-service.jpg";
import foundersTeam from "@/assets/founders-team.jpg";

const Index = () => {
  const services = [
    {
      title: "Wedding Ceremonies",
      description: "Make your special day unforgettable with our elegant hosting services.",
      image: weddingService,
    },
    {
      title: "Corporate Events",
      description: "Professional hosting for conferences, meetings, and corporate gatherings.",
      image: conferenceService,
    },
    {
      title: "Birthday Parties",
      description: "Celebrate life's moments with grace and style.",
      image: birthdayService,
    },
  ];

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: "Luxury Service",
      description: "Premium hospitality with attention to every detail.",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Professional Team",
      description: "Trained hosts in elegant uniforms ready to serve.",
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: "Award Winning",
      description: "Recognized for excellence in event hosting.",
    },
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Memorable Experiences",
      description: "Creating lasting impressions for you and your guests.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Nakato",
      role: "Bride",
      content: "Moon Light Hosts made our wedding absolutely perfect. Their professionalism and grace were outstanding.",
    },
    {
      name: "James Okello",
      role: "Corporate Manager",
      content: "We've used their services for multiple events. Always impeccable, always professional.",
    },
    {
      name: "Grace Namuli",
      role: "Event Organizer",
      content: "The best hosting service in Uganda. Their attention to detail is unmatched.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-primary-foreground">
            Graceful Welcomes.
            <br />
            <span className="text-gradient-gold">Lasting Impressions.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-body">
            Premium hospitality and event hosting services that elevate every occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary font-body px-8 py-6 text-lg"
              >
                Book Our Services <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-primary font-body px-8 py-6 text-lg"
              >
                <Phone className="mr-2" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Why Choose <span className="text-gradient-gold">Moon Light Hosts</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring elegance, professionalism, and warmth to every event we host.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="luxury-border hover-lift bg-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Meet Our <span className="text-gradient-gold">Founders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The visionary leaders bringing world-class hospitality to Uganda.
            </p>
          </div>

          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card className="luxury-border hover-lift overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={foundersTeam}
                  alt="Moon Light Hosts Founders"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Our <span className="text-gradient-gold">Premium Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we host with excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-lift luxury-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                View All Services <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              What Our <span className="text-accent">Clients Say</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Don't just take our word for it - hear from those we've served.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-card/5 border-accent/20 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <p className="text-primary-foreground/90 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-heading font-semibold text-accent">{testimonial.name}</p>
                    <p className="text-sm text-primary-foreground/70">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary via-primary to-accent/20">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Ready to Create <span className="text-accent">Unforgettable Moments?</span>
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let Moon Light Hosts bring elegance and professionalism to your next event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-lg"
              >
                Get a Quote
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

export default Index;

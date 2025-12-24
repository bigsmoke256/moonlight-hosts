import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import galleryTeamFull from "@/assets/gallery-team-full.jpg";
import galleryRedVests from "@/assets/gallery-red-vests.jpg";
import galleryRedDresses from "@/assets/gallery-red-dresses.jpg";
import galleryMixedFormal from "@/assets/gallery-mixed-formal.jpg";

const About = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: "Luxury",
      description: "We deliver premium service that exceeds expectations at every turn.",
    },
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: "Professionalism",
      description: "Our trained team maintains the highest standards of hospitality.",
    },
    {
      icon: <Eye className="w-8 h-8 text-accent" />,
      title: "Grace",
      description: "Elegant, warm welcomes that create lasting impressions.",
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
              About <span className="text-accent">Moon Light Hosts</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Where elegance meets professionalism in the art of hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img
                src={galleryTeamFull}
                alt="Moonlight Hosts Team"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-heading font-bold mb-6">
                Our <span className="text-gradient-gold">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Moon Light Hosts was founded with a singular vision: to redefine hospitality
                  in Uganda by bringing world-class event hosting services to every celebration.
                </p>
                <p>
                  What started as a passion for creating memorable experiences has grown into
                  Uganda's premier hospitality and event hosting company. Our team of
                  professionally trained hosts in elegant black and gold uniforms has become
                  synonymous with excellence.
                </p>
                <p>
                  From intimate family gatherings to grand corporate events, we've had the
                  privilege of serving thousands of satisfied clients who trust us to make
                  their special moments truly unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="luxury-border hover-lift animate-fade-in">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide exceptional hospitality services that transform every event into
                  an elegant, seamless, and memorable experience. We are committed to delivering
                  professional hosting that exceeds expectations and creates lasting impressions.
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-border hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-8">
                <Eye className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-heading font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become East Africa's leading hospitality and event hosting company,
                  recognized for our unwavering commitment to luxury, professionalism, and grace.
                  We envision a future where every celebration is elevated by our presence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Meet Our <span className="text-gradient-gold">Founders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The visionary leaders behind Moon Light Hosts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="luxury-border hover-lift animate-fade-in overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={galleryRedVests}
                  alt="Moonlight Hosts Red Vests Team"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>

            <Card className="luxury-border hover-lift animate-fade-in overflow-hidden" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-0">
                <img
                  src={galleryRedDresses}
                  alt="Moonlight Hosts Elegant Team"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="luxury-border hover-lift overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={galleryMixedFormal}
                  alt="Moonlight Hosts Full Team"
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Our <span className="text-gradient-gold">Core Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="luxury-border hover-lift text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-2xl font-heading font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-5xl font-heading font-bold text-accent mb-2">500+</div>
              <p className="text-primary-foreground/80">Events Hosted</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-5xl font-heading font-bold text-accent mb-2">50+</div>
              <p className="text-primary-foreground/80">Professional Hosts</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-5xl font-heading font-bold text-accent mb-2">98%</div>
              <p className="text-primary-foreground/80">Client Satisfaction</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-5xl font-heading font-bold text-accent mb-2">5+</div>
              <p className="text-primary-foreground/80">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

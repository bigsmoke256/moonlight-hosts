import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import galleryRedVests from "@/assets/gallery-red-vests.jpg";
import galleryRedDresses from "@/assets/gallery-red-dresses.jpg";
import galleryMixedFormal from "@/assets/gallery-mixed-formal.jpg";

const Founders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary to-background">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-primary-foreground">
              Our <span className="text-accent">Founders</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              The visionary leaders who built Moonlight Hosts from the ground up.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              A Vision of <span className="text-gradient-gold">Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Moonlight Hosts was born from a shared passion for redefining hospitality in Uganda. 
              Our founders envisioned a company where every guest interaction would be marked by 
              grace, professionalism, and an unwavering commitment to excellence. Today, that 
              vision has become a reality, serving hundreds of prestigious events across the nation.
            </p>
          </div>

          {/* Founders Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="luxury-border hover-lift animate-fade-in overflow-hidden group">
              <CardContent className="p-0 relative">
                <img
                  src={galleryRedVests}
                  alt="Moonlight Hosts Founding Team"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>

            <Card className="luxury-border hover-lift animate-fade-in overflow-hidden group" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-0 relative">
                <img
                  src={galleryRedDresses}
                  alt="Moonlight Hosts Leadership"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="luxury-border hover-lift overflow-hidden group">
              <CardContent className="p-0 relative">
                <img
                  src={galleryMixedFormal}
                  alt="Moonlight Hosts Full Founding Team"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                The Founding <span className="text-gradient-gold">Philosophy</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="luxury-border hover-lift animate-fade-in text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-heading font-bold text-accent mb-4">01</div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Excellence First</h3>
                  <p className="text-muted-foreground text-sm">
                    Every detail matters. From uniform presentation to guest interaction, 
                    we set the standard for hospitality excellence.
                  </p>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift animate-fade-in text-center" style={{ animationDelay: "0.1s" }}>
                <CardContent className="p-8">
                  <div className="text-4xl font-heading font-bold text-accent mb-4">02</div>
                  <h3 className="text-xl font-heading font-semibold mb-3">People Matter</h3>
                  <p className="text-muted-foreground text-sm">
                    Our team is our greatest asset. We invest in training, development, 
                    and creating a culture of pride and professionalism.
                  </p>
                </CardContent>
              </Card>

              <Card className="luxury-border hover-lift animate-fade-in text-center" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-8">
                  <div className="text-4xl font-heading font-bold text-accent mb-4">03</div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Legacy Building</h3>
                  <p className="text-muted-foreground text-sm">
                    We're not just hosting events—we're building a legacy of 
                    world-class hospitality in East Africa.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <blockquote className="text-2xl md:text-3xl font-heading italic mb-6">
              "We didn't just start a company—we started a movement to elevate 
              hospitality standards across Uganda."
            </blockquote>
            <p className="text-accent font-medium">— The Founders, Moonlight Hosts</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Founders;

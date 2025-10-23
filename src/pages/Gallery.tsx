import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import weddingService from "@/assets/wedding-service.jpg";
import conferenceService from "@/assets/conference-service.jpg";
import birthdayService from "@/assets/birthday-service.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import heroImage from "@/assets/hero-image.jpg";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const images = [
    { src: weddingService, category: "wedding", title: "Elegant Wedding Ceremony" },
    { src: conferenceService, category: "corporate", title: "Corporate Conference" },
    { src: birthdayService, category: "party", title: "Birthday Celebration" },
    { src: aboutTeam, category: "team", title: "Our Professional Team" },
    { src: heroImage, category: "wedding", title: "Grand Entrance" },
    { src: weddingService, category: "wedding", title: "Wedding Reception" },
    { src: conferenceService, category: "corporate", title: "Business Meeting" },
    { src: birthdayService, category: "party", title: "Party Hosting" },
  ];

  const filters = [
    { label: "All", value: "all" },
    { label: "Weddings", value: "wedding" },
    { label: "Corporate", value: "corporate" },
    { label: "Parties", value: "party" },
    { label: "Team", value: "team" },
  ];

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary to-background">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-primary-foreground">
              Our <span className="text-accent">Gallery</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Moments of elegance captured at events we've had the privilege to host.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.value)}
                className={
                  activeFilter === filter.value
                    ? "bg-accent text-primary hover:bg-accent/90"
                    : "border-accent text-accent hover:bg-accent hover:text-primary"
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg luxury-border hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-heading font-semibold text-primary-foreground">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;

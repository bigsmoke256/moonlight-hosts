import { useState } from "react";
import { X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import galleryTeamFull from "@/assets/gallery-team-full.jpg";
import galleryServiceTrays from "@/assets/gallery-service-trays.jpg";
import galleryVestBack from "@/assets/gallery-vest-back.jpg";
import galleryRedVests from "@/assets/gallery-red-vests.jpg";
import galleryRedDresses from "@/assets/gallery-red-dresses.jpg";
import galleryFormalSuits from "@/assets/gallery-formal-suits.jpg";
import galleryMixedFormal from "@/assets/gallery-mixed-formal.jpg";
import galleryBlackUniforms from "@/assets/gallery-black-uniforms.jpg";
import galleryTeamSix from "@/assets/gallery-team-six.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const images = [
    { src: galleryTeamFull, title: "Elite Team", caption: "The Moonlight Standard" },
    { src: galleryServiceTrays, title: "Service Excellence", caption: "Precision in Motion" },
    { src: galleryVestBack, title: "Graceful Presence", caption: "Where Elegance Begins" },
    { src: galleryRedVests, title: "Corporate Precision", caption: "Executive Hospitality" },
    { src: galleryRedDresses, title: "Wedding Poise", caption: "Timeless Elegance" },
    { src: galleryFormalSuits, title: "VIP Protocol", caption: "Discreet Excellence" },
    { src: galleryMixedFormal, title: "Team Unity", caption: "Collective Perfection" },
    { src: galleryBlackUniforms, title: "Classic Standards", caption: "Refined Professionalism" },
    { src: galleryTeamSix, title: "Event Ready", caption: "Prepared for Excellence" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        
        <div className="editorial-container relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Portfolio</p>
            <h1 className="text-display-sm md:text-display font-heading font-semibold mb-6">
              Moments of <span className="text-gradient-gold">Excellence</span>
            </h1>
            <p className="text-body-lg text-muted-foreground font-light">
              A curated collection capturing the essence of elite hospitality. 
              Every frame tells a story of grace, precision, and unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Gallery Grid */}
      <section className="section-padding-sm">
        <div className="editorial-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="group relative cursor-pointer overflow-hidden animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  aspectRatio: index === 0 || index === 4 ? '4/5' : '3/4'
                }}
              >
                {/* Image with B&W filter */}
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover filter-editorial transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Gold overlay on hover */}
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Caption */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-accent text-xs tracking-[0.2em] uppercase mb-1">{image.caption}</p>
                  <h3 className="font-heading font-semibold text-xl text-foreground">{image.title}</h3>
                </div>
                
                {/* Corner accents on hover */}
                <div className="absolute top-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-px bg-accent" />
                  <div className="absolute top-0 left-0 h-full w-px bg-accent" />
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-accent" />
                  <div className="absolute bottom-0 right-0 h-full w-px bg-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding bg-muted/20">
        <div className="editorial-container">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="accent-line-wide mx-auto mb-8" />
            <blockquote className="text-headline md:text-display-sm font-heading font-normal italic text-foreground/90 mb-8">
              "Where presence becomes performance."
            </blockquote>
            <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm">— Moonlight Hosts</p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="lightbox-overlay animate-fade-in-slow"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center text-foreground hover:text-accent transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="lightbox-content">
            <div className="relative max-w-5xl max-h-[90vh] animate-scale-in">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <h3 className="font-heading font-semibold text-xl text-foreground">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/30">
      {/* Main Footer */}
      <div className="editorial-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-2xl font-heading font-semibold">
                <span className="text-accent">Moon</span>light Hosts
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">
              Where presence becomes performance. Elite hospitality for events that demand excellence.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/moonlighthosts256/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-border/50 text-muted-foreground hover:text-accent hover:border-accent transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/256703140409"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-border/50 text-muted-foreground hover:text-accent hover:border-accent transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-accent mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Gallery", path: "/gallery" },
                { name: "VIP Events", path: "/vip" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-accent mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Wedding Ceremonies</li>
              <li>Corporate Events</li>
              <li>VIP & Private Events</li>
              <li>Introductions</li>
              <li>Celebrations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-wider uppercase text-accent mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <a href="tel:+256703140409" className="text-muted-foreground hover:text-accent transition-colors block">
                    0703 140 409
                  </a>
                  <a href="tel:+256773179969" className="text-muted-foreground hover:text-accent transition-colors block">
                    0773 179 969
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <a href="mailto:matamabrenda@gmail.com" className="text-muted-foreground text-sm hover:text-accent transition-colors">
                  matamabrenda@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="editorial-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs">
              © {currentYear} Moonlight Hosts. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs italic font-heading">
              "Moonlight Hosts — where presence becomes performance."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

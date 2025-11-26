import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Music, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground border-t border-accent/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">
              <span className="text-accent">Moon</span> Light
            </h3>
            <p className="text-sm text-muted-foreground">
              Graceful welcomes. Lasting impressions.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/moonlighthosts256/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors w-fit"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5 flex-shrink-0" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@moonlighthosts256"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors w-fit"
                aria-label="Follow us on TikTok"
              >
                <Music className="w-5 h-5 flex-shrink-0" />
                <span>TikTok</span>
              </a>
              <a
                href="https://wa.me/256703140409"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors w-fit"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Wedding Ceremonies</li>
              <li>Corporate Events</li>
              <li>Birthday Parties</li>
              <li>Conferences</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-accent">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <Phone className="w-4 h-4 mt-1 text-accent" />
                <a href="tel:+256703140409" className="hover:text-accent transition-colors">0703 140 409</a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <Phone className="w-4 h-4 mt-1 text-accent" />
                <a href="tel:+256773179969" className="hover:text-accent transition-colors">0773 179 969</a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <Mail className="w-4 h-4 mt-1 text-accent" />
                <a href="mailto:matamabrenda@gmail.com" className="hover:text-accent transition-colors">matamabrenda@gmail.com</a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <Mail className="w-4 h-4 mt-1 text-accent" />
                <a href="mailto:kobusingbarbara89@gmail.com" className="hover:text-accent transition-colors">kobusingbarbara89@gmail.com</a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 mt-1 text-accent" />
                <span>Kampala, Uganda</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Moon Light Hosts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

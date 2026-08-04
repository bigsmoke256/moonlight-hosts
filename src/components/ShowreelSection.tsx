// Moonlight Hosts — Showreel section
// 15:6 Ventures — proprietary
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import showreel from "@/assets/moonlight-showreel.mp4.asset.json";
import logo from "@/assets/moonlight-logo.png.asset.json";

/**
 * Displays the real footage of the team at work inside a glossy 3D device frame.
 * Video autoplays muted (browser autoplay policy requires muted); the user can
 * unmute or pause manually.
 */
const ShowreelSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="absolute inset-0 glossy-aura" />

      <div className="editorial-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Copy */}
          <div className="animate-fade-in order-2 lg:order-1">
            <img
              src={logo.url}
              alt="Moonlight Hosts logo"
              className="h-20 md:h-24 w-auto mb-8 logo-3d"
              loading="lazy"
            />
            <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">The Work We Do</p>
            <h2 className="text-headline md:text-display-sm font-heading font-semibold mb-6">
              See Our Hosts <span className="text-gradient-gold">In Motion</span>
            </h2>
            <p className="text-muted-foreground text-body-lg font-light mb-8 max-w-xl">
              Real footage from real events. Composure, precision and grace — the
              Moonlight standard as it actually looks on the floor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/gallery">
                <Button size="lg" className="btn-glossy text-accent-foreground px-8 py-6">
                  View The Gallery
                </Button>
              </Link>
              <Link to="/book">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent px-8 py-6"
                >
                  Request Our Team
                </Button>
              </Link>
            </div>
          </div>

          {/* Video in glossy 3D frame */}
          <div className="order-1 lg:order-2 flex justify-center perspective-deep">
            <div className="tilt-3d glass-glossy p-3 rounded-2xl w-full max-w-sm">
              <div className="relative overflow-hidden rounded-xl bg-black">
                <video
                  ref={videoRef}
                  src={showreel.url}
                  className="w-full h-auto aspect-[9/16] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-0 gloss-sheen rounded-xl" />

                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={togglePlay}
                    aria-label={playing ? "Pause video" : "Play video"}
                    className="w-10 h-10 rounded-full glass-glossy flex items-center justify-center text-foreground hover:text-accent transition-colors"
                  >
                    {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="w-10 h-10 rounded-full glass-glossy flex items-center justify-center text-foreground hover:text-accent transition-colors"
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;
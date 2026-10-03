import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background image + gradient overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(12,12,12,0.55), rgba(12,12,12,0.85)), url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80')",
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow reveal is-visible">
            Fine Dining & Modern Artistry
          </span>

          <h1 className="display-1 reveal is-visible reveal-delay-1 mt-4">
            Where Flavors
            <br />
            Meet Elegance
          </h1>

          <p className="lead reveal is-visible reveal-delay-2 mx-auto mt-6">
            {SITE.description}
          </p>

          <div className="reveal is-visible reveal-delay-3 mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/menu" size="lg">
              Explore Menu
            </Button>
            <Button href="/about" variant="outline" size="lg">
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about-preview"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] md:block"
      >
        <span className="block h-12 w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent" />
      </a>
    </section>
  );
}

import contactHero from "../../assets/contactHero.png";

function ContactHero() {
  return (
    <section
      className="relative isolate w-full min-h-64 sm:min-h-80 lg:min-h-96 flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${contactHero})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />

      <div className="w-full flex flex-col items-start gap-3 px-4 lg:px-20 py-10">
        <span className="eyebrow text-white/80!">Contact us</span>
        <p className="text-5xl sm:text-5xl lg:text-7xl text-left text-white! font-extrabold">
          Talk to our engineers
        </p>
        <p className="max-w-xl text-left text-white/80!">
          Tell us about your plant and what you want to improve. We will reply
          with the next steps.
        </p>
      </div>
    </section>
  );
}

export default ContactHero;
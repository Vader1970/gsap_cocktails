import { useGSAP } from "@gsap/react";
import { openingHours, socials } from "../../constants";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Contact = () => {
  useGSAP(() => {
    // Wait for fonts to load before initializing SplitText to prevent layout shifts
    const initializeSplitText = () => {
      // Split the main heading into individual words for animation
      const titleSplit = SplitText.create("#contact h2", { type: "words" });

      // Set initial state to ensure elements are visible before animation
      gsap.set("#contact h3, #contact p", { opacity: 1 });

      // Create scroll-triggered animation timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact", // Element that triggers the animation
          start: "top center", // Animation starts when top of element hits center of viewport
        },
        ease: "power1.inOut", // Smooth easing for all animations in timeline
      });

      // Create a three-stage animation sequence
      timeline
        // Stage 1: Animate title words sliding up from bottom with stagger effect
        .from(titleSplit.words, {
          opacity: 0,
          yPercent: 100, // Start 100% below final position
          stagger: 0.02, // 20ms delay between each word
        })
        // Stage 2: Animate contact information (headings and paragraphs) sliding up
        .fromTo(
          "#contact h3, #contact p",
          {
            opacity: 0,
            yPercent: 100, // Start 100% below final position
          },
          {
            opacity: 1,
            yPercent: 0, // End at normal position
            stagger: 0.02, // 20ms delay between each element
          }
        )
        // Stage 3: Animate decorative leaf elements moving up
        .to("#f-right-leaf", {
          y: "-50", // Move up 50px
          duration: 1,
          ease: "power1.inOut",
        })
        // Stage 4: Animate left leaf simultaneously with right leaf
        .to(
          "#f-left-leaf",
          {
            y: "-50", // Move up 50px
            duration: 1,
            ease: "power1.inOut",
          },
          "<" // Start at the same time as previous animation
        );
    };

    // Check if fonts are already loaded to prevent SplitText measurement issues
    if (document.fonts && document.fonts.ready) {
      // Wait for all fonts to load before initializing animations
      document.fonts.ready.then(() => {
        initializeSplitText();
      });
    } else {
      // Fallback for browsers that don't support document.fonts API
      setTimeout(() => {
        initializeSplitText();
      }, 100);
    }
  });

  return (
    <footer id="contact">
      {/* Decorative leaf elements that animate during scroll */}
      <img
        src="/images/footer-right-leaf.webp"
        alt="leaf-right"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.webp"
        alt="leaf-left"
        id="f-left-leaf"
      />

      {/* Main contact information container */}
      <div className="content">
        {/* Section title that animates with SplitText */}
        <h2>Where to Find Us</h2>

        {/* Location information section */}
        <div>
          <h3>Visit Our Bar</h3>
          <p>28 Cathedral Street, Christchurch City, New Zealand</p>
        </div>

        {/* Contact details section */}
        <div>
          <h3>Contact Us</h3>
          <p>(03) 9999 9999</p>
          <p>hello@velvetpour.com</p>
        </div>

        {/* Opening hours section - dynamically rendered from constants */}
        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>

        {/* Social media links section */}
        <div>
          <h3>Socials</h3>

          {/* Social media icons with proper accessibility */}
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;

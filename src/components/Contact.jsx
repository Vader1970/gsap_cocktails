import { useGSAP } from "@gsap/react";
import { openingHours, socials } from "../../constants";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Contact = () => {
  useGSAP(() => {
    // Wait for fonts to load before initializing SplitText
    const initializeSplitText = () => {
      const titleSplit = SplitText.create("#contact h2", { type: "words" });

      // Set initial state to ensure elements are visible
      gsap.set("#contact h3, #contact p", { opacity: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top center",
        },
        ease: "power1.inOut",
      });

      timeline
        .from(titleSplit.words, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.02,
        })
        .fromTo(
          "#contact h3, #contact p",
          {
            opacity: 0,
            yPercent: 100,
          },
          {
            opacity: 1,
            yPercent: 0,
            stagger: 0.02,
          }
        )
        .to("#f-right-leaf", {
          y: "-50",
          duration: 1,
          ease: "power1.inOut",
        })
        .to(
          "#f-left-leaf",
          {
            y: "-50",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        );
    };

    // Check if fonts are already loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        initializeSplitText();
      });
    } else {
      // Fallback for browsers that don't support document.fonts
      setTimeout(() => {
        initializeSplitText();
      }, 100);
    }
  });

  return (
    <footer id="contact">
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

      <div className="content">
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>28 Cathedral Street, Christchurch City, New Zealand</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>(03) 9999 9999</p>
          <p>hello@velvetpour.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>

        <div>
          <h3>Socials</h3>

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

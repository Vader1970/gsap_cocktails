import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  // Reference to the background video element
  const videoRef = useRef();

  // Detect if user is on mobile device for responsive animations
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // Wait for fonts to load before initializing SplitText to prevent layout shifts
    const initializeSplitText = () => {
      // Split the main title into individual characters and words for animation
      const heroSplit = new SplitText(".title", { type: "chars, words" });
      // Split subtitle paragraphs into lines for animation
      const paragraghSplit = new SplitText(".subtitle", { type: "lines" });

      // Add gradient styling to each character in the title
      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

      // Remove any aria-label attributes that SplitText might add to p elements
      // This prevents accessibility issues with prohibited ARIA attributes
      paragraghSplit.lines.forEach((line) => {
        if (line.hasAttribute("aria-label")) {
          line.removeAttribute("aria-label");
        }
      });

      // Also remove aria-label from the original subtitle elements
      document.querySelectorAll(".subtitle").forEach((element) => {
        if (element.hasAttribute("aria-label")) {
          element.removeAttribute("aria-label");
        }
      });

      // Set up a MutationObserver to catch any aria-label attributes added later
      // This ensures accessibility compliance even if GSAP adds attributes dynamically
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "aria-label"
          ) {
            const target = mutation.target;
            if (
              target.classList.contains("subtitle") ||
              target.closest(".subtitle")
            ) {
              target.removeAttribute("aria-label");
            }
          }
        });
      });

      // Observe all subtitle elements for attribute changes
      document.querySelectorAll(".subtitle").forEach((element) => {
        observer.observe(element, {
          attributes: true,
          attributeFilter: ["aria-label"],
        });
      });

      // Animate title characters sliding up from bottom with stagger effect
      gsap.from(heroSplit.chars, {
        yPercent: 100, // Start 100% below final position
        duration: 1.8, // 1.8 second animation
        ease: "expo.out", // Smooth exponential easing
        stagger: 0.06, // 60ms delay between each character
      });

      // Animate subtitle lines sliding up with delay after title
      gsap.from(paragraghSplit.lines, {
        opacity: 0,
        yPercent: 100, // Start 100% below final position
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06, // 60ms delay between each line
        delay: 1, // Start 1 second after title animation begins
      });
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

    // Create scroll-triggered parallax animation for decorative leaf elements
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero", // Element that triggers the animation
          start: "top top", // Animation starts when top of element hits top of viewport
          end: "bottom top", // Animation ends when bottom of element hits top of viewport
          scrub: true, // Animation is tied directly to scroll position
        },
      })
      .to(".right-leaf", { y: 200 }, 0) // Right leaf moves down 200px
      .to(".left-leaf", { y: -200 }, 0); // Left leaf moves up 200px

    // Set different animation values for mobile vs desktop
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    // Create video animation timeline with scroll-triggered playback
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video", // Video element that triggers the animation
        start: startValue, // Animation starts at different points for mobile/desktop
        end: endValue, // Animation ends at different points for mobile/desktop
        scrub: true, // Video playback is tied to scroll position
        pin: true, // Pin the video element in place during animation
      },
    });

    // Set up video playback to sync with scroll position
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration, // Play from start to end of video
      });
    };
  }, []);

  return (
    <>
      {/* Main hero section */}
      <section id="hero">
        {/* Main title that animates with SplitText character-by-character */}
        <h1 className="title">MOJITO</h1>

        {/* Decorative leaf elements with parallax scroll animation */}
        <img
          src="/images/hero-left-leaf.webp"
          alt="left-leaf"
          className="left-leaf"
        />

        <img
          src="/images/hero-right-leaf.webp"
          alt="right-leaf"
          className="right-leaf"
        />

        {/* Main content area */}
        <div className="body">
          <div className="content">
            {/* Desktop-only content with tagline and subtitle */}
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit
                <br />
                of Summer
              </p>
            </div>

            {/* Call-to-action section with description and link */}
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      {/* Background video that plays based on scroll position */}
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;

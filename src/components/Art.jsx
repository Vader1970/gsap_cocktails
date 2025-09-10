import { useGSAP } from "@gsap/react";
import { goodLists, featureLists } from "../../constants";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

const Art = () => {
  // Detect if user is on mobile device for responsive animations
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // Set different animation start points for mobile vs desktop
    const start = isMobile ? "top 20%" : "top top";

    // Create a scroll-triggered timeline with pinning effect
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art", // Element that triggers the animation
        start, // Animation starts when element reaches this position
        end: "bottom center", // Animation ends when bottom of element hits center
        scrub: 1.5, // Smooth scrubbing effect tied to scroll position
        pin: true, // Pin the element in place during animation
      },
    });

    // Create a three-stage animation sequence
    maskTimeline
      // Stage 1: Fade out initial content (title and feature lists)
      .to(".will-fade", {
        opacity: 0,
        stagger: 0.2, // 200ms delay between each element
        ease: "power1.inOut",
      })
      // Stage 2: Scale up and reveal the cocktail image with mask effect
      .to(".masked-img", {
        scale: 1.3, // Zoom in the image
        maskPosition: "center", // Center the mask effect
        maskSize: "400%", // Large mask size for reveal effect
        duration: 1,
        ease: "power1.inOut",
      })
      // Stage 3: Fade in the final content overlay
      .to("#masked-content", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      });
  });

  return (
    <div id="art">
      {/* Main container with responsive padding and full height */}
      <div className="container mx-auto h-full pt-20">
        {/* Section title that fades out during animation */}
        <h2 className="will-fade">The ART</h2>

        {/* Three-column layout: features, image, features */}
        <div className="content">
          {/* Left column - First set of features with checkmarks */}
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <img src="/images/check.webp" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          {/* Center column - Main cocktail image with mask effect */}
          <div className="cocktail-img">
            <img
              src="/images/under-img.webp"
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
              loading="lazy"
              decoding="async"
              width="810"
              height="540"
            />
          </div>

          {/* Right column - Second set of features with checkmarks */}
          <ul className="space-y-4 will-fade">
            {featureLists.map((feature, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <img src="/images/check.webp" alt="check" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom section - Content that appears after mask animation */}
        <div className="masked-container">
          <h2 className="will-fade">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p>
              This isn't just a drink. It's a carefully crafted moment made just
              for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;

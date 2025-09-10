import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const About = () => {
  useGSAP(() => {
    // Wait for fonts to load before initializing SplitText to prevent layout shifts
    const initializeSplitText = () => {
      // Split the main heading into individual words for animation
      const titleSplit = SplitText.create("#about h2", {
        type: "words",
      });

      // Set initial state for elements that will be animated
      // Hide rating section and grid images initially
      gsap.set(".rating-section", { opacity: 0 });
      gsap.set(".top-grid div, .bottom-grid div", { opacity: 0 });

      // Create scroll-triggered animation timeline
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#about", // Element that triggers the animation
          start: "top center", // Animation starts when top of element hits center of viewport
        },
      });

      // Animate elements in sequence
      scrollTimeline
        // 1. Animate title words sliding up from bottom with stagger effect
        .from(titleSplit.words, {
          opacity: 0,
          duration: 1,
          yPercent: 100, // Start 100% below final position
          ease: "expo.out", // Smooth easing curve
          stagger: 0.02, // 20ms delay between each word
        })
        // 2. Fade in rating section (stars, customer count, profile images)
        .to(
          ".rating-section",
          {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.5" // Start 0.5 seconds before previous animation ends (overlap)
        )
        // 3. Fade in grid images with stagger effect
        .to(
          ".top-grid div, .bottom-grid div",
          {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
            stagger: 0.04, // 40ms delay between each grid item
          },
          "-=0.5" // Start 0.5 seconds before previous animation ends (overlap)
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
    <div id="about">
      {/* Main content container with responsive padding */}
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          {/* Left column - Main heading and badge */}
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>{" "}
              from muddle to garnish
            </h2>
          </div>

          {/* Right column - Description and rating section */}
          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail - from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            {/* Rating section with stars, score, and customer profiles */}
            <div className="rating-section">
              <div className="rating-content">
                {/* Star Rating - 4 filled stars, 1 empty */}
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-white" : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Rating score and customer count */}
                <p className="md:text-3xl text-xl font-bold">
                  <span>4.5</span>/5
                </p>
                <p className="text-sm text-white-100">
                  More than +12000 customers
                </p>
              </div>

              {/* Vertical divider line */}
              <div className="divider"></div>

              {/* Customer profile images section */}
              <div className="profile-section">
                <div className="profile-images">
                  {[1, 2, 3, 4].map((num) => (
                    <img
                      key={num}
                      src={`/images/profile${num}.webp`}
                      alt={`Customer ${num}`}
                      className="profile-img"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top row of image grid - 3 columns on desktop */}
      <div className="top-grid">
        {/* Left column - Small image */}
        <div className="md:col-span-3">
          <img
            src="/images/abt1.webp"
            alt="grid-img-1"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Center column - Large image */}
        <div className="md:col-span-6">
          <img
            src="/images/abt2.webp"
            alt="grid-img-2"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Right column - Small image with explicit dimensions */}
        <div className="md:col-span-3">
          <img
            src="/images/abt5.webp"
            alt="grid-img-5"
            loading="lazy"
            decoding="async"
            width="295"
            height="295"
          />
        </div>
      </div>

      {/* Bottom row of image grid - 2 columns on desktop */}
      <div className="bottom-grid">
        {/* Left column - Large image with explicit dimensions */}
        <div className="md:col-span-8">
          <img
            src="/images/abt3.webp"
            alt="grid-img-3"
            loading="lazy"
            decoding="async"
            width="810"
            height="540"
          />
        </div>

        {/* Right column - Medium image */}
        <div className="md:col-span-4">
          <img
            src="/images/abt4.webp"
            alt="grid-img-4"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

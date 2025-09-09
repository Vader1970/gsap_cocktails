import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const About = () => {
  useGSAP(() => {
    // Wait for fonts to load before initializing SplitText
    const initializeSplitText = () => {
      const titleSplit = SplitText.create("#about h2", {
        type: "words",
      });

      // Set initial state for elements that will be animated
      gsap.set(".rating-section", { opacity: 0 });
      gsap.set(".top-grid div, .bottom-grid div", { opacity: 0 });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
        },
      });

      scrollTimeline
        .from(titleSplit.words, {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: "expo.out",
          stagger: 0.02,
        })
        .to(
          ".rating-section",
          {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.5"
        )
        .to(
          ".top-grid div, .bottom-grid div",
          {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
            stagger: 0.04,
          },
          "-=0.5"
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
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>{" "}
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail - from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            <div className="rating-section">
              <div className="rating-content">
                {/* Star Rating */}
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

                {/* Rating and Customer Count */}
                <p className="md:text-3xl text-xl font-bold">
                  <span>4.5</span>/5
                </p>
                <p className="text-sm text-white-100">
                  More than +12000 customers
                </p>
              </div>

              {/* Vertical Divider */}
              <div className="divider"></div>

              {/* Profile Images */}
              <div className="profile-section">
                <div className="profile-images">
                  {[1, 2, 3, 4].map((num) => (
                    <img
                      key={num}
                      src={`/images/profile${num}.png`}
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

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.png" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.png" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.png" alt="grid-img-5" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.png" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.png" alt="grid-img-4" />
        </div>
      </div>
    </div>
  );
};

export default About;

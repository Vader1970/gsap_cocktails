import { useGSAP } from "@gsap/react";
import { cocktailLists, mockTailLists } from "../../constants";
import gsap from "gsap";

const Cocktails = () => {
  useGSAP(() => {
    // Create a scroll-triggered parallax animation for decorative leaf elements
    const parallaxTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails", // Element that triggers the animation
        start: "top 30%", // Animation starts when top of element hits 30% of viewport
        end: "bottom 80%", // Animation ends when bottom of element hits 80% of viewport
        scrub: true, // Animation is tied directly to scroll position
      },
    });

    // Animate the decorative leaf elements with parallax effect
    parallaxTimeLine
      // Left leaf moves from bottom-left to center
      .from("#c-left-leaf", {
        x: -100, // Start 100px to the left
        y: 100, // Start 100px below final position
      })
      // Right leaf moves from bottom-right to center
      .from("#c-right-leaf", {
        x: 100, // Start 100px to the right
        y: 100, // Start 100px below final position
      });
  });

  return (
    <section id="cocktails">
      {/* Decorative leaf elements with parallax animation */}
      <img
        src="/images/cocktail-left-leaf.webp"
        alt="left-leaf"
        id="c-left-leaf"
      />
      <img
        src="/images/cocktail-right-leaf.webp"
        alt="right-leaf"
        id="c-right-leaf"
      />

      {/* Main content container with two-column layout */}
      <div className="list">
        {/* Left column - Popular cocktails list */}
        <div className="popular">
          <h2>Most popular cocktails:</h2>

          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                {/* Drink information with responsive margin */}
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                {/* Price display */}
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - Popular mocktails list */}
        <div className="loved">
          <h2>Most loved mocktails:</h2>

          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                {/* Drink information with fixed margin */}
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                {/* Price display */}
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;

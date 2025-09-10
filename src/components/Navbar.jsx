import gsap from "gsap";
import { navLinks } from "../../constants/index";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  useGSAP(() => {
    // Create a scroll-triggered animation for the navbar background
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav", // Element that triggers the animation
        start: "bottom top", // Animation starts when bottom of nav hits top of viewport
      },
    });

    // Animate navbar from transparent to semi-transparent with blur effect
    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" }, // Start with transparent background
      {
        backgroundColor: "#00000050", // End with semi-transparent black background
        backdropFilter: "blur(10px)", // Add blur effect to content behind navbar
        duration: 1, // 1 second animation duration
        ease: "power1.inOut", // Smooth easing curve
      }
    );
  });

  return (
    <nav>
      <div>
        {/* Brand logo and name linking to hero section */}
        <a href="#hero" className="flex items-center gap-2">
          <img
            src="/images/logo.webp"
            alt="Velvet Pour logo"
            className="w-8 h-8 object-contain"
            width="32"
            height="32"
            loading="eager"
          />
          <p>Velvet Pour</p>
        </a>

        {/* Navigation menu with links to different sections */}
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

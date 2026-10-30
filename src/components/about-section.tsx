import Image from "next/image";
import portrait from "@/assets/photos/felipe-floresta-v2.png";
import type { Dictionary } from "@/i18n/dictionaries";

export function AboutSection({ biography, technologies, copy }: {
  biography: readonly string[];
  technologies: readonly string[];
  copy: Dictionary["about"];
}) {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title" tabIndex={-1}>
      <div className="section-container">
        <h2 id="about-title" className="section-title" data-enter="rise">{copy.title}</h2>
        <div className="about-layout">
          <div className="about-biography" data-enter="rise">
            {biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="about-portrait personal-portrait" data-enter="image">
            <Image src={portrait} alt={copy.portraitAlt} fill quality={60}
              sizes="(min-width: 1332px) 490px, (min-width: 1200px) calc(40vw - 43.2px), (min-width: 640px) 500px, (max-width: 319px) calc(100vw - 40px), 280px" />
          </div>
          <div className="about-technologies" data-enter="rise">
            <h3 id="technologies-title">{copy.technologies}</h3>
            <ul aria-labelledby="technologies-title">
              {technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import portrait from "@/assets/photos/felipe-costao-v2.png";
import { HeroParticles } from "@/components/hero-particles";
import { profile } from "@/data/profile";
import { resume } from "@/data/resume";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

export function Hero({ locale, copy, hasProjects }: { locale: Locale; copy: Dictionary["hero"]; hasProjects: boolean }) {
  return (
    <section id="intro" aria-labelledby="intro-title" tabIndex={-1} className="hero">
      <HeroParticles copy={copy.particles} />
      <div className="hero-layout">
        <div className="hero-copy" data-enter="rise">
          <p className="hero-greeting">{copy.greeting}</p>
          <h1 id="intro-title" className="hero-name">{profile.name}</h1>
          <p className="hero-role">{profile.role[locale]}</p>
          <a className="hero-action" href={resume.href} hrefLang={resume.language} type="application/pdf" download>{copy.downloadResume}</a>
        </div>
        <div className="hero-portrait personal-portrait" data-enter="portrait">
          <Image src={portrait} alt={copy.portraitAlt} fill preload quality={60}
            sizes="(min-width: 1200px) clamp(436px, calc(155svh - 372px), 701px), (min-width: 640px) 600px, (max-width: 311px) calc(170vw - 68px), 463px" />
        </div>
      </div>
      {hasProjects && <a className="hero-projects" href="#projects">
        {copy.projectsHint}
        <BsChevronDown size={20} className="shrink-0" aria-hidden="true" focusable="false" />
      </a>}
    </section>
  );
}

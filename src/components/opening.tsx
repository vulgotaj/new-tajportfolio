import { readFileSync } from "node:fs";
import { join } from "node:path";
import { OpeningAnimation } from "@/components/opening-animation";

// Inline the approved master at build time: no duplicate paths or image request to wait for.
const wordmark = readFileSync(join(process.cwd(), "public/brand/taj-wordmark.svg"), "utf8");

export function Opening() {
  return (
    <OpeningAnimation>
      <div className="opening-mark" dangerouslySetInnerHTML={{ __html: wordmark }} />
    </OpeningAnimation>
  );
}

export function Brand({ decorative = false }: { decorative?: boolean } = {}) {
  return (
    <div className="brand">
      {/* These approved exports share identical geometry; CSS selects the effective theme. */}
      {/* eslint-disable @next/next/no-img-element -- An SVG needs no raster optimization. */}
      <img className="brand-light" src="/brand/taj-wordmark-light.svg" alt={decorative ? "" : "TAJ — Felipe Tajima"} width="158" height="44" />
      <img className="brand-dark" src="/brand/taj-wordmark-dark.svg" alt={decorative ? "" : "TAJ — Felipe Tajima"} width="158" height="44" />
    </div>
  );
}

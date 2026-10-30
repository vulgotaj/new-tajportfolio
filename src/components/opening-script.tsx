// Independent of hydration: a failed/late client bundle must never leave the page covered.
const script = `(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  if (!reduced || !Element.prototype.animate || !('inert' in HTMLElement.prototype)) return;
  try {
    if (sessionStorage.getItem('taj-opening-seen')) return;
    sessionStorage.setItem('taj-opening-seen', 'true');
  } catch { return; }
  if (reduced.matches || document.hidden) return;

  const finish = () => {
    clearTimeout(deadline);
    delete root.dataset.opening;
    delete root.dataset.openingStarted;
    const content = document.getElementById('portfolio-content');
    if (content) content.inert = false;
    reduced.removeEventListener('change', onPreference);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', finish);
    window.removeEventListener('taj-opening-dismiss', finish);
    window.dispatchEvent(new Event('taj-opening-end'));
  };
  const onPreference = () => { if (reduced.matches) finish(); };
  const onVisibility = () => { if (document.hidden) finish(); };
  const deadline = setTimeout(finish, 3000);
  reduced.addEventListener('change', onPreference);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', finish);
  window.addEventListener('taj-opening-dismiss', finish);
  root.dataset.openingStarted = String(performance.now());
  root.dataset.opening = 'active';
})();`;

export function OpeningScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

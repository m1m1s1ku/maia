// MaiaApp Load handler
async function onDomLoaded(){
  await document.fonts.ready;

  const MaiaConstructor = await customElements.whenDefined('maia-app');

  const maia = new MaiaConstructor(location.pathname);
  maia.renderLoader();

  await Promise.all([
    maia.bootstrap, // Loadable components promises
    ...maia.needed.map(needed => customElements.whenDefined(needed)), // Sub-components
    maia.routing, // First-load (pathname handling)
    maia.showTime(),
  ]);
}

(() => {
  document.addEventListener('DOMContentLoaded', onDomLoaded);
})();
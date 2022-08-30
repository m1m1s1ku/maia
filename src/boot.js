// MaiaApp Load handler
(() => {
  document.addEventListener('DOMContentLoaded', async function() {
    const MaiaConstructor = await customElements.whenDefined('maia-app');
  
    const maia = new MaiaConstructor(location.pathname);
    maia.showLoader();

    await Promise.all([
      document.fonts.ready,
      maia.bootstrap, // Loadable components promises
      ...maia.needed.map(needed => customElements.whenDefined(needed)), // Sub-components
      maia.routing, // First-load (pathname handling)
      maia.showTime(),
    ]);
  });
})();
// MaiaApp Load handler
async function onDomLoaded(){
  const [fontFace, MaiaConstructor ] = await Promise.all([ 
    document.fonts.ready, 
    customElements.whenDefined('maia-app'),
  ]);

  const maia = new MaiaConstructor(location.pathname);
  maia.renderLoader();

  const font = getComputedStyle(document.documentElement).getPropertyValue('--maia-font-primary');
  const hasFonts = fontFace.check('normal small-caps 400 14px / 21px ' + font);

  if(!hasFonts) {
    console.error('Fonts partially loaded');
  }

  await Promise.all([
    maia.bootstrap, // Loadable components promises
    ...maia.needed.map(needed => customElements.whenDefined(needed)), // Sub-components
    maia.routing, // First-load (pathname handling)
  ]);

  // @todo : append maia after or before fade?
  document.body.appendChild(maia);

  const loaderFadeOutDuration = 1200;
  const fadeOut = loader.animate({
    opacity: [1, 0],
  }, loaderFadeOutDuration);

  await fadeOut.finished;
  loader.parentElement.removeChild(loader);
}

(() => {
  document.addEventListener('DOMContentLoaded', onDomLoaded);
})();
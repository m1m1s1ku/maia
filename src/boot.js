function _injectLoader(){
  const loader = document.createElement('div');
  loader.id = loader.className = 'loader';
  loader.innerHTML = '<div class="handler-content"><div id="spinner" class="spinner large"></div></div>';
  return loader;
}

async function _onDomLoaded(){
  const loader = _injectLoader();
  document.body.appendChild(loader);

  // Wait for app defined in context
  await customElements.whenDefined('maia-app');

  const promises = [];
  const maia = document.querySelector('maia-app');
  promises.push(document.fonts.ready);
  // Load needed
  promises.push(...maia.needed);
  // Bootstrap the others
  promises.push(maia.bootstrap);

  await Promise.all(promises);

  window.requestAnimationFrame(() => {
    loader.classList.add('hidden');
    loader.parentElement.removeChild(loader);
  });
}

(() => {
  document.addEventListener('DOMContentLoaded', _onDomLoaded);
})();
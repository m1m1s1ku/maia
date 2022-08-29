function _injectLoader(){
  const loader = document.createElement('div');
  loader.id = loader.className = 'loader';
  loader.innerHTML = `<div class="handler-content">
                        <div id="spinner" class="spinner large">

                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 321 78" style="enable-background:new 0 0 321 78;" xml:space="preserve">
                          <style type="text/css">
                            .st0{fill:#817B98;}
                            .st1{fill:#565757;}
                            .st2{font-family:'KotoriRose-Regular';}
                            .st3{font-size:72px;}
                          </style>
                          <g id="Layer_1_xA0_Image_00000062894247296330959190000007439648986937160096_">
                            <path class="st0" d="M32.9,75.5c-8.9-4-17.1-10-27.5-9.7c2-5.8,3.9-11.7,5.9-17.5c3.2-9.3,6.7-18.6,9.5-28c2-6.7,6.3-11,12.7-9.2
                              c8.3,2.4,15.1,7.3,10.4,18.1c-0.8,1.9,0.2,4.6,0.3,6.9c1.1-1,2.2-2.1,3.3-3c1.4-1.1,2-1.8,4.1-2.8c2.7,6.6,2.6,7.7,0.8,10.2
                              C44.8,51.5,37,62.2,33.8,75.5C33.5,75.5,33.2,75.5,32.9,75.5z"/>
                            <path class="st0" d="M81.4,66.8c8.9-4,17.1-10,27.5-9.7c-2-5.8-3.9-11.7-5.9-17.5c-3.2-9.3-6.7-18.6-9.5-28c-2-6.7-6.3-11-12.7-9.2
                              c-8.3,2.4-15.1,7.3-10.4,18.1c0.8,1.9-0.2,4.6-0.3,6.9c-1.1-1-2-2.2-3.3-3c-2-1.2-4.1-2.1-6.2-3.1c0.4,3.6-0.5,8,1.3,10.5
                              c7.6,10.9,15.5,21.6,18.7,34.9C80.8,66.8,81.1,66.8,81.4,66.8z"/>
                          </g>
                          <g id="Maia.">
                            <text transform="matrix(1 0 0 1 117.5791 72.1377)" class="st1 st2 st3">Maia.</text>
                          </g>
                          </svg>
                        
                        </div>
                      </div>`;
  return loader;
}

async function _onDomLoaded(){
  console.warn('domloaded');
  const loader = _injectLoader();
  document.body.appendChild(loader);

  /* const fadeIn = loader.animate({
    opacity: [0, 1],
  }, 300);

  await fadeIn.finished; */

  // Wait for app defined in context
  const promises = [
    document.fonts.ready,
  ];
  const MaiaConstructor = await customElements.whenDefined('maia-app');
  const maia = new MaiaConstructor();
  promises.push(maia.bootstrap, ...maia.needed.map(needed => customElements.whenDefined(needed)));
  await Promise.all(promises);

  document.body.appendChild(maia);

  const fadeOut = loader.animate({
    opacity: [1, 0],
  }, 1000);
  await fadeOut.finished.then(() => {
    loader.parentElement.removeChild(loader);
  });
}

(() => {
  document.addEventListener('DOMContentLoaded', _onDomLoaded);
})();
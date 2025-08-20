// Seleciona o elemento de fundo
    const feature = document.querySelector(".feature");

    // Obtém o tamanho inicial do background (em %)
    let zoom = parseFloat(getComputedStyle(feature).backgroundSize);
    let size = (zoom / 100) * feature.offsetWidth;

    window.addEventListener("scroll", () => {
      let fromTop = window.scrollY;
      let newSize = size - (fromTop / 3);

      if (newSize > feature.offsetWidth) {
        feature.style.backgroundSize = newSize + "px";
        feature.style.filter = `blur(${fromTop / 100}px)`;
        feature.style.opacity = 1 - ((fromTop / document.documentElement.scrollHeight) * 1.3);
      }
    });

    // Checa navegador (Chrome / Safari) - se não for, aplica "opaque"
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (!isChrome && !isSafari) {
      const opaque = document.createElement("div");
      opaque.classList.add("opaque");
      feature.appendChild(opaque);

      window.addEventListener("scroll", () => {
        opaque.style.opacity = window.scrollY / 5000;
      });
    }
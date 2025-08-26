// === Scroll entre secciones (mouse y táctil) ===
let currentSection = 0;
const sections = document.querySelectorAll('.seccion');
let isScrolling = false;

function scrollToSection(index) {
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: 'smooth' });

  // Mostrar u ocultar el menú lateral y el botón según la sección actual
  const barraLateral = document.getElementById('barraLateral');
  const menuToggle = document.querySelector('.menu-toggle');

  if (barraLateral && menuToggle) {
    if (sections[index].classList.contains('body-secundario')) {
      barraLateral.style.display = 'block';
      menuToggle.style.display = 'block'; // botón visible en secundaria
    } else {
      barraLateral.style.display = 'none';
      menuToggle.style.display = 'none'; // botón oculto en inicial
    }
  }

  setTimeout(() => isScrolling = false, 1000);
}

// --- Scroll con rueda ---
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  const section = sections[currentSection];
  const atTop = section.scrollTop === 0;
  const atBottom = Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight;

  if (e.deltaY > 0 && atBottom && currentSection < sections.length - 1) {
    currentSection++;
    scrollToSection(currentSection);
  } else if (e.deltaY < 0 && atTop && currentSection > 0) {
    currentSection--;
    scrollToSection(currentSection);
  }
});

// --- Scroll táctil (swipe) ---
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].clientY;

  if (isScrolling) return;

  const section = sections[currentSection];
  const atTop = section.scrollTop === 0;
  const atBottom = Math.ceil(section.scrollTop + section.clientHeight) >= section.scrollHeight;

  const diffY = touchStartY - touchEndY;

  if (diffY > 50 && atBottom && currentSection < sections.length - 1) {
    currentSection++;
    scrollToSection(currentSection);
  } else if (diffY < -50 && atTop && currentSection > 0) {
    currentSection--;
    scrollToSection(currentSection);
  }
}, { passive: true });


// === Mostrar/Ocultar secciones desde menú ===
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const navItems = document.querySelectorAll('.barra-lateral li[data-target]');
  const headerTitle = document.querySelector('.encabezado h1');
  const submenuToggle = document.querySelector('.submenu-toggle');
  const workSubmenu = submenuToggle.querySelector('.submenu');

  const workSubtargets = [
    "Illustration",
    "Picture_book",
    "Characters",
    "Sketches",
    "Pattern",
    "Web_Design"
  ];

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;
      sections.forEach(sec => sec.style.display = 'none');
      const selectedSection = document.getElementById(targetId);
      if (selectedSection) selectedSection.style.display = 'block';
      headerTitle.textContent = item.textContent;
      navItems.forEach(nav => nav.classList.remove('activo'));
      item.classList.add('activo');

      if (workSubtargets.includes(targetId)) {
        workSubmenu.style.display = 'block';
        submenuToggle.classList.add('abierto');
      }
    });
  });

  // Sección inicial activa
  document.getElementById('about').style.display = 'block';
  headerTitle.textContent = 'About me';

  // Toggle de submenú
  submenuToggle.addEventListener('click', (e) => {
    if (e.target.closest('ul.submenu li')) return;
    const isOpen = submenuToggle.classList.contains('abierto');
    submenuToggle.classList.toggle('abierto');
    workSubmenu.style.display = isOpen ? 'none' : 'block';
  });
});


// === Overlay para ampliar imágenes de carrusel ===
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.galeria-overlay');
  const overlayImg = document.querySelector('.galeria-ampliada');
  const closeOverlay = document.querySelector('.close-overlay');
  const nextOverlay = document.querySelector('.next-overlay');
  const prevOverlay = document.querySelector('.prev-overlay');

  let imagenes = [];
  let imagenActual = 0;

  const todasLasImagenes = document.querySelectorAll('.galeria-carrusel img');

  todasLasImagenes.forEach(img => {
    img.addEventListener('click', () => {
      const carruselActual = img.closest('.galeria-carrusel');
      imagenes = Array.from(carruselActual.querySelectorAll('img'));
      imagenActual = imagenes.indexOf(img);
      overlayImg.src = img.src;
      overlay.style.display = 'flex';
    });
  });

  closeOverlay.addEventListener('click', () => overlay.style.display = 'none');

  nextOverlay.addEventListener('click', () => {
    if (imagenes.length === 0) return;
    imagenActual = (imagenActual + 1) % imagenes.length;
    overlayImg.src = imagenes[imagenActual].src;
  });

  prevOverlay.addEventListener('click', () => {
    if (imagenes.length === 0) return;
    imagenActual = (imagenActual - 1 + imagenes.length) % imagenes.length;
    overlayImg.src = imagenes[imagenActual].src;
  });
});


// === Navegación de carrusel ===
document.addEventListener('DOMContentLoaded', () => {
  const carruseles = document.querySelectorAll('.galeria-container-carrusel');

  carruseles.forEach(container => {
    const carrusel = container.querySelector('.galeria-carrusel');
    const prevBtn = container.querySelector('.galeria-prev');
    const nextBtn = container.querySelector('.galeria-next');

    carrusel.addEventListener('wheel', e => e.preventDefault(), { passive: false });

    prevBtn.addEventListener('click', () => {
      carrusel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carrusel.scrollBy({ left: 300, behavior: 'smooth' });
    });
  });
});


// === Bloquear scroll en grillas ===
document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll('.galeria-grid');

  grids.forEach(grid => {
    grid.addEventListener('wheel', e => {
      e.preventDefault();
    }, { passive: false });
  });
});


// === Botón menú en móviles ===
document.addEventListener('DOMContentLoaded', () => {
  // === Botón menú ===
  const menuToggle = document.querySelector(".menu-toggle");
  const barraLateral = document.getElementById("barraLateral");

  menuToggle.addEventListener("click", () => {
    barraLateral.classList.toggle("activo");
  });

  // === Cerrar menú si se hace clic fuera en móviles ===
  document.addEventListener("click", (e) => {
    const esClickDentroMenu = barraLateral.contains(e.target);
    const esClickBoton = menuToggle.contains(e.target);

    if (!esClickDentroMenu && !esClickBoton && barraLateral.classList.contains("activo")) {
      barraLateral.classList.remove("activo");
    }
  });

  // === Cerrar menú al elegir una opción ===
  const navItems = document.querySelectorAll(".barra-lateral li[data-target]");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // Cerrar menú solo en móviles
      if (window.innerWidth <= 768 && barraLateral.classList.contains("activo")) {
        barraLateral.classList.remove("activo");
      }
    });
  });

});

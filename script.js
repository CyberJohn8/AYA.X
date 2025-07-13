// === Scroll entre secciones ===
let currentSection = 0;
const sections = document.querySelectorAll('.seccion');
let isScrolling = false;

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && currentSection < sections.length - 1) {
    currentSection++;
    scrollToSection(currentSection);
  } else if (e.deltaY < 0 && currentSection > 0) {
    currentSection--;
    scrollToSection(currentSection);
  }
});

function scrollToSection(index) {
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => isScrolling = false, 1000);
}

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

  document.getElementById('about').style.display = 'block';
  headerTitle.textContent = 'About me';

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


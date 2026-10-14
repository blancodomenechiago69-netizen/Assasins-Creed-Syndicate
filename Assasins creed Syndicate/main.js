/* =============================================
   ASSASSIN'S CREED SYNDICATE — main.js
   Londres, 1868
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. ANIMACIÓN DE TARJETAS DE DISTRITO
     Aparecen con retardo escalonado al entrar
     en el viewport usando IntersectionObserver
  ------------------------------------------ */
  const cards = document.querySelectorAll('.district-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const index = Array.from(cards).indexOf(el);
        setTimeout(() => el.classList.add('visible'), index * 100);
        cardObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => cardObserver.observe(card));


  /* ------------------------------------------
     2. ANIMACIÓN DE LA LÍNEA DE TIEMPO
     Los ítems se revelan en cascada cuando la
     sección entra al viewport
  ------------------------------------------ */
  const tlSection = document.querySelector('#timeline-section');

  if (tlSection) {
    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = document.querySelectorAll('.timeline-item');
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 150);
          });
          tlObserver.disconnect();
        }
      });
    }, { threshold: 0.1 });

    tlObserver.observe(tlSection);
  }


  /* ------------------------------------------
     3. PARALLAX EN LA SILUETA DEL HERO
     La ciudad se mueve más lento que el scroll
     creando profundidad de capas
  ------------------------------------------ */
  const silhouette = document.querySelector('.city-silhouette');

  if (silhouette) {
    window.addEventListener('scroll', () => {
      silhouette.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }, { passive: true });
  }


  /* ------------------------------------------
     4. SOMBRA EN LA NAV AL HACER SCROLL
     La barra de navegación gana sombra cuando
     el usuario empieza a bajar por la página
  ------------------------------------------ */
  const nav = document.querySelector('nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 80
        ? '0 4px 30px rgba(0,0,0,0.5)'
        : 'none';
    }, { passive: true });
  }


  /* ------------------------------------------
     5. HIGHLIGHT ACTIVO EN LA NAV
     Marca el enlace de la sección visible
  ------------------------------------------ */
  const sections  = document.querySelectorAll('[data-section]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.section;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive
            ? 'var(--gold-light)'
            : 'var(--text-muted)';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

});

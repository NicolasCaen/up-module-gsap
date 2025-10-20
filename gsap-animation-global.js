/**
 * Slug: gsap-animation-global
 * Nom: Gsap Animation Global
 * Description: Animations GSAP génériques pour headings, paragraphes, images, colonnes et tables.
 * Version: 1.0.0
 * Catégories: Animation, Frontend
 * Type: script
 * Install: script=assets/js/gsap
 */

document.addEventListener('DOMContentLoaded', function () {
  // Vérifier si GSAP et ScrollTrigger sont disponibles
  if (typeof gsap === 'undefined') {
    console.error('GSAP n\'est pas chargé. Les animations ne fonctionneront pas.');
    return;
  }

  if (typeof ScrollTrigger === 'undefined') {
    if (gsap.plugins && gsap.plugins.ScrollTrigger) {
      ScrollTrigger = gsap.plugins.ScrollTrigger;
    } else {
      console.error('ScrollTrigger n\'est pas chargé. Les animations ne fonctionneront pas.');
      return;
    }
  }

  // Enregistrer ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Configuration de base pour les animations
  const defaultConfig = {
    duration: 0.8,
    ease: "power2.out"
  };

  const scrollConfig = {
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none none"
  };

  // Fonction pour vérifier si un élément est dans le header ou le footer
  function isInHeaderOrFooter(element) {
    // Vérifier tous les parents de l'élément
    let parent = element.parentElement;
    while (parent) {
      // Vérifier si l'élément parent est un header ou un footer ou les classes

      const excludedTags = ['HEADER', 'FOOTER'];
      const excludedIds = ['header', 'footer'];
      const excludedClasses = [
        'header',
        'footer',
        'site-header',
        'site-footer',
        'wp-block-cover',
        'card-bien__item',
        'card-program-v2__items',
        'banner-slider__item',
        'leaflet-container'
      ];

      if (
        excludedTags.includes(parent.tagName) ||
        excludedIds.includes(parent.id) ||
        excludedClasses.some(className => parent.classList.contains(className))
      ) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  // 1. Animation pour les titres : Fade In + Slide Up (fondu avec montée)
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach((heading) => {
    // Vérifier si le titre n'est pas dans le header ou le footer
    if (!isInHeaderOrFooter(heading)) {
      gsap.set(heading, {
        y: -30,
        opacity: 0,
        immediateRender: true
      });

      gsap.to(heading, {
        y: 0,
        opacity: 1,
        duration: defaultConfig.duration,
        ease: defaultConfig.ease,
        scrollTrigger: {
          trigger: heading,
          ...scrollConfig
        }
      });
    }
  });

  // 2. Animation pour les paragraphes : Simple Fade In (fondu simple)
  const paragraphs = document.querySelectorAll('p');

  paragraphs.forEach((paragraph) => {
    // Vérifier si le paragraphe n'est pas dans le header ou le footer
    if (!isInHeaderOrFooter(paragraph)) {
      gsap.set(paragraph, {
        opacity: 0,
        immediateRender: true
      });

      gsap.to(paragraph, {
        opacity: 1,
        duration: defaultConfig.duration,
        ease: "power1.out", // Légèrement plus doux pour le texte
        scrollTrigger: {
          trigger: paragraph,
          ...scrollConfig
        }
      });
    }
  });

  const images = document.querySelectorAll('img');

  images.forEach((image) => {
    // Vérifier si le imagee n'est pas dans le header ou le footer
    if (!isInHeaderOrFooter(image)) {
      gsap.set(image, {
        y: -30,
        opacity: 0,
        immediateRender: true
      });

      gsap.to(image, {
        y: 0,
        opacity: 1,
        duration: defaultConfig.duration,
        ease: "power1.out", // Légèrement plus doux pour le texte
        scrollTrigger: {
          trigger: image,
          ...scrollConfig
        }
      });
    }
  });

  // 3. Animation pour les colonnes : Effet cascade
  const columnContainers = document.querySelectorAll('.wp-block-columns, .is-layout-flex,.card-program-v2__items');

  columnContainers.forEach((container) => {
    // Vérifier si le conteneur de colonnes n'est pas dans le header ou le footer
    if (!isInHeaderOrFooter(container)) {
      const columns = container.querySelectorAll(':scope > .wp-block-column, :scope > div');

      if (columns.length > 0) {
        gsap.set(columns, {
          y: 30,
          opacity: 0,
          immediateRender: true
        });

        gsap.to(columns, {
          y: 0,
          opacity: 1,
          duration: defaultConfig.duration,
          ease: defaultConfig.ease,
          stagger: 0.2, // Délai entre chaque colonne
          scrollTrigger: {
            trigger: container,
            ...scrollConfig
          }
        });
      }
    }
  });
  //TABLE 
  // Animation des lignes de tableau en cascade avec effet de bordure
  const tableContainers = document.querySelectorAll('table');

  tableContainers.forEach((table) => {
    // Vérifier si la table n'est pas dans le header ou le footer
    if (!isInHeaderOrFooter(table)) {
      const tableRows = table.querySelectorAll('tbody > tr');

      if (tableRows.length > 0) {
        // Sauvegarder la couleur originale de la bordure pour chaque ligne
        tableRows.forEach(row => {
          // Stocker la couleur de bordure originale
          const cells = row.querySelectorAll('td');
          if (cells.length > 0) {
            const originalBorderColor = window.getComputedStyle(cells[0]).borderBottomColor;
            row.dataset.originalBorderColor = originalBorderColor;

            // Appliquer une bordure transparente à toutes les cellules de la ligne
            cells.forEach(cell => {
              gsap.set(cell, {
                borderBottomColor: 'transparent'
              });
            });
          }
        });

        // Configuration initiale des lignes
        gsap.set(tableRows, {
          y: 10,
          opacity: 0,
          immediateRender: true
        });

        // Animation des lignes en cascade
        tableRows.forEach((row, index) => {
          const cells = row.querySelectorAll('td');
          const originalColor = row.dataset.originalBorderColor || '#DADADD'; // Couleur par défaut si non définie

          gsap.to(row, {
            y: 0,
            opacity: 1,
            duration: defaultConfig.duration,
            ease: defaultConfig.ease,
            delay: index * 0.08, // Délai basé sur l'index
            scrollTrigger: {
              trigger: table,
              ...scrollConfig
            },
            onComplete: () => {
              // Animer la bordure pour revenir à sa couleur d'origine
              gsap.to(cells, {
                borderBottomColor: originalColor,
                duration: 0.1,
                ease: "power1.inOut"
              });
            }
          });
        });
      }
    }
  });

  // Rafraîchir ScrollTrigger
  ScrollTrigger.refresh();

  console.log("Animations configurées pour les éléments du contenu principal uniquement");
});
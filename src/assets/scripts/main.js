/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Write any other JavaScript below
 */
import datosPonentes from '../data/ponentes.json';

+( function() {
  const university = "UOC";
  console.log(`Hello, ${university}!`);
} )();


// -----------------------------------------------------------------//
// NAVBAR
// -----------------------------------------------------------------//

const initNavbar = () => {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-list');
    const icon = document.getElementById('menu-icon');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            // Alternamos las clases de Tailwind
            menu.classList.toggle('hidden');
            menu.classList.toggle('menu-mobile-active');

            // Cambio de icono de FontAwesome (bars <-> xmark)
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.replace('fa-bars', 'fa-xmark');
                } else {
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });

        // Opcional: Cerrar el menú si se hace clic en un enlace (útil en One Page)
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                menu.classList.remove('menu-mobile-active');
                if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }
};

// -----------------------------------------------------------------//
// SLIDER
// -----------------------------------------------------------------//

class imageSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.sliderTrack = sliderElement.querySelector('.slider__track');
        this.slides = sliderElement.querySelectorAll('.slider__slide');
        this.prevBtn = sliderElement.querySelector('.slider__btn--prev');
        this.nextBtn = sliderElement.querySelector('.slider__btn--next');
        this.dotsContainer = sliderElement.querySelector('.slider__dots');

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoAdvanceTime = 7000;
        this.autoAdvanceInterval = null;

        // Inicializar el slider
        this.createDots();
        this.addEventListeners();
        this.startAutoAdvance();
        this.moveToSlide(0);
    }

    

    moveToSlide(index) {
        if (index < 0) {
            index = this.totalSlides - 1; 
        } else if (index >= this.totalSlides) {
            index = 0; 
        }
        this.currentIndex = index;

        
        let offset = 0; 
        for (let i = 0; i < this.currentIndex; i++) 
        {
            offset += this.slides[i].offsetWidth; 
        }
        
        this.sliderTrack.style.transform = `translateX(-${offset}px)`;
        this.updateDots();
    }
    
    nextSlide = () => {
        this.moveToSlide(this.currentIndex + 1);
    }
    
    prevSlide = () => {
        this.moveToSlide(this.currentIndex - 1);
    }

    startAutoAdvance() {
        if (this.totalSlides <= 1) return;
        clearInterval(this.autoAdvanceInterval);
        this.autoAdvanceInterval = setInterval(this.nextSlide, this.autoAdvanceTime);
    }

    stopAutoAdvance() {
        clearInterval(this.autoAdvanceInterval);
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slider__dot');
            dot.classList.toggle('slider__dot--active', index === this.currentIndex);
            dot.addEventListener('click', () => {
                this.stopAutoAdvance();
                this.moveToSlide(index);
                this.startAutoAdvance();
            });
            this.dotsContainer.appendChild(dot);
        });
    }

    updateDots() {
        this.dotsContainer.querySelectorAll('.slider__dot').forEach((dot, index) => {
            dot.classList.toggle('slider__dot--active', index === this.currentIndex);
        });
    }

    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoAdvance();
                this.prevSlide();
                this.startAutoAdvance();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoAdvance();
                this.nextSlide();
                this.startAutoAdvance();
            });
        }
        
        this.slider.addEventListener('mouseenter', this.stopAutoAdvance);
        this.slider.addEventListener('mouseleave', this.startAutoAdvance);
    }
}

// -----------------------------------------------------------------//
// INICIALIZACIÓN COMPONENTES
// -----------------------------------------------------------------//
const initApp = () => {

    initNavbar();

    const allSliders = document.querySelectorAll('.slider'); //Collect de todos los sliders de la pagina
    
    allSliders.forEach(sliderElement => {
        new imageSlider(sliderElement);
    });

    (() => {
		'use strict';
		const forms = document.querySelectorAll('.needs-validation');
        
		Array.from(forms).forEach(form => {
			form.addEventListener('submit', event => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
			}, false);
		});
	})();
};


window.toggleEvent = function(city) {
  // 1. Buscamos todos los bloques de contenido
  const contents = document.querySelectorAll('.event-content');
  
  contents.forEach(content => {
    // 2. Si es el que hemos clicado, lo mostramos, si no, lo ocultamos
    if (content.id === `info-${city}`) {
      const isHidden = content.classList.contains('hidden');
      
      // Resetear todos primero para que solo haya uno abierto
      contents.forEach(c => {
        c.classList.add('hidden');
        c.classList.remove('opacity-100');
      });

      if (isHidden) {
        content.classList.remove('hidden');
        // Un pequeño delay para que la transición de opacidad funcione
        setTimeout(() => content.classList.add('opacity-100'), 10);
      }
    }
  });
};
// -----------------------------------------------------------------//
// MODAL PONENTES
// -----------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-ponente');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal');

    
    // Capturamos todos los botones "Ver perfil"
    const profileButtons = document.querySelectorAll('.ponente-card a');

    profileButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.ponente-card');
            
            // Extraemos info de la card clicada
            const name = card.querySelector('.ponente-card__name').innerText;
            const role = card.querySelector('.ponente-card__title').innerText;
            const bio = card.querySelector('.ponente-card__bio').innerText;
            const img = card.querySelector('img').src;

            // Inyectamos en el modal
            document.getElementById('modal-name').innerText = name;
            document.getElementById('modal-role').innerText = role;
            document.getElementById('modal-bio').innerText = bio;
            document.getElementById('modal-img').src = img;

            // Animación de apertura
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 50);
        });
    });

    // Función cerrar
    const closeModal = () => {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    };

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
});

// -----------------------------------------------------------------//
// LISTENER General
// -----------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', initApp);
// document.addEventListener('DOMContentLoaded', cargarPonentes);
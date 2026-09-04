/**
 * BCB Design System — Carrossel Manchete Acessível (Vanilla JS)
 * Totalmente compatível com o padrão WAI-ARIA Carousel e WCAG 2.2.2.
 * Gerencia rotação automática, play/pause, navegação por setas e teclado.
 */

(function () {
  'use strict';

  const BcbCarousel = {
    instances: new Map(),

    init: function (rootElement) {
      const carousels = rootElement
        ? [rootElement]
        : Array.from(document.querySelectorAll('.bcb-carousel'));

      carousels.forEach((el, index) => {
        if (!el._bcbCarouselInstance) {
          const instance = new CarouselInstance(el, index);
          el._bcbCarouselInstance = instance;
          BcbCarousel.instances.set(el, instance);
        }
      });
    }
  };

  class CarouselInstance {
    constructor(element, index) {
      this.element = element;
      this.id = element.id || `bcb-carousel-${index + 1}`;
      this.element.id = this.id;

      this.slides = Array.from(element.querySelectorAll('.bcb-carousel__slide'));
      this.indicators = Array.from(element.querySelectorAll('.bcb-carousel__indicator'));
      this.prevBtn = element.querySelector('.bcb-carousel__prev, [data-carousel="prev"]');
      this.nextBtn = element.querySelector('.bcb-carousel__next, [data-carousel="next"]');
      this.playPauseBtn = element.querySelector('.bcb-carousel__toggle-play, [data-carousel="toggle-play"]');

      this.currentIndex = 0;
      this.isPlaying = false;
      this.interval = null;
      this.autoPlayDelay = parseInt(element.getAttribute('data-interval'), 10) || 6000;
      this.userPaused = false;

      // Respeito ao prefers-reduced-motion
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.slides.length === 0) return;

      this.setupAccessibility();
      this.bindEvents();

      // Iniciar reprodução se não houver preferência por movimento reduzido e se habilitado
      const autoPlayAttr = element.getAttribute('data-autoplay');
      const shouldAutoPlay = autoPlayAttr !== 'false' && !this.reducedMotion;

      if (shouldAutoPlay && this.slides.length > 1) {
        this.play();
      } else {
        this.updatePlayPauseButton(false);
      }
    }

    setupAccessibility() {
      this.element.setAttribute('role', 'region');
      this.element.setAttribute('aria-roledescription', 'carrossel');

      const stage = this.element.querySelector('.bcb-carousel__stage');
      if (stage) {
        stage.setAttribute('aria-live', 'polite');
      }

      this.slides.forEach((slide, idx) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${idx + 1} de ${this.slides.length}`);

        if (idx === this.currentIndex) {
          slide.classList.add('is-active', 'active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('is-active', 'active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      this.indicators.forEach((ind, idx) => {
        ind.setAttribute('role', 'tab');
        ind.setAttribute('aria-label', `Slide ${idx + 1} de ${this.slides.length}`);
        ind.setAttribute('aria-selected', idx === this.currentIndex ? 'true' : 'false');
        ind.setAttribute('tabindex', idx === this.currentIndex ? '0' : '-1');
      });
    }

    bindEvents() {
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.userPaused = true;
          this.pause();
          this.prev();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.userPaused = true;
          this.pause();
          this.next();
        });
      }

      if (this.playPauseBtn) {
        this.playPauseBtn.addEventListener('click', () => {
          if (this.isPlaying) {
            this.userPaused = true;
            this.pause();
          } else {
            this.userPaused = false;
            this.play();
          }
        });
      }

      this.indicators.forEach((ind, idx) => {
        ind.addEventListener('click', () => {
          this.userPaused = true;
          this.pause();
          this.goTo(idx);
        });

        ind.addEventListener('keydown', (e) => {
          let targetIndex = -1;
          if (e.key === 'ArrowRight') {
            targetIndex = (idx + 1) % this.indicators.length;
          } else if (e.key === 'ArrowLeft') {
            targetIndex = (idx - 1 + this.indicators.length) % this.indicators.length;
          } else if (e.key === 'Home') {
            targetIndex = 0;
          } else if (e.key === 'End') {
            targetIndex = this.indicators.length - 1;
          }

          if (targetIndex !== -1) {
            e.preventDefault();
            this.goTo(targetIndex);
            this.indicators[targetIndex].focus();
          }
        });
      });

      // Pausa automática ao interagir com mouse ou teclado
      this.element.addEventListener('mouseenter', () => {
        if (!this.userPaused && this.isPlaying) {
          this.stopInterval();
        }
      });

      this.element.addEventListener('mouseleave', () => {
        if (!this.userPaused && this.isPlaying) {
          this.startInterval();
        }
      });

      this.element.addEventListener('focusin', () => {
        if (!this.userPaused && this.isPlaying) {
          this.stopInterval();
        }
      });

      this.element.addEventListener('focusout', (e) => {
        if (!this.element.contains(e.relatedTarget)) {
          if (!this.userPaused && this.isPlaying) {
            this.startInterval();
          }
        }
      });
    }

    goTo(index) {
      if (index === this.currentIndex || index < 0 || index >= this.slides.length) return;

      const previousSlide = this.slides[this.currentIndex];
      const nextSlide = this.slides[index];

      if (previousSlide) {
        previousSlide.classList.remove('is-active', 'active');
        previousSlide.setAttribute('aria-hidden', 'true');
      }

      if (nextSlide) {
        nextSlide.classList.add('is-active', 'active');
        nextSlide.setAttribute('aria-hidden', 'false');
      }

      this.indicators.forEach((ind, idx) => {
        const isSelected = idx === index;
        ind.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        ind.setAttribute('tabindex', isSelected ? '0' : '-1');
        if (isSelected) {
          ind.classList.add('is-active');
        } else {
          ind.classList.remove('is-active');
        }
      });

      this.currentIndex = index;
    }

    next() {
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goTo(nextIndex);
    }

    prev() {
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goTo(prevIndex);
    }

    play() {
      this.isPlaying = true;
      this.startInterval();
      this.updatePlayPauseButton(true);
    }

    pause() {
      this.isPlaying = false;
      this.stopInterval();
      this.updatePlayPauseButton(false);
    }

    startInterval() {
      this.stopInterval();
      this.interval = setInterval(() => {
        this.next();
      }, this.autoPlayDelay);
    }

    stopInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }

    updatePlayPauseButton(isPlaying) {
      if (!this.playPauseBtn) return;

      const icon = this.playPauseBtn.querySelector('.material-symbols-outlined, .material-icons');
      const srLabel = this.playPauseBtn.querySelector('.sr-only');

      if (isPlaying) {
        if (icon) icon.textContent = 'pause';
        this.playPauseBtn.setAttribute('aria-label', 'Pausar rotação automática dos destaques');
        this.playPauseBtn.setAttribute('title', 'Pausar carrossel');
        if (srLabel) srLabel.textContent = 'Pausar carrossel';
      } else {
        if (icon) icon.textContent = 'play_arrow';
        this.playPauseBtn.setAttribute('aria-label', 'Iniciar rotação automática dos destaques');
        this.playPauseBtn.setAttribute('title', 'Iniciar carrossel');
        if (srLabel) srLabel.textContent = 'Iniciar carrossel';
      }
    }
  }

  window.BcbCarousel = BcbCarousel;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BcbCarousel.init());
  } else {
    BcbCarousel.init();
  }
})();

/* ============================================================
   THE LITTLE TACO SHOP — Scripts
   ============================================================ */

(function () {
  'use strict';

  // --- Header scroll shadow ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile navigation ---
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  function openNav() {
    toggle.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        toggle.focus();
      }
    });
  }

  // --- Contact form validation ---
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      let valid = true;

      [name, email, message].forEach((field) => {
        if (field && !field.value.trim()) {
          field.style.borderColor = 'var(--terra)';
          valid = false;
        } else if (field) {
          field.style.borderColor = '';
        }
      });

      if (email && email.value && !email.value.includes('@')) {
        email.style.borderColor = 'var(--terra)';
        valid = false;
      }

      if (valid) {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.textContent = 'Message Sent!';
          btn.disabled = true;
          btn.style.opacity = '.7';
        }
        form.reset();
        setTimeout(() => {
          if (btn) {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            btn.style.opacity = '';
          }
        }, 3000);
      }
    });
  }

  // --- Current year in footer ---
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
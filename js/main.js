/**
 * Build Craft Repair — main.js
 * Shared functionality across all pages.
 */

(function () {
  'use strict';

  /* ---- Mobile navigation ---- */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.site-nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    // Close nav when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Mark active nav link ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Contact form (static mailto fallback) ---- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (document.getElementById('cf-name')    || {}).value || '';
      var email   = (document.getElementById('cf-email')   || {}).value || '';
      var subject = (document.getElementById('cf-subject') || {}).value || 'General Inquiry';
      var message = (document.getElementById('cf-message') || {}).value || '';

      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
      var mailto = 'mailto:hello@buildcraftrepair.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body='    + encodeURIComponent(body);

      window.location.href = mailto;

      var success = document.querySelector('.form-success');
      if (success) {
        success.style.display = 'block';
        contactForm.style.display = 'none';
      }
    });
  }
})();

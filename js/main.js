/**
 * Girka World — Motion Engine, Navigation & Enquiry Form Runtime
 * Clean standalone runtime powering scroll reveals, split-word mask animations,
 * parallax, scroll progress (--x-p), pointer tracking, mobile navigation, and forms.
 */
(() => {
  'use strict';

  const scrollContainer = document.querySelector('.website-container') || document.documentElement;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = reducedMotionQuery.matches;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const getScrollTop = () => {
    if (scrollContainer && scrollContainer !== document.documentElement && scrollContainer.scrollHeight > scrollContainer.clientHeight) {
      return scrollContainer.scrollTop;
    }
    return window.scrollY || document.documentElement.scrollTop || 0;
  };

  const getViewportHeight = () => {
    if (scrollContainer && scrollContainer !== document.documentElement && scrollContainer.clientHeight > 0) {
      return scrollContainer.clientHeight;
    }
    return window.innerHeight || document.documentElement.clientHeight;
  };

  /* ========================================================================
     1. Motion Reveal Engine ([data-motion-root], [data-reveal], stagger)
     ======================================================================== */
  function initReveals() {
    const roots = Array.from(document.querySelectorAll('[data-motion-root]'));
    const targets = Array.from(
      document.querySelectorAll('[data-reveal], [data-reveal-children] > :not([data-reveal])')
    );

    if (!roots.length || !targets.length) return;

    const revealAllImmediately = () => {
      roots.forEach((root) => root.removeAttribute('data-motion'));
      targets.forEach((el) => el.setAttribute('data-inview', ''));
    };

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealAllImmediately();
      return;
    }

    // Activate live motion mode so elements below the fold wait for scroll entry
    roots.forEach((root) => root.setAttribute('data-motion', 'live'));

    const markInView = (el) => {
      if (!el.hasAttribute('data-inview')) {
        el.setAttribute('data-inview', '');
      }
    };

    const observerRoot =
      scrollContainer && scrollContainer !== document.documentElement ? scrollContainer : null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < getViewportHeight() * 0.94) {
            markInView(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        root: observerRoot,
        threshold: 0.08,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    // Trigger elements already in the initial viewport on the next frame
    requestAnimationFrame(() => {
      const vh = getViewportHeight();
      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.96 && rect.bottom > 0) {
          markInView(el);
        } else {
          observer.observe(el);
        }
      }
    });

    // React dynamically if user switches OS reduced-motion setting
    reducedMotionQuery.addEventListener?.('change', (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        observer.disconnect();
        revealAllImmediately();
      }
    });
  }

  /* ========================================================================
     2. Scroll-Driven Progress (--x-p), Parallax (--ids-motion-py) & Header State
     ======================================================================== */
  function initScrollEffects() {
    const scrollTargets = Array.from(document.querySelectorAll('[data-scroll]'));
    const parallaxTargets = Array.from(document.querySelectorAll('[data-parallax]'));
    const headerStateTargets = Array.from(document.querySelectorAll('[data-scroll-state]'));

    let lastScrollTop = getScrollTop();
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const vh = getViewportHeight();
      const scrollTop = getScrollTop();
      const direction = scrollTop > lastScrollTop + 2 ? 'down' : scrollTop < lastScrollTop - 2 ? 'up' : null;
      lastScrollTop = scrollTop;

      // Header scroll state attributes
      for (const header of headerStateTargets) {
        header.setAttribute('data-scrolled', scrollTop > 12 ? 'true' : 'false');
        if (direction) {
          header.setAttribute('data-scroll-dir', direction);
        }
      }

      if (prefersReducedMotion) {
        for (const el of scrollTargets) {
          el.style.setProperty('--x-p', '1');
        }
        for (const el of parallaxTargets) {
          el.style.setProperty('--ids-motion-py', '0px');
        }
        return;
      }

      // Normalized scroll progress (0..1) for [data-scroll] elements
      for (const el of scrollTargets) {
        const rect = el.getBoundingClientRect();
        let progress;
        if (el.classList.contains('x-timeline')) {
          // Fill the vertical timeline smoothly as the user reads through steps 01 -> 03
          progress = clamp((vh * 0.85 - rect.top) / Math.max(1, rect.height + vh * 0.1), 0, 1);
        } else {
          const total = vh + rect.height;
          progress = total > 0 ? clamp((vh - rect.top) / total, 0, 1) : 0;
        }
        el.style.setProperty('--x-p', progress.toFixed(4));
      }

      // Subtle vertical parallax for [data-parallax] elements
      for (const el of parallaxTargets) {
        const factor = parseFloat(el.getAttribute('data-parallax')) || 0;
        const rect = el.getBoundingClientRect();
        const centerOffset = rect.top + rect.height * 0.5 - vh * 0.5;
        const py = clamp(centerOffset * factor * -1, -90, 90);
        el.style.setProperty('--ids-motion-py', `${py.toFixed(1)}px`);
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    if (scrollContainer && scrollContainer !== document.documentElement) {
      scrollContainer.addEventListener('scroll', scheduleUpdate, { passive: true });
    }
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    update();
  }

  /* ========================================================================
     3. Pointer Tracking ([data-pointer]), Tilt ([data-tilt]) & Magnetic
     ======================================================================== */
  function initPointerEffects() {
    const pointerTargets = Array.from(document.querySelectorAll('[data-pointer]'));
    for (const el of pointerTargets) {
      el.addEventListener('pointermove', (e) => {
        if (prefersReducedMotion) return;
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const mx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        const my = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
        el.style.setProperty('--x-mx', mx.toFixed(3));
        el.style.setProperty('--x-my', my.toFixed(3));
      });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--x-mx', '0');
        el.style.setProperty('--x-my', '0');
      });
    }

    const tiltTargets = Array.from(document.querySelectorAll('[data-tilt]'));
    for (const el of tiltTargets) {
      const maxDeg = clamp(parseFloat(el.getAttribute('data-tilt')) || 8, 0, 30);
      el.addEventListener('pointermove', (e) => {
        if (prefersReducedMotion) return;
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        el.style.setProperty('--ids-motion-tilt-x', `${(-ny * maxDeg).toFixed(2)}deg`);
        el.style.setProperty('--ids-motion-tilt-y', `${(nx * maxDeg).toFixed(2)}deg`);
      });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--ids-motion-tilt-x', '0deg');
        el.style.setProperty('--ids-motion-tilt-y', '0deg');
      });
    }

    const magneticTargets = Array.from(document.querySelectorAll('[data-magnetic]'));
    for (const el of magneticTargets) {
      const strength = clamp(parseFloat(el.getAttribute('data-magnetic')) || 0.25, 0, 1);
      el.addEventListener('pointermove', (e) => {
        if (prefersReducedMotion) return;
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
        el.style.setProperty('--ids-motion-mag-x', `${dx.toFixed(1)}px`);
        el.style.setProperty('--ids-motion-mag-y', `${dy.toFixed(1)}px`);
      });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--ids-motion-mag-x', '0px');
        el.style.setProperty('--ids-motion-mag-y', '0px');
      });
    }
  }

  /* ========================================================================
     4. Accessible Mobile Navigation Menu
     ======================================================================== */
  function initMobileNav() {
    const toggleBtn = document.querySelector('[data-ids-menu-toggle="main"]');
    const panel = document.querySelector('[data-ids-menu-panel="main"]');
    if (!toggleBtn || !panel) return;

    const MENU_ICON =
      '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none"><path stroke="currentColor" stroke-width="2" d="M2 7h20M2 12h20M2 17h20"></path></svg>';
    const CLOSE_ICON =
      '<svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none"><path stroke="currentColor" stroke-width="2" d="M5 5l14 14M19 5L5 19"></path></svg>';

    let isOpen = false;

    const setOpen = (open, restoreFocus = false) => {
      isOpen = open;
      toggleBtn.setAttribute('aria-expanded', String(open));
      toggleBtn.setAttribute('data-state', open ? 'open' : 'closed');
      toggleBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggleBtn.innerHTML = open ? CLOSE_ICON : MENU_ICON;
      panel.hidden = !open;
      if (!open && restoreFocus) {
        toggleBtn.focus();
      }
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!isOpen);
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!isOpen) return;
      if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (isOpen && e.key === 'Escape') {
        setOpen(false, true);
      }
    });

    window.addEventListener('resize', () => {
      if (isOpen && window.innerWidth > 900) {
        setOpen(false);
      }
    });
  }

  /* ========================================================================
     5. Smooth In-Page Anchor Scrolling inside .website-container
     ======================================================================== */
  function initSmoothAnchors() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      if (history.pushState) {
        history.pushState(null, '', hash);
      }
    });
  }

  /* ========================================================================
     6. Enquiry Forms Validation & Submission Handling
        Tip: To wire live email delivery (e.g., Formspree or Web3Forms),
        add data-endpoint="https://formspree.io/f/YOUR_ID" to any <form>.
     ======================================================================== */
  function initEnquiryForms() {
    const forms = Array.from(document.querySelectorAll('form'));
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const form of forms) {
      const feedback = document.createElement('div');
      feedback.className = 'gw-form-feedback';
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      feedback.hidden = true;
      form.appendChild(feedback);

      const clearFieldError = (field) => {
        field.removeAttribute('aria-invalid');
        const err = field.parentElement?.querySelector('.gw-field-error');
        if (err) err.remove();
      };

      const setFieldError = (field, message) => {
        clearFieldError(field);
        field.setAttribute('aria-invalid', 'true');
        const err = document.createElement('span');
        err.className = 'gw-field-error';
        err.textContent = message;
        field.parentElement?.appendChild(err);
      };

      form.querySelectorAll('input, select, textarea').forEach((field) => {
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('change', () => clearFieldError(field));
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.hidden = true;
        feedback.className = 'gw-form-feedback';

        const fields = Array.from(form.querySelectorAll('input, select, textarea'));
        let firstInvalid = null;

        for (const field of fields) {
          clearFieldError(field);
          const value = field.value.trim();

          if (field.hasAttribute('required') && !value) {
            setFieldError(field, 'Please fill in this field.');
            if (!firstInvalid) firstInvalid = field;
            continue;
          }

          if (field.type === 'email' && value && !emailPattern.test(value)) {
            setFieldError(field, 'Please enter a valid email address.');
            if (!firstInvalid) firstInvalid = field;
          }
        }

        if (firstInvalid) {
          firstInvalid.focus();
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const labelEl = submitBtn?.querySelector('.ids-design-btn__label');
        const originalLabel = labelEl ? labelEl.textContent : '';
        const endpoint = form.getAttribute('data-endpoint')?.trim();

        if (submitBtn) submitBtn.disabled = true;
        if (labelEl) labelEl.textContent = 'Sending…';

        try {
          if (endpoint) {
            const formData = new FormData(form);
            const res = await fetch(endpoint, {
              method: 'POST',
              body: formData,
              headers: { Accept: 'application/json' },
            });
            if (!res.ok) throw new Error(`Request failed (${res.status})`);
          }

          const name = form.querySelector('[name="name"]')?.value.trim() || 'there';
          form.reset();
          feedback.classList.add('gw-form-feedback--success');
          feedback.textContent = `Thank you, ${name}. Your enquiry has been received by Girka World — we will respond shortly. You can also reach us directly at +91 63033 12455.`;
          feedback.hidden = false;
        } catch (err) {
          feedback.classList.add('gw-form-feedback--error');
          feedback.textContent =
            'We could not send your enquiry right now. Please try again or call us directly at +91 63033 12455.';
          feedback.hidden = false;
        } finally {
          if (submitBtn) submitBtn.disabled = false;
          if (labelEl) labelEl.textContent = originalLabel;
        }
      });
    }
  }

  /* ========================================================================
     Bootstrap
     ======================================================================== */
  const boot = () => {
    initReveals();
    initScrollEffects();
    initPointerEffects();
    initMobileNav();
    initSmoothAnchors();
    initEnquiryForms();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();

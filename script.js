/**
 * ==========================================================================
 * Kunjlaadli — Luxury Indian Couture & Bridal Beauty Studio
 * Client Presentation Frontend Demo Logic (Vanilla JavaScript)
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. Brand Configuration (Easily customized for prospective client)
// --------------------------------------------------------------------------
const Kunjlaadli_CONFIG = {
  brandName: "Kunjlaadli",
  phone: "918077613492", // Plain numbers with country code for wa.me links
  displayPhone: "+91 80776 13492",
  catalogueUrl: "https://wa.me/c/918077613492",
  instagramHandle: "@Kunjlaadli.official",
  instagramUrl: "https://instagram.com",
  boutiqueAddress: "Heritage Couture Arcade, Near Civil Lines, New Delhi / Jaipur",
  businessHours: "Mon – Sat: 10:30 AM – 8:00 PM | Sunday: By Appointment"
};

/**
 * Builds a direct pre-filled WhatsApp link
 * @param {string} messageText 
 * @returns {string} Fully encoded wa.me URL
 */
function createWhatsAppMessageUrl(messageText) {
  const encodedText = encodeURIComponent(messageText.trim());
  return `https://wa.me/${Kunjlaadli_CONFIG.phone}?text=${encodedText}`;
}

// --------------------------------------------------------------------------
// 2. DOM Initialization & Event Wiring
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initDynamicYear();
  initStickyHeader();
  initMobileNavigation();
  initCategoryFilters();
  initCategoryTileLinks();
  initProductEnquiries();
  initServiceEnquiries();
  initBridalAppointmentForm();
  initImageFallbackHandler();
  initScrollSpy();
});

// --------------------------------------------------------------------------
// 3. Dynamic Footer Year
// --------------------------------------------------------------------------
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// --------------------------------------------------------------------------
// 4. Sticky Header Scroll Treatment
// --------------------------------------------------------------------------
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --------------------------------------------------------------------------
// 5. Mobile Navigation Drawer
// --------------------------------------------------------------------------
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggleBtn || !mobileNav) return;

  const toggleMenu = (open) => {
    const isCurrentlyOpen = toggleBtn.classList.contains('is-open');
    const newState = typeof open === 'boolean' ? open : !isCurrentlyOpen;

    if (newState) {
      toggleBtn.classList.add('is-open');
      mobileNav.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    } else {
      toggleBtn.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking mobile links
  const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link, a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleMenu(false);
    }
  });
}

// --------------------------------------------------------------------------
// 6. Featured Products Category Filtering (Vanilla JS)
// --------------------------------------------------------------------------
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterButtons.length || !productCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter') || 'all';

      // Update button active state
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter product cards with smooth transition
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * Connect Category Tiles in Section 4 to automatically trigger filters in Section 5
 */
function initCategoryTileLinks() {
  const categoryTiles = document.querySelectorAll('.category-tile[data-category]');
  categoryTiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      const targetCategory = tile.getAttribute('data-category');
      if (!targetCategory) return;

      const matchingFilterBtn = document.querySelector(`.filter-btn[data-filter="${targetCategory}"]`);
      if (matchingFilterBtn) {
        matchingFilterBtn.click();
      }
    });
  });
}

// --------------------------------------------------------------------------
// 7. Product WhatsApp Enquiry Handling
// --------------------------------------------------------------------------
function initProductEnquiries() {
  const productButtons = document.querySelectorAll('.js-enquire-product');
  productButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-product') || 'Featured Item';
      const productPrice = btn.getAttribute('data-price') || 'Enquire for Price';

      const message = `Hello ${Kunjlaadli_CONFIG.brandName}! I would like to enquire about the "${productName}" (Listed at ${productPrice}). Please share fabric details, color variations, and ordering process.`;
      const url = createWhatsAppMessageUrl(message);

      showToast(`Opening WhatsApp enquiry for "${productName}"...`);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

// --------------------------------------------------------------------------
// 8. Bridal Makeup Studio Service Package Enquiry Handling
// --------------------------------------------------------------------------
function initServiceEnquiries() {
  const serviceButtons = document.querySelectorAll('.js-enquire-service');
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'Bridal Service';
      const servicePrice = btn.getAttribute('data-price') || 'Enquire for Price';

      const message = `Hello ${Kunjlaadli_CONFIG.brandName} Atelier! I am inquiring about booking the "${serviceName}" package (Package Rate: ${servicePrice}). Could you please share artist availability, trial slots, and booking procedure?`;
      const url = createWhatsAppMessageUrl(message);

      showToast(`Opening WhatsApp booking for "${serviceName}"...`);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

// --------------------------------------------------------------------------
// 9. Bridal Makeup Appointment Form Validation & Submission
// --------------------------------------------------------------------------
function initBridalAppointmentForm() {
  const form = document.getElementById('bridal-enquiry-form');
  if (!form) return;

  const nameInput = document.getElementById('cust-name');
  const phoneInput = document.getElementById('cust-phone');
  const dateInput = document.getElementById('cust-date');
  const serviceInput = document.getElementById('cust-service');
  const notesInput = document.getElementById('cust-notes');

  // Set minimum date to today so past dates cannot be picked
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const nameVal = nameInput.value.trim();
    const nameErr = document.getElementById('name-error');
    if (!nameVal || nameVal.length < 2) {
      nameInput.classList.add('is-invalid');
      if (nameErr) nameErr.classList.add('is-visible');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
      if (nameErr) nameErr.classList.remove('is-visible');
    }

    // Validate Phone (digits, plus, spaces, at least 9 characters)
    const phoneVal = phoneInput.value.trim();
    const phoneErr = document.getElementById('phone-error');
    const phoneRegex = /^[+]?[\d\s-]{9,16}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      phoneInput.classList.add('is-invalid');
      if (phoneErr) phoneErr.classList.add('is-visible');
      isValid = false;
    } else {
      phoneInput.classList.remove('is-invalid');
      if (phoneErr) phoneErr.classList.remove('is-visible');
    }

    // Validate Event Date
    const dateVal = dateInput.value;
    const dateErr = document.getElementById('date-error');
    if (!dateVal) {
      dateInput.classList.add('is-invalid');
      if (dateErr) dateErr.classList.add('is-visible');
      isValid = false;
    } else {
      dateInput.classList.remove('is-invalid');
      if (dateErr) dateErr.classList.remove('is-visible');
    }

    // Validate Service Select
    const serviceVal = serviceInput.value;
    const serviceErr = document.getElementById('service-error');
    if (!serviceVal) {
      serviceInput.classList.add('is-invalid');
      if (serviceErr) serviceErr.classList.add('is-visible');
      isValid = false;
    } else {
      serviceInput.classList.remove('is-invalid');
      if (serviceErr) serviceErr.classList.remove('is-visible');
    }

    if (!isValid) {
      // Focus first invalid element
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Format event date nicely (e.g. DD Mon YYYY)
    let formattedDate = dateVal;
    try {
      const parsedDate = new Date(dateVal);
      formattedDate = parsedDate.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (_) { }

    const notesVal = notesInput ? notesInput.value.trim() : '';

    // Construct Luxury Pre-filled WhatsApp message
    const message =
      `✦ *Kunjlaadli BRIDAL CONSULTATION INQUIRY* ✦
━━━━━━━━━━━━━━━━━━━━━
• *Client Name:* ${nameVal}
• *Contact Phone:* ${phoneVal}
• *Celebration Service:* ${serviceVal}
• *Event Date:* ${formattedDate}
${notesVal ? `• *Venue / Notes:* ${notesVal}\n` : ''}━━━━━━━━━━━━━━━━━━━━━
Please check artist availability and share consultation / booking details. Thank you!`;

    const whatsappUrl = createWhatsAppMessageUrl(message);

    showToast('Redirecting to WhatsApp with your appointment details...');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });

  // Remove error class on input
  [nameInput, phoneInput, dateInput, serviceInput].forEach(elem => {
    if (!elem) return;
    elem.addEventListener('input', () => {
      elem.classList.remove('is-invalid');
      const errSpan = elem.parentElement.querySelector('.form-error');
      if (errSpan) errSpan.classList.remove('is-visible');
    });
  });
}

// --------------------------------------------------------------------------
// 10. Robust Fallback Image Handler (Guarantees zero broken images)
// --------------------------------------------------------------------------
function initImageFallbackHandler() {
  const images = document.querySelectorAll('img');

  // Creates an exquisite inline SVG placeholder in case of network blocking
  const generateFallbackSvg = (label) => {
    const cleanLabel = encodeURIComponent(label || 'Kunjlaadli Atelier');
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700"><rect width="600" height="700" fill="%234C151B"/><rect x="20" y="20" width="560" height="660" fill="none" stroke="%23BD873C" stroke-width="2" stroke-dasharray="6,4"/><circle cx="300" cy="300" r="50" fill="%23351014" stroke="%23BD873C" stroke-width="2"/><text x="300" y="308" font-family="serif" font-size="28" fill="%23BD873C" text-anchor="middle">✦</text><text x="300" y="400" font-family="serif" font-size="24" font-weight="bold" fill="%23FBF5EC" text-anchor="middle">Kunjlaadli</text><text x="300" y="435" font-family="sans-serif" font-size="14" fill="%23D9A458" letter-spacing="2" text-anchor="middle">${cleanLabel}</text></svg>`;
  };

  images.forEach(img => {
    img.addEventListener('error', function () {
      // Prevent infinite loop if fallback itself errors
      if (this.dataset.hasFallback) return;
      this.dataset.hasFallback = 'true';
      const label = this.alt || 'Luxury Indian Collection';
      this.src = generateFallbackSvg(label);
    });
  });
}

// --------------------------------------------------------------------------
// 11. ScrollSpy for Navigation Highlights
// --------------------------------------------------------------------------
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// --------------------------------------------------------------------------
// 12. Elegant Toast Notification
// --------------------------------------------------------------------------
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:#BD873C; font-size:1.1rem;">✦</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3400);
}

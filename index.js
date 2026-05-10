/* ========================================================
   Tee Two Trading — Main Interactive Script
   ======================================================== */

/* ---- Navbar scroll effect ---- */
const navbar = document.querySelector(".navbar-9");
window.addEventListener(
  "scroll",
  () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 60);
  },
  { passive: true }
);

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-overlay");
const mobileClose = document.getElementById("mobile-close");

function openMenu() {
  mobileMenu?.classList.add("open");
  mobileOverlay?.classList.add("open");
  hamburger?.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeMenu() {
  mobileMenu?.classList.remove("open");
  mobileOverlay?.classList.remove("open");
  hamburger?.classList.remove("open");
  document.body.style.overflow = "";
}
hamburger?.addEventListener("click", openMenu);
mobileClose?.addEventListener("click", closeMenu);
mobileOverlay?.addEventListener("click", closeMenu);

/* ---- Smooth scroll + close menu on nav link click ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      closeMenu();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll("section[id], main[id]");
const navLinks = document.querySelectorAll(
  ".column .link-one a, .mobile-nav-link"
);
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          const isMatch = href && href.slice(1) === entry.target.id;
          link.closest(".link-one")?.classList.toggle("active", isMatch);
          link.classList.toggle("active", isMatch);
        });
      }
    });
  },
  { threshold: 0.35 }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ---- Hero scroll hint ---- */
const heroSection = document.querySelector(".header-30");
if (heroSection) {
  const hint = document.createElement("div");
  hint.className = "hero-scroll-hint";
  hint.innerHTML = `<span>Scroll</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>`;
  heroSection.appendChild(hint);
  window.addEventListener(
    "scroll",
    () => {
      hint.style.opacity = window.scrollY > 100 ? "0" : "";
    },
    { passive: true }
  );
}

/* ---- Hero typed text ---- */
const typed = document.getElementById("typed-text");
if (typed) {
  const words = [
    "Infrastructure",
    "Bridges",
    "Buildings",
    "Pipelines",
    "Dams",
    "Tunnels",
  ];
  let wi = 0,
    ci = 0,
    deleting = false;
  function typeLoop() {
    const word = words[wi];
    if (!deleting) {
      typed.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      typed.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 55 : 110);
  }
  typeLoop();
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
);
revealEls.forEach((el) => revealObs.observe(el));

/* ---- Counter animation ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1800;
  const steps = 60;
  const increment = target / steps;
  let current = 0,
    step = 0;
  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current.toLocaleString() + suffix;
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document
  .querySelectorAll(".counter-num")
  .forEach((el) => counterObs.observe(el));

/* ---- Tab switching with keyboard support ---- */
const tabBtns = Array.from(document.querySelectorAll(".tab-link-btn"));
const tabPanes = Array.from(document.querySelectorAll(".tab-pane"));

function activateTab(idx) {
  tabBtns.forEach((b, i) => {
    const active = i === idx;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active);
    b.setAttribute("tabindex", active ? "0" : "-1");
  });
  tabPanes.forEach((p, i) => p.classList.toggle("active", i === idx));
}
tabBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => activateTab(idx));
  btn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") activateTab((idx + 1) % tabBtns.length);
    if (e.key === "ArrowLeft")
      activateTab((idx - 1 + tabBtns.length) % tabBtns.length);
  });
});
if (tabBtns.length) activateTab(0);

/* ---- Image lightbox ---- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.setAttribute("src", src);
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox?.classList.remove("open");
  document.body.style.overflow = "";
}
document.querySelectorAll(".gallery-img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src));
});
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ---- Back to top ---- */
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    },
    { passive: true }
  );
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

/* ---- Newsletter form ---- */
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const btn = newsletterForm.querySelector('button[type="submit"]');
    if (!input?.value.trim()) return;
    const orig = btn.innerHTML;
    btn.textContent = "✓ Subscribed!";
    btn.style.cssText = "background:#22c55e;border-color:#22c55e;";
    input.value = "";
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.cssText = "";
    }, 3200);
  });
}

/* ---- Contact form with validation ---- */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  /* Real-time field validation */
  contactForm
    .querySelectorAll("input[required], textarea[required]")
    .forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("invalid")) validateField(field);
      });
    });

  function validateField(field) {
    const val = field.value.trim();
    let error = "";
    if (!val) {
      error = "This field is required.";
    } else if (
      field.type === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    ) {
      error = "Please enter a valid email address.";
    }
    let hint = field.parentElement.querySelector(".field-error");
    if (error) {
      field.classList.add("invalid");
      field.style.borderColor = "#ef4444";
      if (!hint) {
        hint = document.createElement("span");
        hint.className = "field-error";
        hint.style.cssText =
          "font-size:12px;color:#ef4444;margin-top:4px;display:block;font-family:Inter,sans-serif;";
        field.parentElement.appendChild(hint);
      }
      hint.textContent = error;
    } else {
      field.classList.remove("invalid");
      field.style.borderColor = "";
      hint?.remove();
    }
    return !error;
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = Array.from(
      contactForm.querySelectorAll("input[required], textarea[required]")
    );
    const allValid = required.every((f) => validateField(f));
    if (!allValid) return;

    const btn = contactForm.querySelector(".form-submit-btn");
    const orig = btn.textContent;
    btn.textContent = "Sending…";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    setTimeout(() => {
      btn.textContent = "✓ Message Sent!";
      btn.style.cssText = "background:#22c55e;border-color:#22c55e;opacity:1;";
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.cssText = "";
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

/* ---- Parallax subtle on hero ---- */
const heroImg = document.querySelector(".header-30");
if (heroImg) {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroImg.style.backgroundPositionY = `calc(center + ${y * 0.3}px)`;
      }
    },
    { passive: true }
  );
}

/* ---- Card tilt micro-interaction ---- */
document.querySelectorAll(".card, .card6, .card10, .card16").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = "transform 0.1s ease";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)";
  });
});

/* ---- Industry cards stagger reveal ---- */
document.querySelectorAll(".card11, .card12, .card14").forEach((card, i) => {
  card.classList.add("reveal");
  card.style.transitionDelay = `${i * 0.08}s`;
  revealObs.observe(card);
});

/* ---- Explore / CTA buttons — ripple effect ---- */
function addRipple(btn) {
  btn.style.position = "relative";
  btn.style.overflow = "hidden";
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.18);
      border-radius:50%;
      pointer-events:none;
      transform:scale(0);
      animation:rippleAnim 0.55s ease-out forwards;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}
const rippleStyle = document.createElement("style");
rippleStyle.textContent =
  "@keyframes rippleAnim{to{transform:scale(1);opacity:0;}}";
document.head.appendChild(rippleStyle);
document
  .querySelectorAll(".button3, .button5, .form-submit-btn, .button11, .button")
  .forEach(addRipple);

/* ---- Page load progress bar ---- */
const progress = document.createElement("div");
progress.style.cssText = `
  position:fixed;top:0;left:0;height:3px;width:0;
  background:linear-gradient(90deg,var(--orange),var(--orange-light));
  z-index:9999;transition:width 0.2s ease;border-radius:0 2px 2px 0;
  box-shadow:0 0 10px rgba(255,121,0,0.6);
`;
document.body.prepend(progress);
window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(scrolled / max) * 100}%` : "0";
  },
  { passive: true }
);

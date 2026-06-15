const WHATSAPP_MAIN = "967773323324";
const WHATSAPP_SECOND = "967776020184";

function whatsappUrl(number, message = "") {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Mobile menu
const mobileMenu = document.getElementById("mobileMenu");
const navMenu = document.getElementById("navMenu");
mobileMenu?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  mobileMenu.setAttribute("aria-expanded", isOpen ? "true" : "false");
  document.body.classList.toggle("menu-open", isOpen);
});

navMenu?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    mobileMenu?.setAttribute("aria-expanded", "false");
  });
});

// Service WhatsApp buttons
const serviceButtons = document.querySelectorAll(".service-whatsapp");
serviceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const service = button.dataset.service || "خدمة هندسية";
    const msg = `مرحبًا مكتب القرار الصحيح، أريد الاستفسار عن خدمة: ${service}.`;
    window.open(whatsappUrl(WHATSAPP_MAIN, msg), "_blank", "noopener");
  });
});

// Service filters
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    serviceCards.forEach(card => {
      const categories = card.dataset.category || "";
      const show = filter === "all" || categories.includes(filter);
      card.style.display = show ? "block" : "none";
    });
  });
});

// Contact form to WhatsApp
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value.trim();
  const details = document.getElementById("details").value.trim();

  const message = [
    "مرحبًا مكتب القرار الصحيح لأنظمة التحكم والطاقة،",
    "أريد طلب استشارة / عرض سعر.",
    "",
    `الاسم: ${name || "غير محدد"}`,
    `رقم التواصل: ${phone || "غير محدد"}`,
    `الخدمة المطلوبة: ${service || "غير محددة"}`,
    `تفاصيل الطلب: ${details || "لا توجد تفاصيل إضافية"}`
  ].join("\n");

  window.open(whatsappUrl(WHATSAPP_MAIN, message), "_blank", "noopener");
});

// Savings calculator
const monthlyCost = document.getElementById("monthlyCost");
const savingRate = document.getElementById("savingRate");
const savingResult = document.getElementById("savingResult");

function formatNumber(value) {
  return new Intl.NumberFormat("ar-YE").format(Math.round(value));
}

function updateSavings() {
  const cost = Number(monthlyCost?.value || 0);
  const rate = Number(savingRate?.value || 0) / 100;
  if (!cost || cost <= 0) {
    savingResult.innerHTML = `<span>أدخل تكلفة التشغيل لعرض التوفير المتوقع.</span>`;
    return;
  }
  const monthlySaving = cost * rate;
  const annualSaving = monthlySaving * 12;
  const newCost = cost - monthlySaving;
  savingResult.innerHTML = `
    <span>التوفير الشهري المتوقع</span>
    <strong>${formatNumber(monthlySaving)}</strong>
    <span>التكلفة بعد التحسين: ${formatNumber(newCost)} | التوفير السنوي التقريبي: ${formatNumber(annualSaving)}</span>
  `;
}
monthlyCost?.addEventListener("input", updateSavings);
savingRate?.addEventListener("change", updateSavings);

// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const question = item.querySelector(".faq-q");
  question?.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

// Back to top
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 700) backTop?.classList.add("show");
  else backTop?.classList.remove("show");
});
backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Active nav link on scroll
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-menu a")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 });
sections.forEach(section => observer.observe(section));

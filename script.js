const BUSINESS = {
  whatsapp: '919784370260'
};

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(navMenu.classList.contains('open')));
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach(el => {
  if (observer) observer.observe(el);
  else el.classList.add('show');
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const interestSelect = document.getElementById('interest');
const messageInput = document.getElementById('message');

document.querySelectorAll('.product-enquire').forEach(link => {
  link.addEventListener('click', () => {
    const product = link.dataset.product;
    if (!product || !interestSelect || !messageInput) return;

    const lower = product.toLowerCase();
    if (lower.includes('granite')) interestSelect.value = 'Granite';
    else if (lower.includes('marble')) interestSelect.value = 'Marble';
    else if (lower.includes('tile')) interestSelect.value = 'Tiles';

    messageInput.value = `I am interested in ${product}. Please share the latest price, available sizes/finishes and stock.`;
  });
});

const form = document.getElementById('enquiryForm');
const submitBtn = document.getElementById('submitBtn');
const formError = document.getElementById('formError');
const googleFrame = document.getElementById('googleFormHiddenFrame');
const successModal = document.getElementById('successModal');
const successClose = document.getElementById('successClose');

let googleFormSubmitted = false;

function cleanPhone(value) {
  return value.replace(/\D/g, '').slice(-10);
}

function googleFormIsConfigured() {
  if (!form) return false;
  return [...form.elements]
    .filter(el => el.name)
    .every(el => el.name.startsWith('entry.'));
}

function showSuccess() {
  if (successModal) {
    successModal.removeAttribute('hidden');
    successModal.classList.add('open');
    successModal.setAttribute('aria-hidden', 'false');
  } else {
    alert('Thank you for your enquiry! Our team will connect with you soon.');
  }
}

function closeSuccess() {
  if (!successModal) return;
  successModal.classList.remove('open');
  successModal.setAttribute('aria-hidden', 'true');
  successModal.setAttribute('hidden', '');
}

successClose?.addEventListener('click', closeSuccess);
document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeSuccess);
});
successModal?.addEventListener('click', event => {
  if (event.target === successModal) closeSuccess();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSuccess();
});

form?.addEventListener('submit', event => {
  formError.textContent = '';

  if (!googleFormIsConfigured()) {
    event.preventDefault();
    formError.textContent = 'Google Form is not configured yet. Add the FORM_ID and all four entry IDs in index.html.';
    return;
  }

  const phoneInput = document.getElementById('phone');
  const phone = cleanPhone(phoneInput.value);

  if (!/^[6-9]\d{9}$/.test(phone)) {
    event.preventDefault();
    formError.textContent = 'Please enter a valid 10-digit Indian mobile number.';
    phoneInput.focus();
    return;
  }

  phoneInput.value = phone;
  googleFormSubmitted = true;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending Enquiry...';

  // Do not call preventDefault(): the browser posts directly to Google Forms
  // inside the hidden iframe, so the customer remains on this website.
});

googleFrame?.addEventListener('load', () => {
  if (!googleFormSubmitted) return;

  googleFormSubmitted = false;
  form?.reset();
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Enquiry';
  }
  showSuccess();
});

// TEJAS KANNADIGA — THE DEVIL'S ADVOCATE
// Shared site behaviour

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Episode / docket topic filter (episodes.html) */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fileCards = document.querySelectorAll('[data-topic]');
  if (filterBtns.length && fileCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const topic = btn.getAttribute('data-filter');
        fileCards.forEach(card => {
          const match = topic === 'all' || card.getAttribute('data-topic').includes(topic);
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* Contact form — mailto fallback (static hosting, no backend) */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const reason = form.querySelector('#reason').value;
      const message = form.querySelector('#message').value.trim();

      const subject = encodeURIComponent(`[Website] ${reason || 'General inquiry'} — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:tejaskannadiga2501@gmail.com?subject=${subject}&body=${body}`;

      const status = document.querySelector('#form-status');
      if (status) {
        status.textContent = 'Opening your email app to send this message…';
        status.classList.add('show');
      }
    });
  }

});

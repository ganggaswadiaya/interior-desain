/* Ruang Studio — vanilla JS interactions */
(function () {
  'use strict';

  /* ---------- Navbar: transparent -> solid ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('solid');
      header.classList.remove('transparent');
    } else {
      header.classList.add('transparent');
      header.classList.remove('solid');
    }
    // subtle hero parallax
    var bg = document.querySelector('.hero-bg');
    if (bg && window.scrollY < window.innerHeight) {
      bg.style.transform = 'scale(1.05) translateY(' + window.scrollY * 0.12 + 'px)';
    }
  }
  header.classList.add('transparent');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active nav link */
  var sections = ['home', 'about', 'services', 'projects', 'process', 'contact'];
  var navLinks = document.querySelectorAll('.nav-desktop .nav-link');
  var ioNav = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) ioNav.observe(el);
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  menu.inert = true;
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', !open);
    menu.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 920 && menu.classList.contains('open')) setMenu(false);
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  /* ---------- Reveal on scroll ---------- */
  var ioReveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); ioReveal.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { ioReveal.observe(el); });

  /* ---------- Counters ---------- */
  var counted = false;
  var ioCount = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.count').forEach(function (el) {
        var target = parseInt(el.dataset.count, 10) || 0;
        var t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1400, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      ioCount.disconnect();
    }
  }, { threshold: 0.4 });
  var stats = document.querySelector('.stats');
  if (stats) ioCount.observe(stats);

  /* ---------- Project data + modal ---------- */
  var PROJECTS = {
    'villa-canggu': {
      title: 'Villa Canggu', loc: 'Canggu, Bali — Indonesia', cat: 'Residential / 2026',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
      desc: 'A 320 m² tropical-modern villa designed for a young family who moved from Jakarta. Open-plan living, a shaded terrace, and a calm neutral palette keep the house cool and social all day.',
      concept: 'Indoor-outdoor continuity: terrazzo, teak, and limewash walls blur the line between garden and living room. Furniture stays low and tactile.',
      material: 'Teak wood, terrazzo, limewash, travertine, linen & rattan.',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop'
      ]
    },
    'casa-senja': {
      title: 'Casa Senja', loc: 'Ubud, Bali — Indonesia', cat: 'Residential / 2025',
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
      desc: 'A three-bedroom hideaway in Ubud surrounded by rice fields. The client wanted a slow-living retreat — warm, quiet, and full of natural texture.',
      concept: 'Golden-hour warmth: amber lighting, curved joinery, and layered textiles create a sunset mood that lasts all day.',
      material: 'Oak veneer, microcement, bouclé, jute, brushed brass.',
      gallery: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop'
      ]
    },
    'living-space': {
      title: 'The Living Space', loc: 'Denpasar, Bali — Indonesia', cat: 'Residential / 2025',
      img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop',
      desc: 'A 78 m² apartment renovation for a first-time homeowner. Smart storage, a flexible work corner, and a light oak palette make a compact plan feel generous.',
      concept: 'Small but generous: every wall works — hidden storage, fold-down desk, and soft zoning with rugs and light.',
      material: 'Light oak, off-white lacquer, limestone-look porcelain, sheer linen.',
      gallery: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop'
      ]
    },
    'mono-cafe': {
      title: 'Mono Cafe', loc: 'Seminyak, Bali — Indonesia', cat: 'Commercial / 2024',
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop',
      desc: 'A 120-seat café designed for all-day traffic — morning coffee, remote work at noon, dinner at night. Durable materials meet a monochrome, gallery-like interior.',
      concept: 'Quiet canvas, loud coffee: monochrome shell with timber warmth so the food, people, and light become the colour.',
      material: 'Fluted concrete, white oak, black steel, terrazzo counters.',
      gallery: [
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop'
      ]
    },
    'amarra': {
      title: 'Amarra Residence', loc: 'Sanur, Bali — Indonesia', cat: 'Residential / 2024',
      img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop',
      desc: 'Full kitchen and dining renovation for a family who loves to cook together. A marble island anchors the room; tall oak storage hides the clutter.',
      concept: 'Kitchen as living room: warm stone, soft lighting, and seating on all sides.',
      material: 'Hon ed marble, smoked oak, unlacquered brass, handmade zellige.',
      gallery: [
        'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop'
      ]
    },
    'kontor': {
      title: 'Kontor Office', loc: 'Denpasar, Bali — Indonesia', cat: 'Commercial / 2023',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
      desc: 'A 400 m² workspace for a creative company of 35. Acoustic pods, phone booths, and a lounge-style town hall balance focus and collaboration.',
      concept: 'Hospitality meets office: daylight, plants, and residential furniture to make work feel human.',
      material: 'Oak desks, acoustic felt, wool upholstery, low-iron glass.',
      gallery: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=800&auto=format&fit=crop'
      ]
    }
  };

  var modal = document.getElementById('projectModal');
  var mImage = document.getElementById('mImage');
  var mTitle = document.getElementById('mTitle');
  var mLoc = document.getElementById('mLoc');
  var mCat = document.getElementById('mCat');
  var mDesc = document.getElementById('mDesc');
  var mConcept = document.getElementById('mConcept');
  var mMaterial = document.getElementById('mMaterial');
  var mGallery = document.getElementById('mGallery');

  function openProject(key) {
    var p = PROJECTS[key];
    if (!p) return;
    mImage.src = p.img;
    mImage.alt = p.title + ' — ' + p.loc;
    mTitle.textContent = p.title;
    mLoc.textContent = p.loc;
    mCat.textContent = p.cat;
    mDesc.textContent = p.desc;
    mConcept.textContent = p.concept;
    mMaterial.textContent = p.material;
    mGallery.innerHTML = '';
    p.gallery.forEach(function (src, i) {
      var img = document.createElement('img');
      img.src = src;
      img.alt = p.title + ' gallery image ' + (i + 1);
      img.loading = 'lazy';
      mGallery.appendChild(img);
    });
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-panel').scrollTop = 0;
  }
  function closeProject() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.project-card').forEach(function (card) {
    function go() { openProject(card.dataset.project); }
    card.addEventListener('click', go);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
  modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeProject);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeProject(); setMenu(false); }
  });

  /* ---------- Before / After slider ---------- */
  var baWrap = document.getElementById('baBeforeWrap');
  var baHandle = document.getElementById('baHandle');
  var baRange = document.getElementById('baRange');
  var baSlider = document.getElementById('baSlider');
  function setBA(v) {
    v = Math.max(0, Math.min(100, v));
    baWrap.style.width = v + '%';
    baHandle.style.left = v + '%';
    // fix inner image width so it stays aligned with container
    var w = baSlider.clientWidth;
    baWrap.querySelector('img').style.width = w + 'px';
    if (document.activeElement !== baRange) baRange.value = v;
  }
  baRange.addEventListener('input', function () { setBA(parseFloat(baRange.value)); });
  window.addEventListener('resize', function () { setBA(parseFloat(baRange.value)); });
  setBA(50);

  /* ---------- Testimonials ---------- */
  var track = document.getElementById('tTrack');
  var cards = track.children.length;
  var idx = 0;
  var dotsWrap = document.getElementById('tDots');
  for (var i = 0; i < cards; i++) {
    var d = document.createElement('i');
    (function (n) { d.addEventListener('click', function () { goT(n); }); })(i);
    dotsWrap.appendChild(d);
  }
  function goT(n) {
    idx = (n + cards) % cards;
    track.style.transform = 'translateX(-' + idx * 100 + '%)';
    dotsWrap.querySelectorAll('i').forEach(function (el, k) {
      el.classList.toggle('on', k === idx);
    });
  }
  document.getElementById('tPrev').addEventListener('click', function () { goT(idx - 1); });
  document.getElementById('tNext').addEventListener('click', function () { goT(idx + 1); });
  goT(0);
  setInterval(function () { goT(idx + 1); }, 7000);

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById('inquiryForm');
  var note = document.getElementById('formNote');
  var btn = document.getElementById('submitBtn');
  function setErr(input, msg) {
    var g = input.closest('.f-group');
    g.classList.toggle('invalid', !!msg);
    g.querySelector('.err').textContent = msg || '';
    return !msg;
  }
  ['fName', 'fEmail', 'fPhone', 'fType', 'fBudget', 'fMsg'].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener('input', function () { setErr(el, ''); });
    el.addEventListener('change', function () { setErr(el, ''); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('fName');
    var email = document.getElementById('fEmail');
    var phone = document.getElementById('fPhone');
    var type = document.getElementById('fType');
    var budget = document.getElementById('fBudget');
    var msg = document.getElementById('fMsg');
    var ok = true;
    ok = setErr(name, name.value.trim().length < 3 ? 'Please enter your name.' : '') && ok;
    ok = setErr(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()) ? '' : 'Please enter a valid email.') && ok;
    ok = setErr(phone, phone.value.trim().replace(/\D/g, '').length < 9 ? 'Please enter a valid phone number.' : '') && ok;
    ok = setErr(type, type.value ? '' : 'Please select a project type.') && ok;
    ok = setErr(budget, budget.value ? '' : 'Please select a budget range.') && ok;
    ok = setErr(msg, msg.value.trim().length < 10 ? 'Tell us a little more (min. 10 characters).' : '') && ok;
    if (!ok) {
      note.textContent = 'Please complete the highlighted fields.';
      note.className = 'form-note bad';
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(function () {
      btn.disabled = false;
      btn.textContent = 'Send Inquiry';
      note.textContent = 'Thank you, ' + name.value.trim().split(' ')[0] + '. Your inquiry has been noted — we will reply within 1×24 hours.';
      note.className = 'form-note ok';
      form.reset();
    }, 900);
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();

/* ================================================
   НОВОЗЕЛАНДСЬКА БІЛА — СКРИПТ
================================================ */

(function () {
    'use strict';

    // ── STICKY NAV ────────────────────────────────
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // ── БУРГЕР-МЕНЮ ───────────────────────────────
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    burger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
    });

    // Закрити меню при кліку на посилання
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', false);
        });
    });

    // Закрити меню при кліку поза ним
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navLinks.classList.remove('open');
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', false);
        }
    });

    // ── SMOOTH SCROLL ─────────────────────────────
    // Компенсація висоти навбару при переходах по якорях
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const navHeight = nav.getBoundingClientRect().height;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ── SCROLL REVEAL ─────────────────────────────
    // Додаємо клас .reveal до елементів, які треба анімувати
    const revealSelectors = [
        '.section__text',
        '.section__img-wrap',
        '.card',
        '.stat',
        '.feed-card',
        '.breeding-col',
        '.health-block',
        '.info-item',
        '.proscons__col',
        '.weight-table',
        '.section__intro',
        '.breeding-img-row',
        '.housing-block',
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));

    revealElements.forEach((el, i) => {
        el.classList.add('reveal');
        // Затримка для карток в одному ряду — стаггер
        const parent = el.parentElement;
        const siblings = Array.from(parent.children).filter(c => c.classList.contains(el.classList[0]));
        const idx = siblings.indexOf(el);
        if (idx > 0 && idx < 6) {
            el.style.transitionDelay = `${idx * 0.08}s`;
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
    });

    revealElements.forEach(el => observer.observe(el));

    // ── ACTIVE NAV LINK ───────────────────────────
    // Підсвічує поточний пункт меню при прокрутці
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
    });

    sections.forEach(s => sectionObserver.observe(s));

    // ── ТАБЛИЦЯ: підсвітка рядка при наведенні ────
    // (CSS вже обробляє :hover, але додамо клас для мобільного тапу)
    document.querySelectorAll('.weight-table tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            document.querySelectorAll('.weight-table tbody tr').forEach(r => r.classList.remove('tapped'));
            row.classList.add('tapped');
        });
    });

})();
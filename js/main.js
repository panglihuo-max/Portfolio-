/* Pang Lihour — portfolio interactions & live animations */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Nav: scrolled state + mobile menu ---------- */
  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    }
  });

  /* ---------- Active nav link ---------- */
  var sectionLinks = Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'));
  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sectionLinks.forEach(function (a) {
      var target = document.querySelector(a.getAttribute("href"));
      if (target) sectionObserver.observe(target);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) {
      // stagger siblings inside the same grid
      var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = Math.min(idx, 6) * 80 + "ms";
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Typing effect ---------- */
  var typedEl = document.getElementById("typed");
  var words = ["short videos", "fun stories", "everyday moments", "creative ideas", "brand content"];
  if (!reduceMotion) {
    var wi = 0, ci = words[0].length, deleting = false;
    (function tick() {
      var delay;
      if (!deleting) {
        if (ci < words[wi].length) { ci++; delay = 85; }
        else { deleting = true; delay = 1800; }
      } else if (ci > 0) {
        ci--; delay = 45;
      } else {
        deleting = false; wi = (wi + 1) % words.length; delay = 300;
      }
      typedEl.textContent = words[wi].slice(0, ci);
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Cursor glow ---------- */
  var glow = document.querySelector(".cursor-glow");
  var mouse = { x: -9999, y: -9999 };
  if (finePointer && !reduceMotion) {
    window.addEventListener("pointermove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)";
    }, { passive: true });
  } else {
    glow.style.display = "none";
  }

  /* ---------- Card tilt + spotlight ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
        card.style.transform =
          "perspective(800px) rotateX(" + (0.5 - py) * 10 + "deg) rotateY(" + (px - 0.5) * 12 + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Copy email ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }
  document.getElementById("copyBtn").addEventListener("click", function () {
    var email = "panglihuo@gmail.com";
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); showToast("Email copied ✓"); }
      catch (err) { showToast(email); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { showToast("Email copied ✓"); }, fallback);
    } else {
      fallback();
    }
  });

  /* ---------- Particle network background ---------- */
  var canvas = document.getElementById("particles");
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var w = 0, h = 0;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(90, (w * h) / 16000));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() < 0.7 ? 215 : 190
      });
    }
  }

  var LINK = 130;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // gentle attraction to the cursor
      var mdx = mouse.x - p.x, mdy = mouse.y - p.y;
      var md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 180) {
        p.x += mdx * 0.004;
        p.y += mdy * 0.004;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(" + p.hue + ", 95%, 70%, 0.8)";
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          var a = 1 - Math.sqrt(d2) / LINK;
          ctx.strokeStyle = "rgba(96, 165, 250," + a * 0.28 + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      if (md < 180) {
        ctx.strokeStyle = "rgba(34, 211, 238," + (1 - md / 180) * 0.45 + ")";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  var running = false;
  function loop() {
    if (document.hidden) { running = false; return; }
    draw();
    requestAnimationFrame(loop);
  }
  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  }

  resize();
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      if (reduceMotion) draw();
    }, 150);
  });

  if (reduceMotion) {
    draw(); // single static frame
  } else {
    start();
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) start();
    });
  }
})();

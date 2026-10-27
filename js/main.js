/* Pang Lihour — portfolio interactions & live animations */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  var config = window.SITE_CONFIG || {};

  /* ---------- Profile photo (falls back to "PL" initials) ---------- */
  if (config.profileImage) {
    var probe = new Image();
    probe.onload = function () {
      document.querySelectorAll("[data-profile-photo]").forEach(function (img) {
        img.src = config.profileImage;
        img.hidden = false;
        var figure = img.closest("figure");
        if (figure) figure.hidden = false;
      });
      document.documentElement.classList.add("has-photo");
    };
    probe.src = config.profileImage;
  }

  /* ---------- Featured videos from social media ---------- */
  var PLATFORMS = {
    tiktok: { name: "TikTok", icon: "i-tiktok", brand: "#25f4ee" },
    youtube: { name: "YouTube", icon: "i-youtube", brand: "#ff3b3b" },
    facebook: { name: "Facebook", icon: "i-facebook", brand: "#3b82f6" },
    instagram: { name: "Instagram", icon: "i-instagram", brand: "#e1306c" },
    file: { name: "Video", icon: "i-video", brand: "#60a5fa" }
  };

  // Turns a pasted link into { platform, embed, vertical } or null if unsupported.
  function parseVideo(link, autoplay) {
    var url;
    try { url = new URL(link, window.location.href); } catch (e) { return null; }
    var host = url.hostname.replace(/^(www|m|vm|web)\./, "");
    var path = url.pathname;
    var m;

    if (/\.(mp4|webm|ogg|mov)$/i.test(path)) {
      return { platform: "file", src: url.href, vertical: false };
    }

    if (host === "tiktok.com" && (m = path.match(/\/video\/(\d+)/))) {
      return {
        platform: "tiktok",
        vertical: true,
        embed: "https://www.tiktok.com/player/v1/" + m[1] +
          "?autoplay=" + (autoplay ? 1 : 0) + "&muted=1&loop=1&rel=0&description=0&music_info=0"
      };
    }

    if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com") {
      var ytParams = "autoplay=" + (autoplay ? 1 : 0) + "&mute=1&playsinline=1&rel=0&modestbranding=1";
      var list = url.searchParams.get("list");
      var id = null;
      if (host === "youtu.be") id = path.slice(1).split("/")[0];
      else if ((m = path.match(/^\/(shorts|embed|live)\/([\w-]{6,})/))) id = m[2];
      else id = url.searchParams.get("v");
      if (id) {
        return {
          platform: "youtube",
          vertical: /^\/shorts\//.test(path),
          embed: "https://www.youtube-nocookie.com/embed/" + id + "?" + ytParams + "&loop=1&playlist=" + id
        };
      }
      if (list) {
        return {
          platform: "youtube",
          vertical: false,
          embed: "https://www.youtube-nocookie.com/embed/videoseries?list=" + encodeURIComponent(list) + "&" + ytParams + "&loop=1"
        };
      }
      return null;
    }

    if (host === "facebook.com" || host === "fb.watch") {
      return {
        platform: "facebook",
        vertical: /\/reels?\//.test(path),
        embed: "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(url.href) +
          "&show_text=false&autoplay=" + (autoplay ? "true" : "false") + "&mute=1"
      };
    }

    if (host === "instagram.com" && (m = path.match(/^\/(p|reel|reels|tv)\/([\w-]+)/))) {
      return {
        platform: "instagram",
        vertical: true,
        embed: "https://www.instagram.com/" + (m[1] === "p" ? "p" : "reel") + "/" + m[2] + "/embed"
      };
    }

    return null;
  }

  function buildVideoCard(video, link, index) {
    var info = PLATFORMS[video.platform];
    var card = document.createElement("article");
    card.className = "vcard glass reveal" + (video.vertical ? "" : " wide");
    card.style.setProperty("--brand", info.brand);

    var frame = document.createElement("div");
    frame.className = "vframe" + (video.vertical ? " vertical" : "");
    var title = "Pang Lihour on " + info.name + " — video " + (index + 1);

    if (video.platform === "file") {
      var vid = document.createElement("video");
      vid.src = video.src;
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.controls = true;
      vid.preload = "metadata";
      vid.setAttribute("aria-label", title);
      vid.addEventListener("loadedmetadata", function () {
        if (vid.videoHeight > vid.videoWidth) {
          frame.classList.add("vertical");
          card.classList.remove("wide");
        }
      });
      frame.appendChild(vid);
    } else {
      var iframe = document.createElement("iframe");
      iframe.title = title;
      iframe.dataset.src = video.embed;
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("loading", "lazy");
      frame.appendChild(iframe);
    }

    var meta = document.createElement("a");
    meta.className = "vmeta";
    meta.href = video.platform === "file" ? video.src : link;
    meta.target = "_blank";
    meta.rel = "noopener";
    meta.innerHTML =
      '<span class="vbadge"><svg><use href="#' + info.icon + '" /></svg></span>' +
      "<span>" + (video.platform === "file" ? "Open video" : "Watch on " + info.name) + "</span>" +
      '<svg class="ico"><use href="#i-arrow" /></svg>';

    card.appendChild(frame);
    card.appendChild(meta);
    return card;
  }

  var videoLinks = (config.videos || []).filter(function (v) { return typeof v === "string" && v.trim(); });
  var autoplayVideos = config.autoplay !== false && !reduceMotion;
  var videoGrid = document.getElementById("videoGrid");
  var videoCount = 0;

  videoLinks.forEach(function (link) {
    var video = parseVideo(link.trim(), autoplayVideos);
    if (!video) {
      if (window.console) console.warn("Unsupported video link in js/config.js:", link);
      return;
    }
    videoGrid.appendChild(buildVideoCard(video, link.trim(), videoCount++));
  });

  if (videoCount) {
    document.getElementById("videos").hidden = false;
    document.querySelector("[data-videos-link]").hidden = false;

    // Embeds load (and start playing) only when they scroll into view;
    // own video files pause again when they leave the screen.
    var startVideo = function (frame) {
      var iframe = frame.querySelector("iframe[data-src]");
      if (iframe) {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute("data-src");
      }
    };
    var frames = videoGrid.querySelectorAll(".vframe");
    if ("IntersectionObserver" in window) {
      var videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var vid = entry.target.querySelector("video");
          if (entry.isIntersecting) {
            startVideo(entry.target);
            if (vid && autoplayVideos) vid.play().catch(function () {});
          } else if (vid) {
            vid.pause();
          }
        });
      }, { threshold: 0.35 });
      frames.forEach(function (f) { videoObserver.observe(f); });
    } else {
      frames.forEach(startVideo);
    }
  }

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

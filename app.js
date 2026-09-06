/* =========================================================================
   The Beach School @ Port Dickson — app
   Renders window.TRIP (see data.js). No build step, no dependencies.
   ========================================================================= */
(function () {
  "use strict";
  const T = window.TRIP;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const STORAGE_KEY = "pd2026.packing";

  /* ----------------------------------------------------------- helpers */
  function pad(n) { return String(n).padStart(2, "0"); }
  function todayISO(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function daysBetween(fromISO, toISO) {
    const a = new Date(fromISO + "T12:00:00");
    const b = new Date(toISO + "T12:00:00");
    return Math.round((b - a) / 86400000);
  }
  /* "7:15am" -> minutes since midnight */
  function toMinutes(t) {
    const m = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(String(t).trim());
    if (!m) return null;
    let h = parseInt(m[1], 10) % 12;
    if (m[3].toLowerCase() === "pm") h += 12;
    return h * 60 + parseInt(m[2], 10);
  }
  function nowMinutes(d) { d = d || new Date(); return d.getHours() * 60 + d.getMinutes(); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function mapLink(address) {
    const url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
    return `<a class="maplink" href="${url}" target="_blank" rel="noopener">${ICON.pin} Open in Maps</a>` +
           `<span class="addr">${esc(address)}</span>`;
  }
  function photo(p, cls) {
    if (!p || !p.src) return "";
    const pos = p.position ? ` style="object-position:${esc(p.position)}"` : "";
    return `<figure class="${cls}"><img src="${esc(p.src)}" alt="${esc(p.alt || "")}" loading="lazy" decoding="async"${pos}>` +
           `${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}</figure>`;
  }
  function payTag(pay) {
    if (pay === "han") return `<span class="tag tag--han">By Han</span>`;
    if (pay === "own") return `<span class="tag tag--own">Own pay · RM</span>`;
    return "";
  }

  const ICON = {
    bus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 10h16M8 21v-3M16 21v-3"/><circle cx="8" cy="14.5" r="1" fill="currentColor"/><circle cx="16" cy="14.5" r="1" fill="currentColor"/></svg>`,
    home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>`,
    cash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M7 12h.01M17 12h.01"/></svg>`,
    food: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/><path d="M5 12a7 7 0 0 1 14 0"/><path d="M3 16h18"/><path d="M12 5V3"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/></svg>`
  };

  /* ------------------------------------------------------------ status */
  function tripPhase(iso) {
    if (iso < T.start) return { phase: "before", n: daysBetween(iso, T.start) };
    if (iso > T.end) return { phase: "after" };
    return { phase: "during", n: daysBetween(T.start, iso) };
  }
  function renderStatus() {
    const iso = todayISO();
    const p = tripPhase(iso);
    let html;
    if (p.phase === "before") {
      html = `<span class="big">T-minus ${p.n}</span><span class="small">${p.n === 1 ? "1 day to go" : p.n + " days to go"}</span>`;
    } else if (p.phase === "during") {
      const d = T.days[p.n];
      html = `<span class="big">Day ${p.n + 1} of ${T.days.length}</span><span class="small">${esc(d.weekday)} ${d.dayNum} Sept · today</span>`;
    } else {
      html = `<span class="big">Home sweet home</span><span class="small">That's a wrap</span>`;
    }
    $("#status").innerHTML = html;
    return p;
  }

  /* ---------------------------------------------------------- key info */
  function renderInfo() {
    $("#info-grid").innerHTML = T.keyInfo.map(card => {
      const lines = (card.lines || []).map(l => `<li>${esc(l)}</li>`).join("");
      const places = (card.places || []).map(pl =>
        `<li class="place${pl.image ? " place--photo" : ""}">` +
        `${pl.image ? `<img class="place__thumb" src="${esc(pl.image)}" alt="" loading="lazy" decoding="async">` : ""}` +
        `<span><span class="place__name">${esc(pl.name)}</span><br>${mapLink(pl.address)}</span></li>`).join("");
      return `<div class="card info-card${card.accent ? " info-card--accent" : ""}">
        <div class="info-card__icon">${ICON[card.icon] || ""}</div>
        <div><h3>${esc(card.title)}</h3><ul>${places}${lines}</ul></div>
      </div>`;
    }).join("");
  }

  /* ------------------------------------------------------------- days */
  function renderTabs(selectedIdx, todayIdx) {
    $("#daytabs").innerHTML = T.days.map((d, i) =>
      `<button class="tab${i === todayIdx ? " tab--today" : ""}" role="tab" id="tab-${i}"
        aria-selected="${i === selectedIdx}" aria-controls="day-${i}" tabindex="${i === selectedIdx ? 0 : -1}" data-idx="${i}">
        <span class="tab__wd">${esc(d.weekday)}</span><span class="tab__num">${d.dayNum}</span>
      </button>`).join("");
  }
  function renderItem(it) {
    const cls = ["tl-item", "tl-item--" + it.kind, it.pay === "own" ? "tl-item--own" : ""].join(" ");
    const steps = it.steps ? `<div class="steps">${it.steps.map(s =>
      `<div class="step${s.meal ? " step--meal" : ""}" data-min="${toMinutes(s.time)}">
        <span class="step__time">${esc(s.time)}</span><span class="step__text">${esc(s.text)}</span>
      </div>`).join("")}</div>` : "";
    let menu = "";
    if (it.menu) {
      menu = `<details class="menu"><summary>${esc(it.menuTitle || "Menu")}</summary>
        <ul>${it.menu.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
        ${it.vegan ? `<p class="vegan">Vegan option</p><ul>${it.vegan.map(m => `<li>${esc(m)}</li>`).join("")}</ul>` : ""}
      </details>`;
    }
    return `<div class="${cls}" data-min="${toMinutes(it.time)}">
      <div class="tl-time">${esc(it.time)}</div>
      <div class="tl-body">
        <div class="tl-title"><span>${esc(it.title)}</span>${payTag(it.pay)}<span class="now-slot"></span></div>
        ${it.note ? `<p class="tl-note">${esc(it.note)}</p>` : ""}
        ${it.address ? mapLink(it.address) : ""}
        ${photo(it.image, "tl-photo")}
        ${steps}${menu}
      </div>
    </div>`;
  }
  function renderPanels(selectedIdx) {
    $("#daypanels").innerHTML = T.days.map((d, i) =>
      `<section class="day" id="day-${i}" role="tabpanel" aria-labelledby="tab-${i}"${i === selectedIdx ? "" : " hidden"}>
        <div class="day__head">
          <p class="day__date">Day ${i + 1} · ${esc(d.weekday)} ${d.dayNum} Sept</p>
          <h3 class="day__title">${esc(d.title)}</h3>
        </div>
        ${photo(d.cover, "cover")}
        ${d.handy && d.handy.length ? `<div class="handy"><p class="handy__label">Pack for today</p><ul>${d.handy.map(h => `<li>${esc(h)}</li>`).join("")}</ul></div>` : ""}
        ${d.blocks.map(b => `<div class="part"><p class="part__label">${esc(b.part)}</p><div class="tl">${b.items.map(renderItem).join("")}</div></div>`).join("")}
      </section>`).join("");
  }
  function selectDay(idx, focus) {
    document.querySelectorAll(".tab").forEach(t => {
      const on = Number(t.dataset.idx) === idx;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
      if (on) t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    document.querySelectorAll(".day").forEach((p, i) => { p.hidden = i !== idx; });
  }
  function wireTabs() {
    const tabs = $("#daytabs");
    tabs.addEventListener("click", e => {
      const t = e.target.closest(".tab"); if (!t) return;
      selectDay(Number(t.dataset.idx));
    });
    tabs.addEventListener("keydown", e => {
      const cur = document.activeElement.closest && document.activeElement.closest(".tab"); if (!cur) return;
      let i = Number(cur.dataset.idx);
      if (e.key === "ArrowRight") i = (i + 1) % T.days.length;
      else if (e.key === "ArrowLeft") i = (i - 1 + T.days.length) % T.days.length;
      else if (e.key === "Home") i = 0;
      else if (e.key === "End") i = T.days.length - 1;
      else return;
      e.preventDefault(); selectDay(i, true);
    });
  }

  /* "Now" marker: only on today's panel during the trip */
  function markNow(todayIdx) {
    document.querySelectorAll(".is-now").forEach(el => el.classList.remove("is-now"));
    document.querySelectorAll(".is-past").forEach(el => el.classList.remove("is-past"));
    document.querySelectorAll(".now-slot").forEach(el => { el.innerHTML = ""; });
    if (todayIdx < 0) return;
    const panel = $("#day-" + todayIdx); if (!panel) return;
    const now = nowMinutes();
    const items = Array.from(panel.querySelectorAll(".tl-item"));
    let current = null;
    items.forEach(it => {
      const m = Number(it.dataset.min);
      if (!isNaN(m) && m <= now) { current = it; }
    });
    items.forEach(it => { if (it !== current && Number(it.dataset.min) <= now) it.classList.add("is-past"); });
    if (!current) return;
    current.classList.add("is-now");
    const slot = current.querySelector(".now-slot");
    if (slot) slot.innerHTML = `<span class="tag tag--now">Now</span>`;
    let curStep = null;
    current.querySelectorAll(".step").forEach(s => { if (Number(s.dataset.min) <= now) curStep = s; });
    if (curStep) curStep.classList.add("is-now");
  }

  /* -------------------------------------------------------- meals glance */
  function renderGlance() {
    const row = (label, m) => `<div class="glance-row">
      <span class="glance-row__label">${label}</span>
      <span class="glance-row__text">${payTag(m.pay)}${esc(m.text)}${m.extra ? `<span class="glance-row__extra">${esc(m.extra)}</span>` : ""}</span>
    </div>`;
    $("#glance").innerHTML = T.mealsGlance.map(g =>
      `<div class="card glance-day"><h3>${esc(g.day)}</h3>${row("Breakfast", g.breakfast)}${row("Lunch", g.lunch)}${row("Dinner", g.dinner)}</div>`).join("");
  }

  /* ----------------------------------------------------------- packing */
  function loadTicks() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function saveTicks(t) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); } catch (e) { /* private mode etc. */ }
  }
  function renderPacking() {
    const ticks = loadTicks();
    $("#pack-groups").innerHTML = T.packing.map(g => `<div class="card pack-group"><h3>${esc(g.group)}</h3>
      ${g.items.map(it => `<label class="pack-item${it.must ? " pack-item--must" : ""}${ticks[it.id] ? " is-done" : ""}" data-id="${esc(it.id)}">
        <input type="checkbox" ${ticks[it.id] ? "checked" : ""}>
        <span class="pack-item__text"><span>${esc(it.text)}</span>${it.must ? `<span class="tag tag--must">Must bring</span>` : ""}
          ${it.note ? `<span class="pack-item__note">${esc(it.note)}</span>` : ""}</span>
      </label>`).join("")}
    </div>`).join("");
    updateProgress();
  }
  function updateProgress() {
    const boxes = Array.from(document.querySelectorAll(".pack-item input"));
    const done = boxes.filter(b => b.checked).length;
    $("#progress-text").textContent = `${done} of ${boxes.length} packed`;
    $("#progress-fill").style.width = boxes.length ? (done / boxes.length * 100) + "%" : "0%";
  }
  function wirePacking() {
    $("#pack-groups").addEventListener("change", e => {
      const box = e.target; if (box.type !== "checkbox") return;
      const item = box.closest(".pack-item");
      const ticks = loadTicks();
      if (box.checked) ticks[item.dataset.id] = true; else delete ticks[item.dataset.id];
      saveTicks(ticks);
      item.classList.toggle("is-done", box.checked);
      updateProgress();
    });
    $("#reset-packing").addEventListener("click", () => {
      if (!confirm("Untick everything on this phone?")) return;
      saveTicks({});
      renderPacking();
    });
  }

  /* ----------------------------------------------------------- credits */
  function renderCredits() {
    const el = $("#credits"); if (!el) return;
    const photos = [];
    T.days.forEach(d => {
      if (d.cover) photos.push(d.cover);
      d.blocks.forEach(b => b.items.forEach(it => { if (it.image) photos.push(it.image); }));
    });
    const seen = new Set();
    const parts = photos.filter(p => p.credit && !seen.has(p.src) && seen.add(p.src)).map(p => {
      const c = p.credit;
      const name = c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title || "photo")}</a>` : esc(c.title || "photo");
      return `${name} by ${esc(c.author)}, ${esc(c.license)}`;
    });
    el.innerHTML = parts.length ? "Photos via Wikimedia Commons: " + parts.join(" · ") : "";
  }

  /* -------------------------------------------------------------- init */
  function init() {
    const p = renderStatus();
    const todayIdx = p.phase === "during" ? p.n : -1;
    const selected = p.phase === "during" ? p.n : (p.phase === "after" ? T.days.length - 1 : 0);
    renderInfo();
    renderTabs(selected, todayIdx);
    renderPanels(selected);
    wireTabs();
    markNow(todayIdx);
    renderGlance();
    renderPacking();
    wirePacking();
    $("#disclaimer").textContent = T.disclaimer;
    $("#updated").textContent = "Updated " + T.updated;
    renderCredits();

    /* keep "Now" fresh; re-evaluate the day at midnight too */
    setInterval(() => {
      const q = renderStatus();
      const tIdx = q.phase === "during" ? q.n : -1;
      if (tIdx !== todayIdx) { location.reload(); return; }
      markNow(tIdx);
    }, 60000);

    if ("serviceWorker" in navigator && location.protocol === "https:") {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }
  document.addEventListener("DOMContentLoaded", init);
})();

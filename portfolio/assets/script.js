(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     Footer year
     ---------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     Mobile nav toggle
     ---------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------
     Hero terminal boot sequence
     ---------------------------------------------------------- */
  var lines = [
    { prompt: "$ whoami", result: "sam-the-devops" },
    { prompt: "$ role --list", result: "DevOps Engineer / AI Engineering / Cloud & Automation" },
    { prompt: "$ education", result: "B.Tech Computer Science, 2023\u20132027" },
    { prompt: "$ status", result: "online \u2014 building production-ready systems", highlight: true }
  ];

  var output = document.getElementById("typedOutput");
  var cursor = document.getElementById("typedCursor");

  function renderStatic() {
    var text = "";
    lines.forEach(function (l) {
      text += l.prompt + "\n> " + l.result + "\n\n";
    });
    output.textContent = text.trim();
  }

  function typeSequence() {
    var lineIndex = 0;
    var charIndex = 0;
    var phase = "prompt"; // prompt -> result
    var current = "";

    function tick() {
      if (lineIndex >= lines.length) {
        cursor.style.opacity = "1";
        return;
      }
      var line = lines[lineIndex];
      var target = phase === "prompt" ? line.prompt : "> " + line.result;

      if (charIndex <= target.length) {
        var partial = target.slice(0, charIndex);
        output.textContent = current + partial;
        charIndex++;
        window.setTimeout(tick, phase === "prompt" ? 32 : 14);
      } else {
        current += target + "\n";
        charIndex = 0;
        if (phase === "prompt") {
          phase = "result";
          window.setTimeout(tick, 150);
        } else {
          phase = "prompt";
          current += "\n";
          lineIndex++;
          window.setTimeout(tick, 220);
        }
      }
    }
    tick();
  }

  if (output) {
    if (reduceMotion) {
      renderStatic();
    } else {
      typeSequence();
    }
  }

  /* ----------------------------------------------------------
     Live GitHub contribution graph
     ---------------------------------------------------------- */
  var GITHUB_USERNAME = "SAM-THE-DEVOPS";
  var graphEl = document.getElementById("contribGraph");
  var fallbackEl = document.getElementById("contribFallback");

  function showFallback() {
    if (graphEl) graphEl.hidden = true;
    if (fallbackEl) fallbackEl.hidden = false;
  }

  function levelToColor(level) {
    switch (level) {
      case 4: return "#34e2e2";
      case 3: return "#2f6fed";
      case 2: return "#1c46a8";
      case 1: return "#152c5c";
      default: return null; // use CSS default (empty cell)
    }
  }

  function renderGraph(weeks) {
    if (!graphEl || !weeks || !weeks.length) {
      showFallback();
      return;
    }
    var frag = document.createDocumentFragment();
    weeks.forEach(function (week) {
      week.contributionDays.forEach(function (day) {
        var cell = document.createElement("div");
        cell.className = "contrib-cell";
        var color = levelToColor(day.level);
        if (color) cell.style.background = color;
        cell.title = day.date + ": " + day.count + " contribution" + (day.count === 1 ? "" : "s");
        frag.appendChild(cell);
      });
    });
    graphEl.appendChild(frag);
  }

  // jogruber's public GitHub contributions API returns a flat list of
  // { date, count, level } entries; normalize into 7-row weeks for the grid.
  function normalize(contributions) {
    if (!contributions || !contributions.length) return null;
    var weeks = [];
    var currentWeek = [];
    contributions.forEach(function (day, i) {
      var dow = new Date(day.date + "T00:00:00Z").getUTCDay();
      if (i === 0) {
        for (var pad = 0; pad < dow; pad++) currentWeek.push({ date: "", count: 0, level: 0, empty: true });
      }
      currentWeek.push(day);
      if (dow === 6) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    });
    if (currentWeek.length) weeks.push({ contributionDays: currentWeek });
    return weeks;
  }

  if (graphEl) {
    fetch("https://github-contributions-api.jogruber.de/api/v1/" + GITHUB_USERNAME + "?y=last")
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then(function (data) {
        var weeks = normalize(data && data.contributions);
        if (weeks) {
          renderGraph(weeks);
        } else {
          showFallback();
        }
      })
      .catch(function () {
        showFallback();
      });
  }
})();

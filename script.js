// =========================================================
// नोमन मोबाइल रिपेयरिंग सेंटर — इंटरैक्शन (हिन्दी वर्शन)
// =========================================================

// ---------- Mobile nav toggle ----------
(function(){
  const header = document.querySelector('.site-header');
  const toggle = document.getElementById('menuToggle');
  if(!toggle) return;

  toggle.addEventListener('click', function(){
    const isOpen = header.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('#main-nav a').forEach(function(link){
    link.addEventListener('click', function(){
      header.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Grand opening countdown: 20 August 2026 ----------
(function(){
  const target = new Date('2026-08-20T00:00:00');
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
  };
  if(!els.days) return;

  function pad(n){ return String(n).padStart(2, '0'); }

  function tick(){
    const now = new Date();
    let diff = target - now;

    if(diff <= 0){
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.mins.textContent = '00';
      els.secs.textContent = '00';
      return;
    }

    const day = Math.floor(diff / (1000*60*60*24));
    diff -= day * (1000*60*60*24);
    const hr = Math.floor(diff / (1000*60*60));
    diff -= hr * (1000*60*60);
    const min = Math.floor(diff / (1000*60));
    diff -= min * (1000*60);
    const sec = Math.floor(diff / 1000);

    els.days.textContent = pad(day);
    els.hours.textContent = pad(hr);
    els.mins.textContent = pad(min);
    els.secs.textContent = pad(sec);
  }

  tick();
  setInterval(tick, 1000);
})();

// ---------- Diagnostic job ticket: cycling demo + status stepper ----------
(function(){
  const deviceEl = document.getElementById('ticket-device');
  const issueEl  = document.getElementById('ticket-issue');
  const statusSteps = document.querySelectorAll('#ticket-status .status-step');
  if(!deviceEl || !issueEl) return;

  const jobs = [
    { device: 'iPhone 13',           issue: 'टूटी हुई स्क्रीन' },
    { device: 'Samsung Galaxy S23',  issue: 'बैटरी जल्दी खत्म होना' },
    { device: 'Redmi Note 12',       issue: 'चार्ज नहीं हो रहा' },
    { device: 'OnePlus Nord',        issue: 'पानी से खराब' },
    { device: 'Vivo Y-सीरीज़',       issue: 'स्पीकर काम नहीं कर रहा' },
    { device: 'Oppo A-सीरीज़',       issue: 'लोगो स्क्रीन पर अटका हुआ' },
  ];

  let jobIndex = 0;
  let stepIndex = 0;

  function paintStep(){
    statusSteps.forEach(function(step, i){
      step.classList.remove('is-active', 'is-done');
      if(i < stepIndex) step.classList.add('is-done');
      if(i === stepIndex) step.classList.add('is-active');
    });
  }

  function swapJob(){
    deviceEl.style.opacity = 0;
    issueEl.style.opacity = 0;
    setTimeout(function(){
      jobIndex = (jobIndex + 1) % jobs.length;
      deviceEl.textContent = jobs[jobIndex].device;
      issueEl.textContent = jobs[jobIndex].issue;
      deviceEl.style.opacity = 1;
      issueEl.style.opacity = 1;
    }, 250);
  }

  deviceEl.style.transition = 'opacity 0.25s ease';
  issueEl.style.transition = 'opacity 0.25s ease';

  paintStep();

  // advance the repair status every 1.8s, looping through the 3 steps
  setInterval(function(){
    stepIndex = (stepIndex + 1) % statusSteps.length;
    paintStep();
    // whenever we loop back to the first step, load a "new" job into the ticket
    if(stepIndex === 0) swapJob();
  }, 1800);
})();

document.addEventListener('DOMContentLoaded', function () {
  initHero();
  init404Timer();
});

// Home page hero fade-in
function initHero() {
  var hero = document.querySelector('.hero-inner');
  if (!hero) return;

  if (typeof anime === 'function') {
    anime({
      targets: hero,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutQuad'
    });
  } else {
    hero.style.opacity = 1;
  }
}

// 404 page: running mm:ss counter, purely decorative (echoes a
// broadcast timecode readout)
function init404Timer() {
  var timer = document.getElementById('tv404Timer');
  if (!timer) return;

  var seconds = 0;

  setInterval(function () {
    seconds += 1;
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    timer.textContent =
      String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }, 1000);
}

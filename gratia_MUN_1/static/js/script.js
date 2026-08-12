document.addEventListener('DOMContentLoaded', function () {
  initHero();
  init404Timer();
  setupSecretariatModal();
  setupCommitteeModal();
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

// About page: fill the shared secretariat modal from the card that
// triggered it, and give the photo a little zoom-in flourish.
function setupSecretariatModal() {
  var cards = document.querySelectorAll('.secretariat-card');
  var modalEl = document.getElementById('secretariatModal');
  if (!cards.length || !modalEl || typeof bootstrap === 'undefined') return;

  var modalPhoto = modalEl.querySelector('.modal-member-photo');
  var modalName = modalEl.querySelector('.modal-title');
  var modalRole = modalEl.querySelector('.modal-role');
  var modalEmailLink = modalEl.querySelector('.modal-email a');
  var bsModal = new bootstrap.Modal(modalEl);

  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;

      modalPhoto.src = card.dataset.photo;
      modalPhoto.alt = card.dataset.name;
      modalName.textContent = card.dataset.name;
      modalRole.textContent = card.dataset.title;
      modalEmailLink.textContent = card.dataset.email;
      modalEmailLink.href = 'mailto:' + card.dataset.email;
      bsModal.show();

      if (typeof anime === 'function') {
        anime({
          targets: modalPhoto,
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutCubic'
        });
      }
    });
  });
}

// Committees page: fill the shared committee modal from the card that
// triggered it, and give the photo the same zoom-in flourish.
function setupCommitteeModal() {
  var cards = document.querySelectorAll('.committee-card');
  var modalEl = document.getElementById('committeeModal');
  if (!cards.length || !modalEl || typeof bootstrap === 'undefined') return;

  var modalPhoto = modalEl.querySelector('.modal-committee-photo');
  var modalName = modalEl.querySelector('.modal-title');
  var modalChairs = modalEl.querySelector('.modal-chairs');
  var modalTopic = modalEl.querySelector('.modal-topic');
  var modalPaperLink = modalEl.querySelector('.modal-paper-link');
  var bsModal = new bootstrap.Modal(modalEl);

  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;

      modalPhoto.src = card.dataset.photo;
      modalPhoto.alt = card.dataset.name + ' chairs';
      modalName.textContent = card.dataset.name;
      modalChairs.textContent = 'Chairs: ' + card.dataset.chairs;
      modalTopic.textContent = 'Topic: ' + card.dataset.topic;

      if (card.dataset.paperUrl) {
        modalPaperLink.href = card.dataset.paperUrl;
        modalPaperLink.textContent = card.dataset.paperLabel;
        modalPaperLink.classList.remove('d-none');
      } else {
        modalPaperLink.classList.add('d-none');
      }

      bsModal.show();

      if (typeof anime === 'function') {
        anime({
          targets: modalPhoto,
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutCubic'
        });
      }
    });
  });
}

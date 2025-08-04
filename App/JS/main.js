const containerWrapper = document.getElementById('contentWapper');

let startX = 0;
let currentIndex = 1;
const containerKeys = ['userContainer', 'homeContainer', 'settingsContainer'];
const iconIDs = ['userIcon', 'homeIcon', 'settingsIcon'];

const containers = {
  user: document.getElementById('userContainer'),
  home: document.getElementById('homeContainer'),
  settings: document.getElementById('settingsContainer')
};

const icons = iconIDs.map(id => document.getElementById(id));

function updatePositionByIndex(index) {
  // Set active icon
  icons.forEach(i => i.classList.remove('active'));
  document.getElementById(iconIDs[index]).classList.add('active');

  // Reset all positions
  Object.values(containers).forEach(c => c.classList.remove('left', 'center', 'right'));

  if (index === 0) {
    containers.user.classList.add('center');
    containers.home.classList.add('right');
    containers.settings.classList.add('right');
  } else if (index === 1) {
    containers.home.classList.add('center');
    containers.user.classList.add('left');
    containers.settings.classList.add('right');
  } else if (index === 2) {
    containers.settings.classList.add('center');
    containers.home.classList.add('left');
    containers.user.classList.add('left');
  }
}

containerWrapper.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

containerWrapper.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    // Swipe left
    if (diff > 0 && currentIndex < 2) {
      currentIndex++;
      updatePositionByIndex(currentIndex);
    }
    // Swipe right
    if (diff < 0 && currentIndex > 0) {
      currentIndex--;
      updatePositionByIndex(currentIndex);
    }
  }
});

// Also update on icon click:
icons.forEach((icon, i) => {
  icon.addEventListener('click', () => {
    currentIndex = i;
    updatePositionByIndex(currentIndex);
  });
});



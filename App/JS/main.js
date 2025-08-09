const slides = document.getElementById('slides');
const navIcons = document.querySelectorAll('.nav-icon');
let currentIndex = 1; // Start at middle slide (Home)
const gap = 40; // gap-10 in Tailwind is 2.5rem = 40px

// Get slide width (without gap)
function getSlideWidth() {
  return document.querySelector('.slide').getBoundingClientRect().width;
}

// Get full step between slides (slide width + gap)
function getSlideStep() {
  return getSlideWidth() + gap;
}

// Update slide position and active nav icon
function updateSlidePosition() {
  const slideWidth = getSlideWidth();
  const step = getSlideStep();
  const viewportWidth = window.innerWidth;
  const initialOffset = (viewportWidth - slideWidth) / 2;

  const translateX = -currentIndex * step + initialOffset;
  slides.style.transform = `translateX(${translateX}px)`;

  navIcons.forEach((icon, idx) => {
    if (idx === currentIndex) {
      icon.classList.add('opacity-100', 'shadow-[0_0_15px_cyan]');
      icon.classList.remove('opacity-40', 'shadow-[0_0_5px_cyan]');
    } else {
      icon.classList.remove('opacity-100', 'shadow-[0_0_15px_cyan]');
      icon.classList.add('opacity-40', 'shadow-[0_0_5px_cyan]');
    }
  });
}

// Nav icon click handler
navIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    currentIndex = Number(icon.dataset.slide);
    updateSlidePosition();
  });
});

// Drag/swipe support variables
let startX = 0;
let currentTranslate = 0;
let isDragging = false;

// Helper to get pointer X position
function getX(e) {
  if (e.type.startsWith('touch')) {
    return e.touches[0]?.clientX || e.changedTouches[0]?.clientX || 0;
  }
  return e.clientX;
}

// Drag start event
function dragStart(e) {
  isDragging = true;
  startX = getX(e);

  const slideWidth = getSlideWidth();
  const step = getSlideStep();
  const viewportWidth = window.innerWidth;
  const initialOffset = (viewportWidth - slideWidth) / 2;

  currentTranslate = -currentIndex * step + initialOffset;
  slides.style.transition = 'none';
}

// Drag move event
function dragMove(e) {
  if (!isDragging) return;
  const currentX = getX(e);
  const deltaX = currentX - startX;
  slides.style.transform = `translateX(${currentTranslate + deltaX}px)`;
}

// Drag end event
function dragEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  const endX = getX(e);
  const deltaX = endX - startX;

  const step = getSlideStep();
  const threshold = step / 4;

  if (deltaX > threshold && currentIndex > 0) {
    currentIndex--;
  } else if (deltaX < -threshold && currentIndex < navIcons.length - 1) {
    currentIndex++;
  }

  slides.style.transition = 'transform 0.4s ease';
  updateSlidePosition();
}

// Attach mouse and touch event listeners
const slider = document.getElementById('slider');
slider.addEventListener('touchstart', dragStart, { passive: true });
slider.addEventListener('touchmove', dragMove, { passive: true });
slider.addEventListener('touchend', dragEnd);

slider.addEventListener('mousedown', dragStart);
slider.addEventListener('mousemove', dragMove);
slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('mouseleave', dragEnd);

// Update slide position on window resize
window.addEventListener('resize', updateSlidePosition);

// Initialize slider position on page load
updateSlidePosition();

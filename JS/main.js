const slides = document.getElementById('slides');
const navIcons = document.querySelectorAll('.nav-icon');
let currentIndex = 1; 
const gap = 32; 

function getSlideWidth() {
  return document.querySelector('.slide').getBoundingClientRect().width;
}


function getSlideStep() {
  return getSlideWidth() + gap;
}

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

  document.querySelectorAll('.slide').forEach((slide, idx) => {
    if (idx === currentIndex) {
      slide.classList.add('active-slide');
    } else {
      slide.classList.remove('active-slide');
    }
  });
}


navIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    currentIndex = Number(icon.dataset.slide);
    updateSlidePosition();
  });
});


let startX = 0;
let currentTranslate = 0;
let isDragging = false;

function getX(e) {
  if (e.type.startsWith('touch')) {
    return e.touches[0]?.clientX || e.changedTouches[0]?.clientX || 0;
  }
  return e.clientX;
}

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


function dragMove(e) {
  if (!isDragging) return;
  const currentX = getX(e);
  const deltaX = currentX - startX;
  slides.style.transform = `translateX(${currentTranslate + deltaX}px)`;
}

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


const slider = document.getElementById('slider');
slider.addEventListener('touchstart', dragStart, { passive: true });
slider.addEventListener('touchmove', dragMove, { passive: true });
slider.addEventListener('touchend', dragEnd);

slider.addEventListener('mousedown', dragStart);
slider.addEventListener('mousemove', dragMove);
slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('mouseleave', dragEnd);

window.addEventListener('resize', updateSlidePosition);


const icons = document.querySelectorAll('.app-icon');
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const rect = icon.getBoundingClientRect();
    const className = `app-window-clone ${rect.top}-${rect.left}`;

    const clone = document.createElement('div');
    clone.className = className;
    clone.style.left = rect.left + "px";
    clone.style.top = rect.top + "px";
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";

    document.body.appendChild(clone);
    icons.forEach(icon => icon.style.opacity = "0");
    clone.getBoundingClientRect();
    clone.style.position = "fixed";
    clone.style.top = "50%";
    clone.style.left = "50%";
    clone.style.transform = "translate(-50%, -50%)";
    
    clone.style.width = "100vw";
    clone.style.height = "100vh";

    setTimeout(() => {
      
      const appWindow = document.querySelector('.app-window');
      appWindow.classList.add('active');
    }, 300);
  });
});


document.getElementById('closeApp').addEventListener('click', () => {
  document.querySelector('.app-window').classList.remove('active');
  const clone = document.querySelector('.app-window-clone');
  if (clone) {
    setTimeout(() => {
        const className = clone.className;
        const [top, left] = className.replace("app-window-clone ", "").split("-");
        clone.style.top = (parseInt(top) + 50) + "px";
        clone.style.left = (parseInt(left) + 50) + "px";
        clone.style.width = "10px";
        clone.style.height = "10px";
        clone.style.transform = "translate(0, 0)";
        icons.forEach(icon => icon.style.opacity = "1");
      setTimeout(() => {
        clone.remove();
      }, 300);
    }, 0);
  }
});




window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.style.transition = 'opacity 1s ease';
      loader.style.opacity = '0';
      navIcons[1].click();

      setTimeout(() => {
        loader.remove();

        // Animate the app icons in sequence
        const apps = document.querySelectorAll('.app-icon');
        apps.forEach((app, i) => {
          setTimeout(() => {
            app.classList.add('active');
          }, i * 10); // stagger by 10ms each
        });

      }, 1000);
    }, 1000);
  }
});
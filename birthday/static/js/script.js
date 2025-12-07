// ---------------------------
// 🎵 Smooth Scroll to Section
// ---------------------------
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// ---------------------------
// 🎶 Background Music Player
// ---------------------------
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      bgMusic.play();
      isPlaying = true;
      musicBtn.textContent = "⏸️ Pause Music";
    } else {
      bgMusic.pause();
      isPlaying = false;
      musicBtn.textContent = "🎵 Play Music";
    }
  });
}

// ---------------------------
// ❤️ Days Counter
// ---------------------------
const startDate = new Date("2023-08-01"); // 🔸 Change to your relationship start date
const today = new Date();
const diffTime = Math.abs(today - startDate);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
const daysEl = document.getElementById("days");
if (daysEl) daysEl.innerText = diffDays;

// ---------------------------
// 💖 Floating Hearts Animation
// ---------------------------
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 800);




// ---------------------------
// ✨ Fade-in on Scroll Animation
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});
// Smooth reveal animation on scroll
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

function openLetter() {
  const envelope = document.querySelector('.envelope');
  envelope.classList.add('opened');
  
  // open modal after short delay
  setTimeout(() => {
    document.getElementById('letterModal').classList.add('show');
  }, 1600);
}

function closeLetter() {
  document.getElementById('letterModal').classList.remove('show');
  document.querySelector('.envelope').classList.remove('opened');
}

// --------------- Responsive Image Carousel ---------------------
$(document).ready(function () {
  let imageCarouselInterval;
  const imageSlideDuration = 3000; // 3 seconds
  const $sliderImgs = $(".slider-img");
  const $sliderContainer = $(".slider-container");

  // Function to activate a specific slide
  function activateImageSlide(index) {
    if (index < 0 || index >= $sliderImgs.length) return;

    $sliderImgs.removeClass("active");
    const $activeSlide = $sliderImgs.eq(index).addClass("active");

    // 🧭 Center the active image (especially on mobile)
    const containerWidth = $sliderContainer.width();
    const slideOffset = $activeSlide.position().left;
    const slideWidth = $activeSlide.outerWidth();
    const scrollLeft = slideOffset - (containerWidth / 2 - slideWidth / 2);

    $sliderContainer.animate({ scrollLeft: scrollLeft }, 600);
  }

  // Function to move to next slide
  function nextImageSlide() {
    const currentIndex = $sliderImgs.filter(".active").index();
    const nextIndex = (currentIndex + 1) % $sliderImgs.length;
    activateImageSlide(nextIndex);
  }

  // Start auto sliding
  function startImageCarousel() {
    stopImageCarousel(); // Avoid multiple intervals
    imageCarouselInterval = setInterval(nextImageSlide, imageSlideDuration);
  }

  // Stop auto sliding
  function stopImageCarousel() {
    if (imageCarouselInterval) {
      clearInterval(imageCarouselInterval);
      imageCarouselInterval = null;
    }
  }

  // On image click — activate + restart auto-slide
  $sliderImgs.on("click", function () {
    const index = $(this).index();
    activateImageSlide(index);
    stopImageCarousel();
    startImageCarousel();
  });

  // Pause on hover (for desktop)
  $(".slider-images").hover(
    function () {
      stopImageCarousel();
    },
    function () {
      startImageCarousel();
    }
  );

  // Touch control (for mobile swipe)
  let touchStartX = 0;
  $sliderContainer.on("touchstart", function (e) {
    touchStartX = e.originalEvent.touches[0].clientX;
    stopImageCarousel();
  });

  $sliderContainer.on("touchend", function (e) {
    const touchEndX = e.originalEvent.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next
        nextImageSlide();
      } else {
        // Swipe right → previous
        const currentIndex = $sliderImgs.filter(".active").index();
        const prevIndex =
          (currentIndex - 1 + $sliderImgs.length) % $sliderImgs.length;
        activateImageSlide(prevIndex);
      }
    }
    startImageCarousel();
  });

  // Initialize
  activateImageSlide(0);
  startImageCarousel();
});



// ---------------- Gallery Carousel --------------------
document.addEventListener('DOMContentLoaded', function() {
    let galleryCarouselInterval;
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    
    if (next && prev) { // Check if elements exist
        // Function to move to next slide
        function nextGallerySlide() {
            let items = document.querySelectorAll('.item');
            document.querySelector('.slide').appendChild(items[0]);
        }
        
        // Function to move to previous slide
        function prevGallerySlide() {
            let items = document.querySelectorAll('.item');
            document.querySelector('.slide').prepend(items[items.length - 1]);
        }
        
        // Start auto sliding
        function startGalleryCarousel() {
            galleryCarouselInterval = setInterval(nextGallerySlide, 4000); // 4 seconds
        }
        
        // Stop auto sliding
        function stopGalleryCarousel() {
            clearInterval(galleryCarouselInterval);
        }
        
        // Event listeners for manual controls
        next.addEventListener('click', function(){
            stopGalleryCarousel();
            nextGallerySlide();
            startGalleryCarousel();
        });
        
        prev.addEventListener('click', function(){
            stopGalleryCarousel();
            prevGallerySlide();
            startGalleryCarousel();
        });
        
        // Pause auto-slide when user hovers over carousel
        const slideElement = document.querySelector('.slide');
        if (slideElement) {
            slideElement.addEventListener('mouseenter', stopGalleryCarousel);
            slideElement.addEventListener('mouseleave', startGalleryCarousel);
        }
        
        // Start auto sliding
        startGalleryCarousel();
    }
});
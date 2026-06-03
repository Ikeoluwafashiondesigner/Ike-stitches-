let currentSlide = 0;

const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) currentSlide = 0;
  showSlide(currentSlide);
}

// start slider
setInterval(nextSlide, 3000);
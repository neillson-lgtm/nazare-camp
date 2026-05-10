document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".reviews-carousel").forEach((carousel) => {
  const slider = carousel.querySelector(".reviews-slider");
  const prev = carousel.querySelector(".reviews-arrow-prev");
  const next = carousel.querySelector(".reviews-arrow-next");
  if (!slider || !prev || !next) return;

  const getStep = () => Math.max(slider.clientWidth * 0.82, 280);

  prev.addEventListener("click", () => {
    slider.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    slider.scrollBy({ left: getStep(), behavior: "smooth" });
  });
});

const reviewImages = document.querySelectorAll(".review-screenshot img");

if (reviewImages.length) {
  const lightbox = document.createElement("div");
  lightbox.className = "review-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML = `
    <button class="review-lightbox-close" type="button" aria-label="Закрыть отзыв">×</button>
    <img alt="">
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".review-lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  reviewImages.forEach((image) => {
    image.parentElement.tabIndex = 0;
    image.parentElement.setAttribute("role", "button");
    image.parentElement.setAttribute("aria-label", "Открыть отзыв полностью");

    const openLightbox = () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    image.parentElement.addEventListener("click", openLightbox);
    image.parentElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

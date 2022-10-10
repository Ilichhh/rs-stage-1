import petsData from "./petsData.js";

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menuItem = document.querySelectorAll(".menu__item");
  const hamburger = document.querySelector(".hamburger");
  const blocker = document.querySelector(".bg");

  const petsSliderItems = document.querySelectorAll(".pets__content-block");
  const prevSlide = document.querySelector(".prev");
  const nextSlide = document.querySelector(".next");

  const testimonialsCarousel = document.querySelector(".testimonials__content");
  const testimonialsScroll = document.querySelector(".testimonials__scroll");
  const testimonialsArray = document.querySelectorAll(".testimonial-card__border");
  const popupBlocker = document.querySelector(".popup-bg");

  let numOfCards;
  let containerWidth = parseInt(window.innerWidth, 10);
  let currentItem = 0;
  let isEnabled = true;


  function toggleMenu() {
    hamburger.classList.toggle("hamburger_active");
    nav.classList.toggle("nav_active");
    blocker.classList.toggle("bg_active");
  }

  function generatePetsBlock(block) {
    containerWidth < 769 ? numOfCards = 4 : numOfCards = 6;
    let pets = petsData
      .sort(() => Math.random() - 0.5)
      .slice(petsData.length - numOfCards);
    let displayPets = "";
    pets.forEach((pet) => {
      displayPets += `
      <div class="pet-card">
        <img src="${pet.image}" alt="Pet photo" class="pet-card__photo">
        <div class="pet-card__descr">
          <div class="pet-card__text">
            <h3 class="pet-card__header">${pet.name}</h3>
            <div class="pet-card__subheader">${pet.description}</div>
          </div>
          <img src="${pet.food}" alt="food" class="pet-card__food">
        </div>
        <div class="pet-card__hover"></div>
      </div>
      `;
    });
    petsSliderItems[block].innerHTML = displayPets;
  }

  function changeCurrentItem(n) {
    currentItem = (n + petsSliderItems.length) % petsSliderItems.length;
  }

  function hideItem(direction) {
    isEnabled = false;
    petsSliderItems[currentItem].classList.add(direction);
    petsSliderItems[currentItem].addEventListener("animationend", function () {
      this.classList.remove("pets__content-block_active", direction);
    });
  }

  function showItem(direction) {
    generatePetsBlock(currentItem);
    petsSliderItems[currentItem].classList.add("pets__content-block_next", direction);
    petsSliderItems[currentItem].addEventListener("animationend", function () {
      this.classList.remove("pets__content-block_next", direction);
      this.classList.add("pets__content-block_active");
      isEnabled = true;
    });
  }

  function previousItem(n) {
    hideItem("pets__content-block_to-right");
    changeCurrentItem(n - 1);
    showItem("pets__content-block_from-left");
  }

  function nextItem(n) {
    hideItem("pets__content-block_to-left");
    changeCurrentItem(n + 1);
    showItem("pets__content-block_from-right");
  }

  function toggleTestimonial(index) {
    containerWidth = parseInt(window.innerWidth, 10);
    if (containerWidth <= 998) {
      let popupCard = testimonialsArray[index].cloneNode(true);
      popupCard.classList.add("testimonial-card__border_popup");
      document.querySelector(".testimonials").appendChild(popupCard);
      popupBlocker.classList.add("popup-bg_active");

      popupBlocker.addEventListener("click", () => {
        popupCard.remove();
        popupBlocker.classList.remove("popup-bg_active");
      });
    }
  }

  generatePetsBlock(0);

  hamburger.addEventListener("click", toggleMenu);
  blocker.addEventListener("click", toggleMenu);
  menuItem.forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  prevSlide.addEventListener("click", () => {
    if (isEnabled) previousItem(currentItem);
  });

  nextSlide.addEventListener("click", () => {
    if (isEnabled) nextItem(currentItem);
  });

  testimonialsScroll.addEventListener("input", (e) => {
    let testShift;
    containerWidth < 1241 ? 
      testShift = e.target.value * 323 :
      testShift = e.target.value * 297.5;
    testimonialsCarousel.style.transform = `translateX(-${testShift}px)`;
  });

  window.addEventListener("resize", () => {
    containerWidth = parseInt(window.innerWidth, 10);
    if (containerWidth < 769 && numOfCards === 6)
      generatePetsBlock(currentItem);
    if (containerWidth > 768 && numOfCards === 4)
      generatePetsBlock(currentItem);
    containerWidth < 1241 ? 
      testimonialsScroll.max = 8 :
      testimonialsScroll.max = 7;
  });

  testimonialsArray.forEach((card, index) => {
    card.addEventListener("click", () => {
      toggleTestimonial(index);
    });
  });
});

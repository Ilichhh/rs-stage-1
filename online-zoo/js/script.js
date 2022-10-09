import petsData from "./petsData.js";

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  const menuItem = document.querySelectorAll(".menu__item");
  const hamburger = document.querySelector(".hamburger");
  const blocker = document.querySelector(".bg");

  const donationOptionsChoice = document.querySelectorAll(".choice");
  const donationOptions = document.querySelectorAll('[name="amount"]');
  const anotherAmountForm = document.querySelector('[name="Another amount"]');

  const petsSliderWrapper = document.querySelector(".pets__container");
  const petsSlider = document.querySelector(".pets__content");
  const petsSliderItems = document.querySelectorAll(".pets__content-block");
  const prevSlide = document.querySelector(".prev");
  const nextSlide = document.querySelector(".next");

  // Hamburger

  function toggleMenu() {
    hamburger.classList.toggle("hamburger_active");
    nav.classList.toggle("nav_active");
    blocker.classList.toggle("bg_active");
  }

  hamburger.addEventListener("click", toggleMenu);
  blocker.addEventListener("click", toggleMenu);
  menuItem.forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  //  Donation

  //   function setAmountDonation() {
  //     donationOptions.forEach((option) => {
  //       if (option.checked) anotherAmountForm.value = option.value;
  //     });
  //   }

  //   setAmountDonation();

  //   anotherAmountForm.addEventListener("input", (e) => {
  //     donationOptions.forEach((option) => {
  //         option.value === e.target.value ? option.checked = true : option.checked = false;
  //       });
  //   })

  //   donationOptionsChoice.forEach((item) => {
  //     item.addEventListener("click", setAmountDonation);
  //   })

  function generatePetsBlock(numOfCards, block) {
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

  generatePetsBlock(6, 0);

 let currentItem = 0;
 let isEnabled = true;

 function changeCurrentItem(n) {
    currentItem = (n + petsSliderItems.length) % petsSliderItems.length;
 }

 function hideItem(direction) {
    isEnabled = false;
    petsSliderItems[currentItem].classList.add(direction);
    petsSliderItems[currentItem].addEventListener('animationend', function() {
        this.classList.remove('pets__content-block_active', direction);
    })
 }

 function showItem(direction) {
    generatePetsBlock(6, currentItem);
    petsSliderItems[currentItem].classList.add('pets__content-block_next', direction);
    petsSliderItems[currentItem].addEventListener('animationend', function() {
        this.classList.remove('pets__content-block_next', direction);
        this.classList.add('pets__content-block_active');
        isEnabled = true;
    })
 }


 function previousItem(n) {
    hideItem('pets__content-block_to-right');
    changeCurrentItem(n - 1);
    showItem('pets__content-block_from-left');
 }

 function nextItem(n) {
    hideItem('pets__content-block_to-left');
    changeCurrentItem(n + 1);
    showItem('pets__content-block_from-right');
 }


 prevSlide.addEventListener("click", () => {
   if (isEnabled) {
       previousItem(currentItem);
   }
 });

 nextSlide.addEventListener("click", () => {
   if (isEnabled) {
       nextItem(currentItem);
   }
 });


});

console.log(
  'Я в блоке "Pets" исправил отступы у карточек в мобильной версии, из-за этого большое различие с макетом. То же самое с футером на главной странице. Баллы снимать за это не надо ;)'
);

window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  const menuItem = document.querySelectorAll(".menu__item");
  const hamburger = document.querySelector(".hamburger");
  const blocker = document.querySelector(".bg");

  const donationOptionsChoice = document.querySelectorAll('.choice');
  const donationOptions = document.querySelectorAll('[name="amount"]');
  const anotherAmountForm = document.querySelector('[name="Another amount"]');


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

  function setAmountDonation() {
    donationOptions.forEach((option) => {
      if (option.checked) anotherAmountForm.value = option.value;
    });
  }

  setAmountDonation();

  anotherAmountForm.addEventListener("input", (e) => {
    donationOptions.forEach((option) => {
        if (option.value === e.target.value) option.checked = true;
      });
  })

  donationOptionsChoice.forEach((item) => {
    item.addEventListener("click", setAmountDonation);
  })

  
});

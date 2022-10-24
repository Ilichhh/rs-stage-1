window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menuItem = document.querySelectorAll(".menu__item");
  const hamburger = document.querySelector(".hamburger");
  const blocker = document.querySelector(".bg");

  const donationOptionsChoice = document.querySelectorAll(".choice");
  const donationOptions = document.querySelectorAll('[name="amount"]');
  const anotherAmountForm = document.querySelector('[name="Another amount"]');


  function toggleMenu() {
    hamburger.classList.toggle("hamburger_active");
    nav.classList.toggle("nav_active");
    blocker.classList.toggle("bg_active");
  }

  function setAmountDonation() {
    donationOptions.forEach((option) => {
      if (option.checked) anotherAmountForm.value = option.value;
    });
  }


  setAmountDonation();

  hamburger.addEventListener("click", toggleMenu);
  blocker.addEventListener("click", toggleMenu);
  menuItem.forEach((item) => {
    item.addEventListener("click", toggleMenu);
  });

  anotherAmountForm.addEventListener("input", (e) => {
    if (e.target.value > 9999) e.target.value = e.target.value.slice(0, 4);
    donationOptions.forEach((option) => {
      option.value === e.target.value ?
        option.checked = true :
        option.checked = false;
    });
  });

  donationOptionsChoice.forEach((item) => {
    item.addEventListener("click", setAmountDonation);
  });
});

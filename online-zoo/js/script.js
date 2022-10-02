window.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu');
  const menuItem = document.querySelectorAll('.menu__item');
  const hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger_active');
      nav.classList.toggle('nav_active');
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.toggle('hamburger_active');
          nav.classList.toggle('nav_active');
      })
  })
})
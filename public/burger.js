const burgerMenu = document.querySelector('.burger-menu');
const sideNav = document.querySelector('.navigation-list');

burgerMenu.addEventListener('click', () => {
  sideNav.classList.toggle('side-nav_active');
});
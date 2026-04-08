document.addEventListener('DOMContentLoaded', function() {
  const logo = 'assets/img/logo.png';
  const navImg = document.getElementById('nav-img');
  const footerImg = document.getElementById('footer-img');
  if (navImg) navImg.src = logo;
  if (footerImg) footerImg.src = logo;
});

var body = document.querySelector('body');
var pageHeader = document.querySelector('.page-header');
var menu = pageHeader.querySelector('.main-nav');
var menuBtn = menu.querySelector('.main-nav__toggle');
var versionArea = pageHeader.querySelector('.version');
var versionBtns = pageHeader.querySelectorAll('.version__link');
var slider = document.querySelector('.information-slider');
var sliderBtns = slider.querySelectorAll('.information-slider__btn');
var sliderCtrls = slider.querySelectorAll('.information-slider__ctrl-btn');

function switchVersion(evt) {
  if (Array.from(versionBtns).indexOf(evt.target) !== -1) {
    body.classList.toggle('poor-vision');
  }
}

function checkSlide() {
  for (var i = 0; i < sliderBtns.length; i++) {
    if (sliderBtns[i].checked) {
      return i;
    }
  }
}

function switchSlide(evt) {
  var slideNumber;
  if (evt.target === sliderCtrls[0]) {
    slideNumber = checkSlide();
    slideNumber = (slideNumber > 0) ? (slideNumber - 1) : (sliderBtns.length - 1);
    sliderBtns[slideNumber].checked = true;
    return;
  }
  if (evt.target === sliderCtrls[1]) {
    slideNumber = checkSlide();
    slideNumber = (slideNumber < sliderBtns.length - 1) ? (slideNumber + 1) : 0;
    sliderBtns[slideNumber].checked = true;
  }
}

menu.classList.add('main-nav--closed');
menuBtn.classList.remove('main-nav__toggle--nojs');

menuBtn.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.toggle("main-nav--closed");
});

versionArea.addEventListener('click', function(evt) {
  switchVersion(evt);
});

slider.addEventListener('click', function(evt) {
  switchSlide(evt);
});

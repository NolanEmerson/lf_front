'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$('document').ready(initializeApp);

function initializeApp() {
    var carousel = new Carousel('imageGallery');
}

var Carousel = function () {
    function Carousel(containerID) {
        _classCallCheck(this, Carousel);

        this.container = $('#' + containerID) || document.body;
        this.slides = $('.carouselItem');
        this.totalSlides = this.slides.length - 1;
        this.currentSlide = 0;
        this.beginScroll = null;

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.selectSlide = this.selectSlide.bind(this);
        this.resetScroll = this.resetScroll.bind(this);
        this.addEventHandlers = this.addEventHandlers.bind(this);

        this.addEventHandlers();
        this.createIndicators(this.slides.length);
        this.selectSlide(this.currentSlide);
    }

    _createClass(Carousel, [{
        key: 'addEventHandlers',
        value: function addEventHandlers() {
            var _this = this;

            $('.right').on('click', function () {
                _this.nextSlide();

                $('.chevron').addClass('unclickable');

                setTimeout(function () {
                    $('.chevron').removeClass('unclickable');
                }, 750);
            });

            $('.left').on('click', function () {
                _this.prevSlide();

                $('.chevron').addClass('unclickable');

                setTimeout(function () {
                    $('.chevron').removeClass('unclickable');
                }, 750);
            });

            $('.carouselHolder').mouseenter(function () {
                clearInterval(_this.beginScroll);
            });

            $('.carouselHolder').mouseleave(function () {
                _this.beginScroll = setInterval(_this.nextSlide, 2000);
            });
        }
    }, {
        key: 'selectSlide',
        value: function selectSlide(current) {

            $('.itemLeft').addClass('itemRight hide').removeClass('itemLeft itemMiddle');
            $('.itemMiddle').addClass('itemLeft').removeClass('itemMiddle itemRight');
            $('.itemRight').removeClass('hide');

            if (current === 0) {
                $('.carouselItem:first-child').addClass('itemMiddle').removeClass('itemLeft itemRight hide');
            } else {
                $('.carouselItem:nth-child(' + (current + 1) + ')').addClass('itemMiddle').removeClass('itemLeft itemRight hide');
            }

            $('.itemRight').addClass('hide');

            setTimeout(function () {
                $('.itemLeft').addClass('itemRight hide').removeClass('itemLeft itemMiddle');
            }, 750);

            this.resetScroll();
            this.colorActiveIndicator(this.currentSlide);
        }
    }, {
        key: 'resetScroll',
        value: function resetScroll() {
            clearInterval(this.beginScroll);

            if (!$('.carouselHolder').is(':hover')) {
                this.beginScroll = setInterval(this.nextSlide, 2000);
            }
        }
    }, {
        key: 'nextSlide',
        value: function nextSlide() {
            if (this.currentSlide === this.totalSlides) {
                this.currentSlide = 0;
            } else {
                this.currentSlide++;
            }

            this.selectSlide(this.currentSlide);
        }
    }, {
        key: 'prevSlide',
        value: function prevSlide() {
            if (this.currentSlide === 0) {
                this.currentSlide = this.totalSlides;
            } else {
                this.currentSlide--;
            }

            this.selectSlide(this.currentSlide);
        }
    }, {
        key: 'goToSlide',
        value: function goToSlide(clicked) {

            if (clicked === 0) {
                $('.carouselItem:first-child').addClass('itemRight hide').removeClass('itemLeft itemMiddle');
            } else {
                $('.carouselItem:nth-child(' + (clicked + 1) + ')').addClass('itemRight hide').removeClass('itemLeft itemMiddle');
            }

            this.currentSlide = clicked;
            this.selectSlide(clicked);
        }
    }, {
        key: 'createIndicators',
        value: function createIndicators(number) {
            var _this2 = this;

            var _loop = function _loop(i) {
                var newIndicator = $('<div>').addClass('indicator').on('click', function () {

                    $('.indicator').addClass('unclickable');

                    setTimeout(function () {
                        $('.indicator').removeClass('unclickable');
                    }, 750);

                    _this2.goToSlide(i);
                });
                $('.indicatorHolder').append(newIndicator);
            };

            for (var i = 0; i < number; i++) {
                _loop(i);
            }
        }
    }, {
        key: 'colorActiveIndicator',
        value: function colorActiveIndicator(current) {
            for (var i = 0; i <= this.totalSlides; i++) {
                if (i === current) {
                    $('.indicator')[i].style['background-color'] = '#f2f2f2';
                } else {
                    $('.indicator')[i].style['background-color'] = '';
                }
            }
        }
    }]);

    return Carousel;
}();
$('document').ready(initializeApp);


function initializeApp() {
    const carousel = new Carousel('imageGallery');
}


class Carousel {

    constructor(containerID) {
        this.container = $(`#${containerID}`) || document.body;
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

    addEventHandlers() {
        $('.right').on('click', () => {
            this.nextSlide();
        });
    
        $('.left').on('click', () => {
            this.prevSlide();
        });

        $('.carouselHolder').mouseenter( () => {
            clearInterval(this.beginScroll);
        });

        $('.carouselHolder').mouseleave( () => {
            this.beginScroll = setInterval(this.nextSlide, 2000);
        });
    }

    selectSlide(current) {
        for (let i = 0; i <= this.totalSlides; i++) {
            if (i === current) {
                this.slides[i].style.display = 'inline-block';
            } else {
                this.slides[i].style.display = 'none';
            }
        }

        this.resetScroll();
        this.colorActiveIndicator(this.currentSlide);
    }

    resetScroll() {
        clearInterval(this.beginScroll);

        if (!$('.carouselHolder').is(':hover')) {
            this.beginScroll = setInterval(this.nextSlide, 2000);
        }
    }

    nextSlide() {
        if (this.currentSlide === this.totalSlides) {
            this.currentSlide = 0;
        } else {
            this.currentSlide++;
        }

        this.selectSlide(this.currentSlide);
    }

    prevSlide() {
        if (this.currentSlide === 0) {
            this.currentSlide = this.totalSlides;
        } else {
            this.currentSlide--;
        }

        this.selectSlide(this.currentSlide);
    }

    goToSlide(clicked) {
        this.currentSlide = clicked;
        this.selectSlide(clicked);
    }

    createIndicators(number) {
        for (let i = 0; i < number; i++) {
            const newIndicator = $('<div>').addClass('indicator').on('click', () => {
                this.goToSlide(i);
            });
            $('.indicatorHolder').append(newIndicator);
        }
    }

    colorActiveIndicator(current) {
        for (let i = 0; i <= this.totalSlides; i++) {
            if (i === current) {
                $('.indicator')[i].style['background-color'] = '#f2f2f2';
            } else {
                $('.indicator')[i].style['background-color'] = '';
            }
        }
    }
}
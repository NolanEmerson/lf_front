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

        this.nextSlide = this.nextSlide.bind(this);

        this.selectSlide(this.currentSlide);

        this.beginScroll = setInterval(this.nextSlide, 5000);
    }

    selectSlide(current) {
        if (current >=0 && current <= this.totalSlides) {
            for (let i = 0; i <= this.totalSlides; i++) {
                if (i === current) {
                    this.slides[i].style.display = 'inline-block';
                } else {
                    this.slides[i].style.display = 'none';
                }
            }
        } else {
            alert('Index not valid number. You shouldn\'t get this issue');
        }
    }

    resetScroll() {
        clearInterval(this.beginScroll);

        this.beginScroll();
    }

    nextSlide() {
        if (this.currentSlide === this.totalSlides) {
            this.currentSlide = 0;
        } else {
            this.currentSlide++;
        }

        this.selectSlide(this.currentSlide);
    }

}
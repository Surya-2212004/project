

const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper ");
const firstCardWidh = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children]

let isDragging = false, startX, startScrollleft;
// get the number of cards that can fit in the carousel at once 
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidh)

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card . outerHTML);
});


carouselChildrens.slice( 0,cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card . outerHTML);
});


// add event listeners for the arrow buttons to scroll the carousal left and right
arrowBtns.forEach(btn =>{
    btn.addEventListener("click", ()  => {
       carousel.scrollLeft += btn.id === "left" ? -firstCardWidh : firstCardWidh;
    });
}

 );

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
// records the initial cursor and scroll position of the carousal 
    startX = e.pageX;
    startScrollLeft = carousel . scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; //isDragging is false return from here
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);

}

const dragstop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");

}

const  infiniteScroll = () => {


    if(carousel.startScrollLeft === 0){
        carousel.classList.add("no-transition");
       carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
       carousel.classList.remove("no-transition");

    } else if(Math.ceil(carousel.scrollLeft)=== carousel.scrollWidth - carousel. offsetWidth){
        carousel.classList.add("no-transition");
       carousel.scrollLeft = carousel.offsetWidth;
    }

}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragstop);
carousel.addEventListener("scroll", infiniteScroll); 






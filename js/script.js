// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
});

// changing search icon image on window resize
window.addEventListener('resize', changeSearchIcon);
function changeSearchIcon(){
    let winSize = window.matchMedia("(min-width: 1200px)");
    if(winSize.matches){
        document.querySelector('.search-icon img').src = "images/search-icon.png";
    } else {
        document.querySelector('.search-icon img').src = "images/search-icon-dark.png";
    }
}
changeSearchIcon();

// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});


h1 = document.querySelector(".sami");
function changeColor(color , delay , nextcolorchange){
    setTimeout(()=> {
        h1.style.color= color;
        if(nextcolorchange)nextcolorchange();
     }, delay);
}
changeColor("yellow",2000,()=>{
changeColor("brown",1000,()=>{
changeColor("orange",1000,()=>{
changeColor("gold",1000,()=>{
changeColor("turquoise",1000,()=>{
changeColor("gold",1000,()=>{
changeColor("lavender",1000,()=>{
changeColor("yellow",1000,()=>{
changeColor("white",1000,()=>{

});
});
});
});
});
});
});
});
});
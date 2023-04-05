if (document.readyState === 'loading') {        // Check whether the document is still loading
    document.addEventListener('DOMContentLoaded', ready)  // ready() method triggers after loading the content to the DOM
} else {
    ready()     // If the page already loaded ready() method will trigger
}
function ready(){
    changeBackgroundImage();
}
let sliderIndex = 0;
function changeBackgroundImage(){
    let imageContainers = document.getElementsByClassName('img-gallery')
    for (let i = 0; i < imageContainers.length; i++) {
        imageContainers[i].style.display = 'none'
    }
    imageContainers[sliderIndex].style.display = 'flex'
    sliderIndex++;
    if(sliderIndex == imageContainers.length){
        sliderIndex = 0;
    }
    setTimeout(changeBackgroundImage, 2000)
}
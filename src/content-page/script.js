if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
let imageSrcArray = [
    "../../assets/Comedy/The%20office/the-office.jpg",
    "../../assets/Comedy/American-Vandal/american-vandal.jpg",
    "../../assets/Comedy/Everybody%20hates%20chris/everybody-hates-chris.jpg",
    "../../assets/Documentries/Inside%20bill's%20brain/inside-bill's-brain.jpg"
]
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
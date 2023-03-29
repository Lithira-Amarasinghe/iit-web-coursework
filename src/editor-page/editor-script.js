if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()

}

function ready() {
    const btnList =
        document.getElementsByClassName('link-to-content');
    for (let i = 0; i < btnList.length; i++) {


        btnList[i].onmousemove = function (e) {
            const x = e.pageX - btnList[i].offsetLeft;
            const y = e.pageY - btnList[i].offsetTop;
            btnList[i].style.setProperty('--x', x + 'px')
            btnList[i].style.setProperty('--y', y + 'px')
        }
    }
}

function goToShop(){
    document.getElementById('order-checkout-section').style.display = 'none'
    document.getElementsByClassName('cart-outer')[0].style.display = 'none'
    document.getElementsByClassName('shop-outer')[0].style.display = 'block'
}


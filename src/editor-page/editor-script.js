if (document.readyState === 'loading') {            // Check whether the document is still loading
    document.addEventListener('DOMContentLoaded', ready)   // ready() method calls after loading the content to the DOM
} else {
    ready()          // If the page already loaded ready() method will trigger
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

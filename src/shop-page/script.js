if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Remove items from cart using remove button in cart
    let btnRemoveCartItems = document.getElementsByClassName('btn-remove')
    console.log(btnRemoveCartItems)
    for (let i = 0; i < btnRemoveCartItems.length; i++) {
        btnRemoveCartItems[i].addEventListener('click', (event) => {
            updateCartTotal();
            event.target.parentElement.remove();
        })
    }

    //  Add event listener to button for add items
    let btnAddToCart = document.getElementsByClassName('btn-add-to-cart')
    for (let i = 0; i < btnAddToCart.length; i++) {
        btnAddToCart[i].addEventListener('click', addToCartOnClick)

    }
    console.log(btnAddToCart)

    // Cart sub total update when quantity changed
    updateSubTotalOnChange();

    let cartInput = document.getElementsByClassName('cart-item-qty-input')
    for (let i = 0; i < cartInput.length; i++) {
        window.addEventListener('load', updateSubTotal)
    }

    // for (let i = 0; i < btnAddToCart.length; i++) {
    //     if (btnAddToCart[i].value === 'notAdded') {
    //         btnAddToCart[i].style.backgroundColor = '#a41414';
    //         btnAddToCart[i].innerText = 'Added'
    //         btnAddToCart[i].value = 'added'
    //         btnAddToCart[i].addEventListener('click', addToCartOnClick)
    //     } else {
    //         btnAddToCart[i].style.backgroundColor = '#0da249';
    //         btnAddToCart[i].innerText = 'Add to cart'
    //         btnAddToCart[i].value = 'notAdded'
    //         btnAddToCart[i].addEventListener('click', removeItemsFromCartOnClick)
    //     }
    // }
    // changeAddToCartBtnColor()

}

function changeAddToCartBtnStatus(btn) {
    // let addToCartBtns = document.getElementsByClassName('btn-add-to-cart')
    // let cartItemContainer = document.getElementsByClassName('cart-item-list-data')[0]
    // let itemsContainer = document.getElementsByClassName('items')[0]

    document.getElementsByClassName('btn-add-to-cart')
    if (btn.value === 'notAdded') {
        btn.style.backgroundColor = '#a41414';
        btn.innerText = 'Added'
        btn.value = 'added'
    } else {
        btn.style.backgroundColor = '#0da249';
        btn.innerText = 'Add to cart'
        btn.value = 'notAdded'
    }
}

function addToCartOnClick(event) {
    let button = event.target;
    let shopItem = button.parentElement;
    let id = shopItem.getElementsByClassName('item-id-shop')[0].innerText;
    let name = shopItem.getElementsByClassName('item-name')[0].innerText;
    let price = shopItem.getElementsByClassName('item-price')[0].innerText.slice(-1);
    let imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src;
    let cartItemIdList = document.getElementsByClassName('item-id-cart')

    for (let i = 0; i < cartItemIdList.length; i++) {
        if (cartItemIdList[i].innerText == id) {
            alert('Item already add to the cart')
            return
        }
    }

    if (button.value === 'notAdded') {
        button.style.backgroundColor = '#a41414';
        button.innerText = 'Added'
        button.value = 'added'
        addToCart(id, name, price, imageSrc);
    } else {
        button.style.backgroundColor = '#0da249';
        button.innerText = 'Add to cart'
        button.value = 'notAdded'
        removeItemsUsingCartRemoveBtnOnClick()
        updateCartTotal()
    }
}

function addToCart(id, name, price, imageSrc) {
    let itemRow = document.createElement('div')
    itemRow.innerHTML = `
                    <div class="item-id-cart">${id}</div>
                    <div class="cart-item-img">
                        <img src=${imageSrc}
                             alt="">
                    </div>
                    <div class="cart-item-name">${name}</div>
                    <div class="cart-item-unit-price">$${price}</div>
                    <div class="cart-item-qty">
                        <input  class="cart-item-qty-input" value="1" type="number" ">
                    </div>
                    <div class="item-sub-total">
                        $10
                    </div>
                    <button class="btn-remove">Remove</button>
    `
    itemRow.classList.add('cart-item-list-data')
    let cartItemListContainer = document.getElementsByClassName('cart-item-list')[0]
    cartItemListContainer.append(itemRow)
    updateCartTotal()
   removeItemsUsingCartRemoveBtnOnClick()
    updateSubTotalOnChange()
}

function removeItemsUsingCartRemoveBtnOnClick() {
    let removeCartItemsButtons = document.getElementsByClassName('btn-remove')
    for (let i = 0; i < removeCartItemsButtons.length; i++) {
        removeCartItemsButtons[i].addEventListener('click', removeItemsUsingCartRemoveButton)
    }
}

function removeItemsUsingCartRemoveButton(event){
    let itemRow = event.target.parentElement
    let cartItemId = itemRow.getElementsByClassName('item-id-cart')[0].innerText
    itemRow.remove();
    updateCartTotal()
    console.log(event.target)
    let shopItems = document.getElementsByClassName('item')
    // console.log(itemIdShop)
    for (let i = 0; i < shopItems.length; i++) {
        let itemIdShop = document.getElementsByClassName('item-id-shop')
        if (itemIdShop[i].innerText == cartItemId) {
            console.log('Btn found ')
            let btn = itemIdShop[i].parentElement.getElementsByClassName('btn-add-to-cart')[0]
            changeAddToCartBtnStatus(btn)
        }
    }
    updateCartTotal();
}

function updateSubTotalOnChange() {
    let cartInput = document.getElementsByClassName('cart-item-qty-input')
    for (let i = 0; i < cartInput.length; i++) {
        cartInput[i].addEventListener('change', updateSubTotal)
    }
}

function updateSubTotal(event) {
    let quantityInput = event.target
    let quantity = quantityInput.value
    if (isNaN(quantity) || quantity <= 0) {
        quantityInput.value = 1
    }
    console.log(quantityInput)
    console.log(quantityInput.innerText)
    let cartItemsContainer = document.getElementsByClassName('cart-item-list-data')
    let unitPrice = quantityInput.parentElement.parentElement.getElementsByClassName('cart-item-unit-price')[0].innerText.replace('$', '')
    console.log(unitPrice)
    let subTotal = unitPrice * quantityInput.value
    console.log(subTotal)
    quantityInput.parentElement.parentElement.getElementsByClassName('item-sub-total')[0].innerText = '$' + subTotal
    updateCartTotal()
}

function updateCartTotal() {
    let total = 0
    let cartItemsContainer = document.getElementsByClassName('cart-item-list')
    let cartItems = document.getElementsByClassName('cart-item-list-data')
    let totalContainer = document.getElementsByClassName('item-total-price')[0]
    for (let i = 0; i < cartItems.length; i++) {
        let subTotal = Number(cartItems[i].getElementsByClassName('item-sub-total')[0].innerText.replace('$', ''))
        total += subTotal;
        console.log(subTotal)
        console.log('Total updated')
    }
    totalContainer.innerText = 'Total price : $' + total;
}

function clearTheCart() {
    let itemDataList = document.getElementsByClassName('cart-item-list-data')
    for (let i = 0; i < itemDataList.length; i++) {
        itemDataList[i].remove()
    }
}



function proceedPayment(){
    let outer = document.getElementsByClassName('outer')[0]
    outer.getElementsByClassName('shop-outer')[0].style.display = 'none';
    outer.getElementsByClassName('item-outer-main')[0].style.display = 'none'
    outer.getElementsByClassName('cart-outer')[0].style.display = 'none';
}

// function documentariesRightSlide() {
//     let id;
//     let element
//     clearInterval(id)
//     this.rightDocumentarySlideId = setInterval(frame, 5)
//
//     function frame() {
//         element = document.querySelector('.documentaries-thumbnails')
//         element.scrollBy(1, 0)
//     }
// }
//
// function documentariesRightSlideStop() {
//     clearInterval(rightDocumentarySlideId)
// }
//
// function leftSlide() {
//     let id;
//     let element
//     clearInterval(id)
//     this.leftDocumentrySlideId = setInterval(frame, 5)
//
//     function frame() {
//         element = document.querySelector('.documentaries-thumbnails')
//         element.scrollBy(-1, 0)
//     }
// }
//
// function changeThumbnailStyles() {
//     let elementById = document.getElementById('.fictional');
//     elementById.style.border = '5px solid red';
// }
//
//

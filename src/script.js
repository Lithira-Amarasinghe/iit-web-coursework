if (document.readyState === 'loading') {
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
        console.log('btn add to cart')
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

    // const btn = document.querySelector('.btn-hover')
    // btn.onmousemove = function (e) {
    //     const x = e.pageX - btn.offsetLeft;
    //     const y = e.pageY - btn.offsetTop - 1060;
    //
    //     btn.style.setProperty('--x', x + 'px')
    //     btn.style.setProperty('--y', y + 'px')
    // }
}
//
//
function goToShop() {
    document.getElementsByClassName('cart-outer')[0].style.display = 'none'
    document.getElementsByClassName('shop-outer')[0].style.display = 'block'
    document.getElementById('order-checkout-section').style.display = 'none'
}

function goToShoppingCart() {
    document.getElementsByClassName('cart-outer')[0].style.display = 'block'
    document.getElementsByClassName('shop-outer')[0].style.display = 'none'
    document.getElementById('order-checkout-section').style.display = 'none'
}

function changeAddToCartBtnStatus(btn) {
    console.log('color changed')
    document.getElementsByClassName('btn-add-to-cart')
    btn.style.backgroundColor = '#0da249';
    btn.innerText = 'Add to cart'
    btn.value = 'notAdded'
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
                    <div class="cart-item-unit-price">${price}</div>
                    <div class="cart-item-qty">
                        <input  class="cart-item-qty-input" value="1" type="number" ">
                    </div>
                    <div class="item-sub-total">
                        $${price}
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

function removeItemsUsingCartRemoveButton(event) {
    let itemRow = event.target.parentElement
    let cartItemId = itemRow.getElementsByClassName('item-id-cart')[0].innerText
    itemRow.remove();
    updateCartTotal();
    console.log(event.target)
    let shopItems = document.getElementsByClassName('item')
    // console.log(itemIdShop)
    for (let i = 0; i < shopItems.length; i++) {
        let itemIdShop = document.getElementsByClassName('item-id-shop')
        if (itemIdShop[i].innerText === cartItemId) {
            console.log('Btn found ')
            let btn = itemIdShop[i].parentElement.getElementsByClassName('btn-add-to-cart')[0]
            changeAddToCartBtnStatus(btn)         // change the status of the add to cart button in shop.
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
    let cartItems = document.getElementsByClassName('cart-item-list-data')
    let totalContainer = document.getElementsByClassName('item-total-price')[0]
    for (let i = 0; i < cartItems.length; i++) {
        let subTotal = Number(cartItems[i].getElementsByClassName('item-sub-total')[0].innerText.replace('$', ''))
        total += subTotal;
        console.log(subTotal)
        console.log('Total updated')
    }
    totalContainer.innerText = 'Total price : $' + total;
    updateTotalInCheckoutPage(total);
}

function updateTotalInCheckoutPage(total) {
    let totalAmountContainer = document.getElementsByClassName('amount')[0];
    totalAmountContainer.innerText = '$'+total;
}

function clearTheCart() {
    let itemDataList = document.getElementsByClassName('cart-item-list-data')
    let shopItemIdList = document.getElementsByClassName('item')
    for (let i = 0; i < itemDataList.length; i++) {
        let itemId = itemDataList[i].getElementsByClassName('item-id-cart')[0].innerText.trim()
        itemDataList[i].remove()
        for (let j = 0; j < shopItemIdList.length; j++) {
            let shopItemId = shopItemIdList[j].getElementsByClassName('item-id-shop')[0].innerText.trim()
            if(shopItemId === itemId){
                let btn = shopItemIdList[j].getElementsByClassName('btn-add-to-cart')[0]
                changeAddToCartBtnStatus(btn)
            }
        }
    }
    updateCartTotal()
}


function proceedPayment(){
    let outer = document.getElementsByClassName('outer')[0]
    outer.getElementsByClassName('shop-outer')[0].style.display = 'none';
    outer.getElementsByClassName('item-outer-main')[0].style.display = 'none'
    outer.getElementsByClassName('cart-outer')[0].style.display = 'none';
}

// ---------------------------- Send checkout details start------------------------------------------
let inputContainer = document.getElementsByClassName('details-for-place-order')[0]
let name = inputContainer.getElementsByClassName('name-input')[0]
let contactNo = inputContainer.getElementsByClassName('contact-input')[0]


function checkout() {
    let total = document.getElementsByClassName('item-total-price')[0].innerText.replace(/[^0-9]/g, '')
    console.log(total)
    if (total == 0) {
        alert("You haven't add any item to cart")
        return
    }
    document.getElementById('order-checkout-section').style.display = 'flex'
    document.getElementsByClassName('shop-outer')[0].style.display = 'none';
    document.getElementsByClassName('cart-outer')[0].style.display = 'none';

    Email.send({
        SecureToken: "52c01a40-73e0-40f0-afc2-112a5db214a0",
        To: 'lithira.20220085@iit.ac.lk',
        From: "amarasinghelithira@gmail.com",
        Subject: "Checkout details",
        Body: "Name : "
    }).then(
        message => alert(message)
    );
}

// ---------------------------- Send checkout details end ------------------------------------------


// -------------- Checkout page javascript started ------------------------
function showBillingAddressToEdit(event) {
    let billingAddressContainer = document.getElementsByClassName('billing-address')[0];
    let billingAddressInputFields = billingAddressContainer.getElementsByClassName('billing-details-input-fields')[0];
    billingAddressInputFields.style.display = 'grid';
    billingAddressContainer.getElementsByClassName('billing-address-summary')[0].style.display = 'none';
    billingAddressContainer.getElementsByClassName('btn-billing-address-edit')[0].style.display = 'none';
    event.style.display = 'none'
}

function saveBillingAddress() {
    let billingAddressContainer = document.getElementsByClassName('billing-address')[0]
    let billingAddressInputFields = billingAddressContainer.getElementsByClassName('billing-details-input-fields')[0]
    let allInputFields = billingAddressInputFields.getElementsByClassName('billing-input-field')
    let address = '';
    for (let i = 0; i < allInputFields.length; i++) {
        let text = allInputFields[i].value.toString().trim()
        console.log(text)
        if (text !== '') {
            address += text + ", "
        }
    }
    if (address === '') {
        address = 'Enter your billing address'
    }

    let addressSummeryContainer = billingAddressContainer.getElementsByClassName('billing-address-summary')[0];
    addressSummeryContainer.innerText = address;
    billingAddressInputFields.style.display = 'none';
    addressSummeryContainer.style.display = 'block'
    billingAddressContainer.getElementsByClassName('btn-billing-address-edit')[0].style.display = 'block'
}

function showContactDetailsToEdit() {
    let contactDetailContainer = document.getElementsByClassName('contact-details')[0]
    let contactDetailsInputFields = contactDetailContainer.getElementsByClassName('contact-details-input-fields')[0]
    contactDetailsInputFields.style.display = 'grid'
    contactDetailContainer.getElementsByClassName('contact-details-summery')[0].style.display = 'none'
    contactDetailContainer.getElementsByClassName('btn-contact-details-edit')[0].style.display = 'none'
}

function saveContactDetails() {
    let contactDetailContainer = document.getElementsByClassName('contact-details')[0]
    let contactDetailsInputFields = contactDetailContainer.getElementsByClassName('contact-details-input-fields')[0]
    let allInputFields = contactDetailsInputFields.getElementsByTagName("input")
    let contactDetails = '';
    for (let i = 0; i < allInputFields.length; i++) {
        let text = allInputFields[i].value.toString().trim()
        console.log(text)
        if (text !== '') {
            contactDetails += text + ""
        }
    }
    let contactDetailsSummeryContainer = contactDetailContainer.getElementsByClassName('contact-details-summery')[0];
    if (contactDetails === '') {
        contactDetails = 'Enter your contact details';
    }
    contactDetailsSummeryContainer.innerText = contactDetails;
    contactDetailsInputFields.style.display = 'none'
    contactDetailsSummeryContainer.style.display = 'block'
    contactDetailContainer.getElementsByClassName('btn-contact-details-edit')[0].style.display = 'block'
}

// -------------------------------- Checkout page javascript end --------------------------------------

// ----------------------------- Send checkout details start------------------------------------------
// let inputContainer = document.getElementsByClassName('details-for-place-order')[0]
// let name = inputContainer.getElementsByClassName('name-input')[0]
// let contactNo = inputContainer.getElementsByClassName('contact-input')[0]

function placeOrder() {
    alert('You have successfully placed the order. Thank you shopping with us...')
    document.getElementById('order-checkout-section').style.display = 'none'
    document.getElementsByClassName('cart-outer')[0].style.display = 'none'
    document.getElementsByClassName('shop-outer')[0].style.display = 'block'
    clearTheCart();
    // document.getElementById('order-checkout-section').style.display = 'flex'
    // Email.send({
    //     SecureToken: "52c01a40-73e0-40f0-afc2-112a5db214a0",
    //     To: 'lithira.20220085@iit.ac.lk',
    //     From: "amarasinghelithira@gmail.com",
    //     Subject: "Checkout details",
    //     Body: "Name : " + name + '  Contact no : ' + contactNo
    // }).then(
    //     message => alert(message)
    // );
}


// // ---------------------------- Send checkout details end ------------------------------------------
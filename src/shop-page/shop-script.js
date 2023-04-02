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
}

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

function updateCartTotal() {  // update the total of the cart
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

function updateTotalInCheckoutPage(total) {       //
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


// ---------------------------- Send checkout details start------------------------------------------

function checkout() {
    let name = document.getElementById('name').value.toString().trim()
    let phoneNo = document.getElementById('phone-no').value.toString().trim()
    let email = document.getElementById('email').value.toString().trim()
    let total = document.getElementsByClassName('item-total-price')[0].innerText.replace(/[^0-9]/g, '')
    console.log(total)
    console.log(email + ' : ' + phoneNo)
    if (total == 0) {
        alert("You haven't add any item to cart")
        return
    }
    if(name == ''){
        alert("You haven't enter your name.")
        return
    }
    if(phoneNo.length < 3){
        alert("Phone no is invalid")
        return
    }
    let emailRegex = /[\w]+@[\w]+[.][\w]+/
    if(!emailRegex.test(email)) {
        alert('Invalid email')
        return
    }

    document.getElementsByClassName('email-input')[0].value = email
    document.getElementsByClassName('phone-no-input')[0].value = phoneNo
    document.getElementsByClassName('card-holders-name-input')[0].value = name
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
function showBillingAddressToEdit(element) {
    let billingAddressContainer = document.getElementsByClassName('billing-address')[0];
    let billingAddressInputFields = billingAddressContainer.getElementsByClassName('billing-details-input-fields')[0];
    billingAddressInputFields.style.display = 'grid';
    billingAddressContainer.getElementsByClassName('billing-address-summary')[0].style.display = 'none';
    billingAddressContainer.getElementsByClassName('btn-billing-address-edit')[0].style.display = 'none';
    element.style.display = 'none'
}
function saveBillingAddress() {
    let billingAddressContainer = document.getElementsByClassName('billing-address')[0]
    let billingAddressInputFields = billingAddressContainer.getElementsByClassName('billing-details-input-fields')[0]
    let allInputFields = billingAddressInputFields.getElementsByClassName('billing-input-field')
    let address = '';

    if(!validateBillingAddress()){
        return;
    }

    for (let i = 0; i < allInputFields.length; i++) {
        let text = allInputFields[i].value.toString().trim()
        if (text !== '') {
            address += text + ", "
        }
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
        if (text !== '') {
            contactDetails += text + " "
        }
    }
    if(!validateContactDetails()){
        return;
    }
    let contactDetailsSummeryContainer = contactDetailContainer.getElementsByClassName('contact-details-summery')[0];

    contactDetailsSummeryContainer.innerText = contactDetails;
    contactDetailsInputFields.style.display = 'none'
    contactDetailsSummeryContainer.style.display = 'block'
    contactDetailContainer.getElementsByClassName('btn-contact-details-edit')[0].style.display = 'block'
}

function validatePaymentDetails(){                   //  Validate the payment details
    let cardNo = document.getElementById('card-number').value.trim()
    let name = document.getElementById('card-holder-name').value.trim()
    let securityCode = document.getElementById('security-code').value.trim()
    let expiryDate = document.getElementById('expiry-date').value.trim()
    console.log(expiryDate)

    if(cardNo.length < 15){
        alert("Invalid card no");
        return false;
    }
    if(name == ''){
        alert("Enter the card holder's name");
        return false;
    }
    if(securityCode.length < 3){
        alert('Invalid security code')
        return false;
    }

    if(expiryDate === '' || !validateExpiryDate(expiryDate)){
        alert('Invalid expiry date')
        return false;
    }
    return true;
}
function validateExpiryDate(expiryDate){    // Validate the expiry date of the card used for payment
    let currentDate = new Date();
    let thisMonth = currentDate.getMonth();
    let thisYear = currentDate.getFullYear();
    let expiryYear = Number(expiryDate.slice(0,4));
    let expiryMonth = Number(expiryDate.slice(-2))
    console.log(expiryYear)
    console.log(expiryMonth)
    if(expiryYear < thisYear){
        console.log('Year Less than')
        return false;
    }else if(expiryYear === thisYear && expiryMonth <= thisMonth){
        console.log('Year equal')
        return false;
    }
    return true;
}


function validateBillingAddress(){     // Validate the billing address
    let country = document.getElementsByClassName('country-input')[0].value.trim();
    let allInputFields = document.getElementsByClassName('billing-input-field')
    let addressLines = '';
    for (let i = 0; i < 3; i++) {
        addressLines += allInputFields[i].value.toString().trim()
    }
    if(addressLines.length < 3){
        alert('Enter your billing address')
        return false;
    }
    if(country == ''){
        alert('Select your country')
        return false;
    }
    return true;
}
function validateContactDetails(){
    let email = document.getElementsByClassName('email-input')[0].value.trim()
    let emailRegex = /[\w]+@[\w]+[.][\w]+/
    if(!emailRegex.test(email)){
        alert('Invalid email')
        return false;
    }
    let phoneNo = document.getElementsByClassName('phone-no-input')[0].value.trim()
    if(phoneNo.length < 3){
        alert('Invalid phone no')
        return false;
    }
    return true;
}

// -------------------------------- Checkout page javascript end --------------------------------------

// ----------------------------- Send checkout details start------------------------------------------

function makePayment() {
    if(!validatePaymentDetails() || !validateBillingAddress() || !validateContactDetails()){
        return
    }
    clearTheCart();
    alert('You have successfully placed the order. Thank you shopping with us...')
    document.getElementById('order-checkout-section').style.display = 'none'
    document.getElementsByClassName('cart-outer')[0].style.display = 'none'
    document.getElementsByClassName('shop-outer')[0].style.display = 'block'
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

function cancelPayment(){
    window.location.href = 'shop.html'
}

// ---------------------------- Send checkout details end ------------------------------------------
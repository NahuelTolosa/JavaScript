let cart = JSON.parse(localStorage.getItem('cart'));

!Object.keys(cart).length == 0
    ? ShowCartContent(cart)
    : EmptyCartMessage()

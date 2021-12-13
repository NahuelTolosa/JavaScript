$(() => {

    let cart = {};

    !GetFromLocalStorage('cart') && localStorage.setItem( 'cart' , JSON.stringify(cart) );

});

const GetFromLocalStorage = ( id ) => {
    return JSON.parse(localStorage.getItem(id))
            ? true 
            : false
}

const CreateDinamicGrid = (products) => {

    for (const product of products) {
        $("#products-area")
            .append(
                `<div class="img-containter">
                        <div class="img-containter__img">
                            <img src="${product.image}" alt="${product.description}">
                        </div>
                        <div class="img-containter__info">
                            <h4>${product.name}</h4>
                            <p>$${product.price}</p>
                        </div>
                        <div class="img-container__option">
                            
                            <button id="${product.id}" class="button buy-button">Agregar</button>
                        </div>
                    </div>`
            )
    }

    SetBuyButtonsListeners();
}

const AddToCart = (product) => {

    let cart = GetCart();

    //Crea objeto
    let _product = {
        id:          product.querySelector(`.buy-button`).id,
        name:        product.querySelector(`h4`).textContent,
        description: product.querySelector(`img`).alt,
        price:       GetIntPrice(product.querySelector(`p`).textContent),
        image:       product.querySelector(`img`).src,
        quantity:    1
    };

    GetFromCart(cart, _product) && IncreaseQuantity(cart, _product)
    
    AddInCart(cart, _product);

    SetCart(cart);


}

const GetCart = () => {
    return JSON.parse(localStorage.getItem('cart'));
}

const GetIntPrice = (price) => {
    return price.slice(1, price.lenght);
}

const GetFromCart = (cart, _product) => {

    return cart.hasOwnProperty(_product.id)
        ? true
        : false
}

const AddInCart = (cart, _product) => {
    cart[_product.id] = { ..._product };
}

const IncreaseQuantity = ( cart, _product ) => {

    _product.quantity = cart[_product.id].quantity + 1;
}

const SetCart = ( cart ) => {
    localStorage.setItem(`cart`, JSON.stringify(cart));
}

const ShowCartContent = (cart) => {

    //"Limpio el sector donde se renderizará el carrito"
    document.querySelector(`.cart-body`).textContent = '';


    //Creo la cabecera del carrito
    $(`.cart-body`).append(`
        <tr class="cart__row cart__row--head">
            <th class="cart-item">#</th>
            <th class="cart-item">Producto</th>
            <th class="cart-item">Cantidad</th>
            <th class="cart-item">Total</th>
            <th class="cart-item">Acción</th>
            <th class="cart-item">Remover</th>
        </tr>`
    );


    //Creo las filas con los elementos
    let i = 0;
    let cartTotal = 0;
    const keys = (Object.keys(cart)).sort();
    keys.forEach(key => {

        const product = cart[key];
        $(`.cart-body`).append(`
                
                
            <tr id="${product.id}_row" class="cart__row">
                <th class="cart-item">${i + 1}</th>
                <th class="cart-item">${product.name}</th>
                <th id="quantity_${product.id}" class="cart-item">${product.quantity}</th>
                <th class="cart-item">$${parseInt(product.price)*product.quantity}</th>
                <th class="cart-item">
                    <div class="plus-less-buttons">
                        <div class="plus-button" value="${product.id}">
                            <p value="${product.id}">+</p>
                        </div>
                        <div class="less-button" value="${product.id}">
                            <p value="${product.id}">-</p>
                        </div>
                    </div>
                </th>
                <th class="cart-item" value="${product.id}">
                    <div class="trash-button">
                        <p value="${product.id}">×</p>
                    </div>
                </th>
            </tr>
        `);

        i++;
        cartTotal += parseInt(product.price)*product.quantity;
        

    });
    
    $(`.cart-body`).append(`
        <tr class="cart__row">
            <th class="cart-item"><h5><b>Total:</b><h5></th>
            <th class="cart-item"></th>
            <th class="cart-item"></th>
            <th id="cart-total" class="cart-item"><h5><b>$${cartTotal}</b><h5></th>
            <th class="cart-item"></th>
            <th class="cart-item"></th>
        </tr>
    `);


    //Seteo los listeners de los botones del carrito
    SetCartButtonsListeners(cart);

}

const EmptyCartMessage = () => {
    $(`#cart-main`).append(`<div class="paddin-top-bottom-20"><p class="empty-cart">El carrito está vacío.</p></div>`);
}

const AddProduct = (cart,id) =>{

    cart[id].quantity = cart[id].quantity + 1;
    SetCart(cart);

    ShowCartContent(cart);
}

const SubtractProduct = (cart, id) => {

    cart[id].quantity > 0
        ? cart[id].quantity = cart[id].quantity - 1
        : TrashProduct(cart,id)
    SetCart(cart);

    ShowCartContent(cart);
}

const TrashProduct = (cart,id) => {

    delete cart[id];
    SetCart(cart);

    ShowCartContent(cart);
}
const SetBuyButtonsListeners = () => {
    $(`.buy-button`).on('click', (e) => {
        AddToCart(e.target.parentElement.parentElement);
    });
}

const SetCartButtonsListeners = (cart) => {
    $(`.plus-button`).on('click', (e) => {
        AddProduct(cart, e.target.getAttribute('value'));
    });

    $(`.less-button`).on('click', (e) => {
        SubtractProduct(cart, e.target.getAttribute('value'));
    });

    $(`.trash-button`).on('click', (e) => {
        TrashProduct(cart, e.target.getAttribute('value'));
    });
}
$(() => {

    $(`.buy-button`).on('click', (e) => {
        AddToCart(e.target.parentElement.parentElement);
    });

});
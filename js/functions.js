const CreateDinamicGrid = (products) => {

    for(const podruct of products) {
        $("#products-area")
            .append(
                `<div class="img-containter">
                        <div class="img-containter__img">
                            <img src="${podruct.image}" alt="${podruct.description}">
                        </div>
                        <div class="img-containter__info">
                            <h4>${podruct.name}</h4>
                            <p>$${podruct.price}</p>
                        </div>
                        <div class="img-container__option">
                            <button class="button">Ver más</button>
                            <button id="${podruct.id}" class="button buy-button">Comprar</button>
                        </div>
                    </div>`
            )
    }
}

const AddToCart = (product) => {
    
    //Crea objeto
    const _product = {
        id: product.querySelector(`.buy-button`).id,
        name: product.querySelector(`h4`).textContent,
        description: product.querySelector(`img`).alt,
        price: product.querySelector(`p`).textContent,
        image: product.querySelector(`img`).src,
        quantity: 1
    };

    // console.log(localStorage.getItem(_product.id))

    ! GetFromLocalStorage(_product.id) //Lo busca
        ? AddInLocalStorage(_product) //Si no existe lo agrega
        : IncreaseQuantity(_product.id) //Si existe +1 en cantidad


}

const GetFromLocalStorage = ( id ) => {
    return JSON.parse(localStorage.getItem(id))
            ? true 
            : false
}

const AddInLocalStorage = ( _product ) => {
    localStorage.setItem(_product.id, JSON.stringify(_product))
}

const IncreaseQuantity = ( id ) => {
    const _product =JSON.parse(localStorage.getItem(id)); //Traigo el elemento
    localStorage.removeItem(id); //Lo elimino
    _product.quantity = _product.quantity+1; //Lo actualizo
    AddInLocalStorage(_product); //Lo vuelvo a agregar
}
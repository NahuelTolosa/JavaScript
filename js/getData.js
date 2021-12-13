const URLJSON = "../data/db.json";

$.getJSON(URLJSON, function (answer, state) {
    if (state === "success") {
        let products = answer;
        CreateDinamicGrid(products);
    }
});

// fetching products from api
const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        // making a dynamic class to count stars
        let dynamicRating = "wow" + product.id;
        // dynamic div for each products
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
        <div class="single-product">
            <div>
                <img class="product-image" src=${image}></img>
            </div>
            <div class="product-body">
                <h1>${product.title.slice(0, 50)}</h1>
                <p>Category: ${product.category}</p>
                <h3>Price: $ ${product.price}</h3>
                <div class="stars-outer" id="${product.id}">
                    <div class="stars-inner ${dynamicRating}"></div>
                </div><br><p><b>${product.rating.rate}</b>
                    ( <b>${product.rating.count}</b>  Reviews )</p>
                <button onclick="addToCart(${product.id},${
            product.price
        })" id="addToCart-btn" class="buy-now btn">add to cart</button>
                <button id="details-btn" class="btn btn-info">Details</button>
            </div>
        </div>
        `;
        // adding all the products one by one
        document.getElementById("all-products").appendChild(div);
        // calling the star rating function
        updateStar(product.id, product.rating.rate);
    }
};

// total star count is 5
const starsTotal = 5;
function updateStar(id, rating) {
    const starPercentage = (rating / starsTotal) * 100;
    // Set width of stars-inner to percentage
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    // create dynamicClass for each products
    let dynamicClass = ".wow" + id;
    document.querySelector(`${dynamicClass}`).style.width =
        starPercentageRounded;
}

// addToCart function
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);
    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
    updateTotal();
};

// getting values from cart table using id
const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") +
        getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText =
        parseFloat(grandTotal).toFixed(2);
};

// view single product details

const viewDetails = (id) => {
    let url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => loadData(data));
};

// Total Stars
const starsTotal = 5;

// const getRatings = () => {
//     const url = `https://fakestoreapi.com/products`;
//     fetch(url)
//         .then((response) => response.json())
//         .then((data) => runCode(data));
// };

// // getRatings();

// // Get ratings
// function runCode(products) {
//     const allProducts = products.map((pd) => pd);

//     for (const product of allProducts) {
//         const starPercentage = (product.rating.rate / starsTotal) * 100;

//         const starPercentageRounded = `${
//             Math.ceil(starPercentage / 10) * 10
//         }%`;
//         // console.log(starPercentageRounded);
//         // Set width of stars-inner to percentage
//         document.querySelector(`.product-body .stars-inner`).style.width =
//             starPercentageRounded;
//     }
// }

function updateRate(rate){
    const starPercentage = (rate / starsTotal) * 100;
    const starPercentageRounded = `${Math.ceil(starPercentage / 10) * 10}%`;
    // console.log(starPercentageRounded);
    // Set width of stars-inner to percentage
    document.querySelector(`.product-body .stars-inner`).style.width =
        starPercentageRounded;
}

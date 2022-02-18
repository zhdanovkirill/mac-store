import {items as allDevice} from './app/helpers/fake-backend.js';
import {getRandomInt} from "./app/helpers/utils.js";
import {showDetails} from "./app/components/device-details/device-details.js";
import {FilterComponent} from "./app/components/filter/filterComponent.js";
import {Filter} from "./app/helpers/filter.js";

const itemsContainer = document.getElementById("items");
const card = document.getElementById("card");


let filter = new Filter();

let filterComponent = new FilterComponent(filter, allDevice)
filterComponent.filterActionHandler(renderDevices);

function renderDevices() {
    let filterObjects = filter.filtration(allDevice)

    itemsContainer.innerHTML = "";
    filterObjects.map(item => {

        let newCard = document.createElement("div");
        newCard.innerHTML = card.innerHTML;
        newCard.classList.add("card")
        newCard.onclick = (event) => showDetails(event, item);

        let cardImage = newCard.getElementsByClassName("card-image");
        cardImage[0].src = `resources/${item.imgUrl}`;

        let cardTitle = newCard.getElementsByClassName("card-title");
        cardTitle[0].textContent = item.name;


        const countInStock = newCard.querySelector('.count-in-stock');

        countInStock.textContent = ` ${item.orderInfo.inStock} `;

        const icon = newCard.querySelector((item.orderInfo.inStock > 0) ? '.img-check' : '.img-cross');
        icon.classList.remove("display-none");

        const price = newCard.querySelector('.price');
        price.textContent = ` ${item.price} `;

        const footerCard = newCard.querySelector('.footer-card');
        footerCard.innerHTML = `
                        <img class="footer-img-like" src="resources/icons/like_filled.svg" alt="Positive reviews">
                        <span class="positive-reviews">
                            <b>${item.orderInfo.reviews} %</b> Positive reviews
                            <p>Above avarage</p>
                        </span>
                        <span class="orders">
                            ${getRandomInt()}
                            <p> orders</p>
                        </span>`;

        const btnAdd = newCard.querySelector('.btn-add');
        if (item.orderInfo.inStock === 0) {
            btnAdd.disabled = true;
        }
        btnAdd.addEventListener('click', (event) => addToCart(event, item));

        price.textContent = ` ${item.price} `;
        itemsContainer.appendChild(newCard);
    })
}

function addToCart(event, device) {
    console.log('addToCart', device, event)
    event.stopPropagation();
    //  console.log(allDevice.find(item => item.id===deviceId))
}

renderDevices(allDevice);

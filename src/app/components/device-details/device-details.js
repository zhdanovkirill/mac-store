import {getRandomInt} from "../../helpers/utils.js";

function showDetails(event, device) {
    let overlay = document.createElement('div')
    overlay.innerHTML = `
    <div class="overlay">
        <div class="details-container">
            <div class="details-img">
                <img class="details-image" src="resources/${device.imgUrl}" alt="Device picture">
             </div>
            <div class="details-body">
                <span class="details-title">${device.name}</span>
                <div class="details-reviews">
                    <img class="footer-img-like" src="resources/icons/like_filled.svg" alt="Positive reviews">
                    <span class="positive-reviews">
                        <b>${device.orderInfo.reviews} %</b> Positive reviews
                            <p>Above avarage</p>
                    </span>
                    <span class="orders">
                        ${getRandomInt()}
                        <p> orders</p>
                    </span>
                </div>
                <div class="info-box">
                    <span>Color: <b>${device.color}</b></span>
                    <span>Operating System: <b>${device.os}</b></span>
                    <span>Chip: <b>${device.chip.name}</b></span>
                    <span>Height: <b>${device.size.height}</b></span>
                    <span>Width: <b>${device.size.width}</b></span>
                    <span>Depth: <b>${device.size.depth}</b></span>
                    <span>Weight: <b>${device.size.weight}</b></span>              
                </div>
                
            </div>
            <div class="details-control">
                <span class="details-price">$ ${device.price}</span>
                <span class="count-in-stock">Stock: <b>${device.orderInfo.inStock} pcs.</b> </span>
                <button class="btn btn-add">Add to cart</button>
            </div>
        </div>
    </div>`;
    overlay.addEventListener("click", hideOverlay)
    overlay.querySelector('.details-container').addEventListener("click", (e)=>e.stopPropagation())
    document.body.appendChild(overlay);
    console.log('allDevice',event, device);
}

function hideOverlay(){
    const overlay = document.querySelector('.overlay');
    overlay.remove();
}

export {showDetails, hideOverlay}


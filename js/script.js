
function hide(element){
    document.querySelector(element).style.display = 'none'
};

function unhide(element){
    document.querySelector(element).style.display = 'inherit';
};

function bgUnhide(element){
    document.querySelector(element).style.display = 'flex';
};

function priceChange(element){
    let newPrice = document.getElementById('new-price').value;
    document.getElementById(element).innerHTML = newPrice;
    event.preventDefault()
}
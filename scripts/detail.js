let dispalyTotalPrice = () => {
    const price_room = 1000;
    let elementAdult = document.getElementById('adult');
    let elementName = document.getElementById('name');
    let elementFromDate = document.getElementById('from-date');
    let elementToDate = document.getElementById('to-date');
    let elementPrice = document.getElementById('total');

    let dateOfToDate = new Date(elementToDate.value);
    let dateOfFromDate = new Date(elementFromDate.value);

    let hideBeforeDate = elementFromDate.value;
    elementToDate.min = hideBeforeDate;

    let days = (dateOfToDate - dateOfFromDate) / (24 * 3600 * 1000);
    
    if(elementAdult.value && elementToDate.value && elementFromDate.value) {
        elementPrice.value = "Rs." + parseInt(elementAdult.value) * price_room * days;
    }
    else {
        elementPrice.value = "Rs.0";
    }
}
let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/";
const travelAdvisorHost = "travel-advisor.p.rapidapi.com";
const travelAdvisorKey = "27383bf56dmsh575e34004dc12bfp1c947ejsn27beb7439fed";

let ViewMoreCity = () => {
    let viewMoreButton = document.getElementsByClassName('btn btn-secondary')[0];
    if (viewMoreButton.innerText === "View More") {
        document.getElementById("addedCityCards").style.display="block";
        viewMoreButton.innerText ='View Less';
    }
    else {
        document.getElementById("addedCityCards").style.display="none";
        viewMoreButton.innerText ='View More';
    }
}
 
let debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
        let context = this;
        let args = arguments;
        let later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

let search = () => {
    let currentFocus;
    let searchInputElement = document.getElementById("search");

    searchInputElement.addEventListener("input", debounce(function (e) {

        let newValue = this.value;

        let xhr = new XMLHttpRequest();
        if (!newValue || newValue.length < 3) {
            closeAllLists();
            return false;
        }

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {

                closeAllLists();
                const data = JSON.parse(this.responseText).data;
                const geos = data.filter((element) => {
                    return element.result_type === "geos"
                });
                let loactionList = [];
                geos.forEach((element) => {
                    loactionList.push(element.result_object.name);
                }); 
                currentFocus = -1;

                let searchListDiv = document.createElement("div");
                searchListDiv.setAttribute("id", searchInputElement.id + "search-city-list");
                searchListDiv.setAttribute("class", "search-city-items");

                searchInputElement.parentNode.appendChild(searchListDiv);

                for (let i = 0; i < loactionList.length; i++) {

                    if ((loactionList[i].toUpperCase()).includes(newValue.toUpperCase())) {

                        let listElementDiv = document.createElement("div");
                        listElementDiv.setAttribute("onClick", "window.location='list.html?city=" + loactionList[i] + "'");
                        listElementDiv.innerText = loactionList[i];

                        listElementDiv.innerHTML += "<input type='hidden' value='" + loactionList[i] + "'>";

                        listElementDiv.addEventListener("click", function (e) {

                            searchInputElement.value = this.getElementsByTagName("input")[0].value;

                            closeAllLists();
                        });
                        searchListDiv.appendChild(listElementDiv);
                    }
                }
            }
        });
        closeAllLists();
        xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=eiffel%20tower&lang=en_US&units=km");
        xhr.setRequestHeader("x-rapidapi-host", travelAdvisorHost);
        xhr.setRequestHeader("x-rapidapi-key", travelAdvisorKey);

        xhr.send();

    }, 500));


    let closeAllLists = elmnt => {

        let x = document.getElementsByClassName("search-city-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != searchInputElement) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", e => {
        closeAllLists(e.target);
    });
}

search();
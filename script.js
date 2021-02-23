var dataToDisplay;
var subButton = document.querySelector('#sub');
var locationInput = document.querySelector('#locationSearch');
var queryInput = document.querySelector('#querySearch');
var cardContainer = document.querySelector('#card_container');
var loadingGif = document.querySelector('#loadingGif');

function searchLibrary(qParam, location){
    console.log('search started');
    var urlToSearch = 'https://www.loc.gov/search/?q='+ qParam + '&fa=location:' + location +'&c=20&fo=json';
    cardContainer.innerHTML = '';
    loadingGif.style.display = 'block';
    fetch(urlToSearch)
        .then(function (response){
            // console.log(JSON.parse(response));
            // console.log(response.json());
            return response.json();
        }).then(function (data){
            // console.log(data.results);
            loadingGif.style.display = 'none';
            dataToDisplay = data.results;
            console.log(dataToDisplay);
            displayData();
        });
}

function displayData(){
    dataToDisplay.forEach(element => {
        // var card = $('<div>');
        // var title = $('<h1>');
        // // var dateLocation = $('<h6>');
        // // var img = $('<img>');
        // // var description = $('<p>');
        // title.textContent = element.title;
        // card.append(title);
        // $(cardContainer).append(card);
        var card = document.createElement("div");
        var title = document.createElement("h1");
        var dateLocation = document.createElement("h6");
        var description = document.createElement("p");
        var image = document.createElement('img');
        var linkButton = document.createElement('button');

        linkButton.setAttribute('type', 'button');
        linkButton.setAttribute('class', 'btn btn-secondary col-12 col-md-2 col-lg-2');
        linkButton.textContent = 'read more';

        description.textContent = element.description[0];

        dateLocation.textContent = element.date + ', ' + element.location[element.location.length-1];

        title.textContent = element.title;

        image.setAttribute('src', element.image_url[0])
        image.width = '300';

        linkButton.onclick = function(){
            window.location.href = element.url;
        }

        card.setAttribute('class', 'card mt-2 mb-2');
        card.append(title);
        card.append(dateLocation);
        card.append(image);
        card.append(description);
        card.append(linkButton);
        cardContainer.append(card);
    });
}



$(subButton).click(function(event){
    event.preventDefault();
    var locationVal = locationInput.value;
    var qVal = queryInput.value;
    searchLibrary(qVal, locationVal);
});



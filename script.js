var dataToDisplay;
var subButton = $('#sub');
var locationInput = $('#locationSearch');
var queryInput = $('#querySearch');
var cardContainer = $('#card_container');
var loadingGif = $('#loadingGif');

function searchLibrary(qParam, location){
    console.log('search started');
    var urlToSearch = 'https://www.loc.gov/search/?q='+ qParam + '&fa=location:' + location +'&c=20&fo=json';
    cardContainer.html('');
    loadingGif.attr('style', 'display:block;');
    fetch(urlToSearch)
        .then(function (response){
            // console.log(JSON.parse(response));
            // console.log(response.json());
            return response.json();
        }).then(function (data){
            // console.log(data.results);
            loadingGif.attr('style', 'display:none;');
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
        var card = $('<div></div>');
        var title = $('<h1>');
        var dateLocation = $('<h6>');
        var description = $('<p>');
        var image = $('<img>');
        var linkButton = $('<button>');

        linkButton.attr('type', 'button')
        linkButton.attr('class', 'btn btn-secondary col-12 col-md-2 col-lg-2');
        linkButton.text('read more');

        description.text(element.description[0]);

        dateLocation.text(element.date + ', ' + element.location[element.location.length-1]);

        title.text(element.title);


        image.attr('src', element.image_url[0]);
        image.width('300');

        linkButton.onclick = function(){
            window.location.href = element.url;
        }
        console.log(card);
        card.attr('class', 'card mt-2 mb-2');
        card.append(title);
        card.append(dateLocation);
        card.append(image);
        card.append(description);
        card.append(linkButton);
        cardContainer.append(card);

        
        
    });
}



subButton.on('click', function(event){
    event.preventDefault();
    var locationVal = locationInput.val();
    var qVal = queryInput.val();
    searchLibrary(qVal, locationVal);
});



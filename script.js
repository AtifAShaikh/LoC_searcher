function searchLibrary(qParam, location){
    console.log('search started');
    urlToSearch = 'https://www.loc.gov/search/?q='+ qParam + '&fa=location:' + location +'&c=20&fo=json'
    fetch(urlToSearch)
        .then(function (response){
            // console.log(JSON.parse(response));
            // console.log(response.json());
            return response.json();
        }).then(function (data){
            console.log(data.results);
        })
}

searchLibrary('beach', 'california');
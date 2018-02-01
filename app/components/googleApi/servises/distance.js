export function distanceCount(app) {
    app.service('distanceCount', function($http) {
        this.address = document.getElementsByClassName('place-input');
        this.distance = {value: ''};

	    for(let i=0; i< this.address.length; i++){
	       new google.maps.places.Autocomplete(this.address[i]);
	    }

        // this.getDistance = (origins, destinations, key) => {
        //     let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        //     let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${key}`;
        //     $http.get(proxyUrl + url)
        //     .then(
        //         response => {
        //             this.distance.value = response.data.rows[0].elements[0].distance.text;
        //         },
        //         error => {
        //             console.dir(error);
        //         })
        // };
	    
            // let distance = fetch(proxyUrl + url)
            // .then(r => r.json())
            // .then(data => data)
            // .catch(e => console.log("Booo"));
            // console.log(distance);
            // return distance
        // }   
    });
}

export function distanceCount(app) {
    app.service('distanceCount', function() {
    	this.defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-33.8902, 151.1759),
            new google.maps.LatLng(-33.8474, 151.2631));

        this.options = {
            bounds: this.defaultBounds,
            types: []
        };

        this.address = document.getElementsByClassName('place-input search');

	    for(let i=0; i< this.address.length; i++){
	       new google.maps.places.Autocomplete(this.address[i], this.options);
	    }
    });
}

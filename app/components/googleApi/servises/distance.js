export function distanceCount(app) {
    app.service('distanceCount', function() {
        this.address = document.getElementsByClassName('place-input');

	    for(let i=0; i< this.address.length; i++){
	       new google.maps.places.Autocomplete(this.address[i]);
	    }
    });
}

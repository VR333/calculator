export function distanceCount(app) {
    app.service('distanceCount', function($http) {
        this.address = document.getElementsByClassName('place-input');

	    for(let i=0; i< this.address.length; i++){
	       new google.maps.places.Autocomplete(this.address[i]);
	    }

	    this.request = (origins, destinations) => {
	    	$http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${this.api}`)
                    .then(
                    function(response) {
                        console.dir(response);
                        // $scope.distance = response.data;
                    },
                    function(error) {
                        console.dir(error);
                    }
                );
	    };        
    });
}

import {distanceCount} from './servises/distance.js';

export function distance(app) {
    const DistanceCount = distanceCount(app);

    app.directive('distance', function(){
        return {
            scope: true,
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl: './app/components/googleApi/template.html'
        };

        function ctrl($scope, $http, distanceCount) {
            this.origins = '';
            this.destinations = '';
            this.distance = '';
            this.key = 'AIzaSyBsMeetk8vb5UFAtlZ3A6agbV-Nr8q-UV4';

            this.countDistance = () => {
                this.distance = '';
                let origins = encodeURI(this.origins);
                let destinations = encodeURI(this.destinations);

                // distanceCount.getDistance(origins, destinations, this.key);

                let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.origins}&destinations=${this.destinations}&key=${this.key}`;

                $http.get(proxyUrl + url)
                .then(
                    response => {
                        if (response.data.rows[0].elements[0].distance === undefined) {
                            alert('Ooops, you can`t get there by car.. :(');
                        } else {
                            this.distance = response.data.rows[0].elements[0].distance.text;
                        }
                    },
                    error => {
                        console.dir(error);
                    })
            }
        }
    })
}

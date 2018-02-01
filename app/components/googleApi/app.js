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

        function ctrl(distanceCount) {
            this.origins = '';
            this.destinations = '';
            this.distance = '';
            this.api = 'AIzaSyBsMeetk8vb5UFAtlZ3A6agbV-Nr8q-UV4';

            this.countDistance = () => {
                let origins = encodeURI(this.origins);
                let destinations = encodeURI(this.destinations);

                distanceCount.request(origins, destinations);   
            };
        }
    });
}


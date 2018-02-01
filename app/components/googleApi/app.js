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

            $scope.distance = '';

            this.api = 'AIzaSyBsMeetk8vb5UFAtlZ3A6agbV-Nr8q-UV4';

            this.lol = (event) => {
                console.dir(event);
                console.log(event.target.value);
            };

            this.countDistance = () => {
                $http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.origins}&destinations=${this.destinations}&key=${this.api}`)
                    .then(function(response) {
                        console.dir(response.data);
                        $scope.distance = response.data;
                    }
                );
            };
        }
    });
}


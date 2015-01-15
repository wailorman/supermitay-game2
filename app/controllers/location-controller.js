define(
    [ 'app' ],
    function ( app ) {

        console.log( 'controller: location' );


        return app.controller( 'LocationController',

            [ '$scope', 'locationService', 'screenService',

                function ( $scope, locationService, screenService ) {


                    this.locations = locationService.locations;

                    this.coords = { x: 0, y: 0 };

                    this.getStyleByCoords = function ( coords ) {

                        return {
                            top:  coords.y,
                            left: coords.x
                        };

                    };


                } ] );

    }
);
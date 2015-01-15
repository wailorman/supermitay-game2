define(
    [ 'app' ],
    function ( app ) {

        console.log( 'service: location' );


        return app.service( 'locationService', function () {

            this.locations = [
                new Location( { x: 150, y: 250 } ),
                new Location( { x: 320, y: 140 } ),
                new Location( { x: 390, y: 298 } ),
                new Location( { x: 554, y: 185 } )
            ];

            this.size = {
                width: 200,
                height: 240
            };

        } );


        function Location( coords ) {

            this.coords = coords;

        }

    }
);
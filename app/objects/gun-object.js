define(
    [
        'app',
        'enemy',
        'async'
    ],
    function ( app, Enemy, async ) {

        console.log( 'tunnel' );

        function getRandomInt( min, max ) {
            return Math.floor( Math.random() * (max - min + 1) ) + min;
        }

        return app
            .service( 'gunService', [ '$rootScope',
                function ( $rootScope ) {



                } ] );


    }
);
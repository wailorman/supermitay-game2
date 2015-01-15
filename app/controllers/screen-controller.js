define(
    [ 'app' ],

    function ( app ) {

        "use strict";

        console.log( 'im at screen controller' );

        return app.controller( 'ScreenController', [ '$scope', function( $scope ){

            var vm = this;

            vm.locations = [
                { x: 23, y: 10 },
                { x: 23, y: 10 },
                { x: 23, y: 10 },
                { x: 23, y: 10 }
            ];

        } ] );

    }
);
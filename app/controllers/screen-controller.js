define(
    [ 'app' ],

    function ( app ) {

        "use strict";

        console.log( 'im at screen controller' );

        return app.controller( 'ScreenController', [ '$scope', function( $scope ){

            var vm = this;

            vm.tunnels = [
                { x: 23, y: 10 },
                { x: 23, y: 10 },
                { x: 23, y: 10 },
                { x: 23, y: 10 }
            ];

        } ] );

    }
);
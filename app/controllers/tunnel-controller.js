define(
    [ 'app' ],
    function ( app ) {

        console.log( 'controller: tunnel' );


        return app.controller( 'TunnelController',

            [ '$scope', 'tunnelService', 'screenService',

                function ( $scope, tunnelService, screenService ) {


                    this.tunnels = tunnelService.tunnels;

                    this.coords = { x: 0, y: 0 };


                } ] );

    }
);
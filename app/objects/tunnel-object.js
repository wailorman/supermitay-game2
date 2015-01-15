define(
    [ 'app' ],
    function ( app ) {

        console.log( 'tunnel' );


        return app
            .directive( 'tunnelObject', function(){

                return {
                    restrict: 'E',

                    transclude: true,

                    scope: {
                        posX: '@',
                        posY: '@'
                    },

                    controllerAs: 'TunnelController',
                    controller: [ '$scope', 'tunnelService',
                        function ( $scope, tunnelService ) {


                            this.tunnels = tunnelService.tunnels;

                            this.coords = { x: 0, y: 0 };


                        } ],

                    templateUrl: './app/views/tunnel-template.html'
                };

            } )
            .service( 'tunnelService', function () {

                this.tunnels = [
                    new Tunnel( { x: 150, y: 250 } ),
                    new Tunnel( { x: 320, y: 140 } ),
                    new Tunnel( { x: 390, y: 298 } ),
                    new Tunnel( { x: 554, y: 185 } )
                ];

                this.size = {
                    width:  200,
                    height: 240
                };

            } );


        function Tunnel( coords ) {

            this.coords = coords;

        }

    }
);
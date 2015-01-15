define( [
    'app',
    'tunnel'
], function ( app ) {

    console.log( 'screen' );


    return app
        .directive( 'screenObject', function () {

            return {
                restrict:   'E',
                transclude: true,

                controllerAs: 'ScreenController',
                controller:   [ '$scope', 'tunnelService',
                    function ( $scope, tunnelService ) {

                        var vm = this;

                        vm.tunnels = tunnelService.tunnels;

                    } ],

                template: '<div class="screen" ng-transclude></div>'
            };

        } )
        .service( 'screenService', function () {

            this.screenSize = {
                width:  960,
                height: 480
            };

        } );


} );
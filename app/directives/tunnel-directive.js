define([
    'app'
], function ( app ) {

    console.log( 'directive: tunnelObject' );


    return app.directive( 'tunnelObject', function(){

        return {
            restrict: 'E',

            transclude: true,

            scope: {
                posX: '@',
                posY: '@'
            },

            templateUrl: './app/views/tunnel-template.html'
        };

    } );

});
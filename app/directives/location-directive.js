define([
    'app'
], function ( app ) {

    console.log( 'directive: locationObject' );


    return app.directive( 'locationObject', function(){

        return {
            restrict: 'E',

            scope: {
                posX: '@',
                posY: '@'
            },

            templateUrl: './app/views/location-template.html'
        };

    } );

});
define([
    'app'
], function ( app ) {

    console.log( 'directive: locationsGroup' );


    return app.directive( 'locationsGroup', function(){

        return {
            restrict: 'E',

            templateUrl: './app/views/locations-group-template.html'
        };

    } );

});
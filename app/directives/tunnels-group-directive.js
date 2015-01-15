define([
    'app'
], function ( app ) {

    console.log( 'directive: tunnelsGroup' );


    return app.directive( 'tunnelsGroup', function(){

        return {
            restrict: 'E',

            transclude: true,

            templateUrl: './app/views/tunnels-group-template.html'
        };

    } );

});
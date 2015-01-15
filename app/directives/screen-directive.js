define([
    'app'
], function ( app ) {

    console.log( 'im at screen directive' );


    app.directive( 'screenObject', function(){

        return {
            restrict: 'E',
            transclude: true,
            template: '<div class="screen" ng-transclude></div>'
        };

    } );

});
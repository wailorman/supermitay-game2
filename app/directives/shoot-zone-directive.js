define([
    'app',
    'shoot-zone-controller'
], function ( app ) {

    console.log( 'im at screen directive' );


    app.directive( 'shootZoneObject', function(){

        return {
            restrict: 'E',
            template: '<div class="shoot-zone" ng-controller="ShootZoneCtrl">' +
                      '     ' +
                      '</div>',

            controller: function( $scope ){



            }

        };

    } );

});
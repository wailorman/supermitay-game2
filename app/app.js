define( 'app', [

        //'./services/screen-service'

        'angular',
        'angular-route'

    ],
    function ( angular ) {

        //"use strict";


        console.log( 'im at app' );

        return angular.module( 'gameTwo', [ 'ngRoute' ] );

    } );


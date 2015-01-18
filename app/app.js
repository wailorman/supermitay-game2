define( 'app', [

        //'./services/screen-service'

        'angular',
        'angular-route'

    ],
    function ( angular ) {

        //"use strict";


        console.log( 'im at app' );

        //angular.bootstrap( document, [ 'gameTwo' ] );

        var bg = new Audio('http://mircheg.ru/supermitay/game2/bg.mp3');
        bg.volume = 0.3;
        bg.play();

        return angular.module( 'gameTwo', [ 'ngRoute' ] );

    } );


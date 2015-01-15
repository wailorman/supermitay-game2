require.config({

    //baseUrl: 'app',

    paths: {
        'angular': '../bower_components/angular/angular',
        'app': '../app/app',

        'tunnel': '../app/objects/tunnel-object',
        'enemy': '../app/objects/enemy-object',
        'screen': '../app/objects/screen-object'
    },

    shim: {

        'angular': {
            exports: 'angular'
        },

        'app': {
            deps: [ 'angular' ],
            exports: 'app'
        }

    }

});

define([
    'angular',
    'app',

    'tunnel',
    'enemy',
    'screen'

], function( angular ){

    console.log( 'im at main' );

    angular.bootstrap( document, ['gameTwo']);

});


require.config({

    //baseUrl: 'app',

    paths: {
        'angular': '../bower_components/angular/angular',
        'app': '../app/app'
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

    '../app/controllers/screen-controller.js',
    '../app/controllers/location-controller',
    //'../app/controllers/shoot-zone-controller',

    '../app/directives/location-directive',
    '../app/directives/locations-group-directive',
    '../app/directives/screen-directive',
    //'../app/directives/shoot-zone-directive',

    '../app/services/location-service',
    '../app/services/screen-service',
    '../app/services/target-service'
], function( angular ){

    console.log( 'im at main' );

    angular.bootstrap( document, ['gameTwo']);

});


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

    '../app/controllers/screen-controller',
    '../app/controllers/tunnel-controller',
    //'../app/controllers/shoot-zone-controller',

    '../app/directives/tunnel-directive',
    '../app/directives/tunnels-group-directive',
    '../app/directives/screen-directive',
    //'../app/directives/shoot-zone-directive',

    '../app/services/tunnel-service',
    '../app/services/screen-service',
    '../app/services/target-service'
], function( angular ){

    console.log( 'im at main' );

    angular.bootstrap( document, ['gameTwo']);

});


define([
        'app'
    ], function () {

        "use strict";

        var app = require( 'app' );

        app.service( 'screenService', function() {

            this.screenSize = {
                width: 960,
                height: 480
            };

        } );

    }
);


// ENEMY

define(
    [ 'app' ],
    function ( app ) {

        console.log( 'enemy directive' );

        return app.directive( 'enemyObject', function () {

            return {

                restrict: 'E',

                scope: {

                    index: '@'

                },

                templateUrl: './app/views/enemy-template.html'

            };

        } );

    }
);
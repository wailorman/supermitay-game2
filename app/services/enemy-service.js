define(
    [ 'app' ],
    function ( app ) {


        console.log( 'service: enemy' );


        var lookTime = 5000;
        var timeOfMove = 1000;


        return app.service( 'enemyService', function () {

            this.enemies = [
                new Enemy(),
                new Enemy(),
                new Enemy(),
                new Enemy()
            ];

            this.size = {
                width:  200,
                height: 240
            };

        } );


        function Enemy() {

            var enemy = this;

            // TODO
            var numberOfEnemyTypes = 2;

            enemy.type = parseInt( Math.random() * 2 ) + 1;

            enemy.isLooked = false;

            enemy.look = function () {

                enemy.isLooked = true;

                setTimeout( function () {

                    enemy.isLooked = false;

                }, lookTime + timeOfMove );

            };

        }

    }
);
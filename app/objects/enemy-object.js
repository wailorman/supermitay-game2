define(
    'enemy',
    [ 'app' ],
    function ( app ) {

        function getRandomInt( min, max ) {
            return Math.floor( Math.random() * (max - min + 1) ) + min;
        }


        console.log( 'enemy' );

        return function Enemy() {

            var enemy = this;

            enemy.type = parseInt( Math.random() * 2 ) + 1;

            enemy.position = 'down';

            enemy.togglePosition = function () {

                enemy.position = enemy.position == 'down' ? 'up' : 'down';
                console.log( 'toggle pos! ' + enemy.position );



            };

/*            setInterval( function () {


                enemy.togglePosition();

                //console.log( enemy.position );

            }, 1600 );*/

        }


    }
);


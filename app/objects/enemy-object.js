define(
    [ 'app' ],
    function ( app ) {

        console.log( 'enemy' );

        var lookTime = 5000;
        var timeOfMove = 1000;


        return app
            .directive( 'enemyObject', function () {

                return {

                    restrict: 'E',

                    scope: {

                        index: '@'

                    },

                    controllerAs: 'EnemyController',
                    controller: [ '$scope', 'enemyService',
                        function ( $scope, enemyService ) {

                            var vm = this;

                            vm.enemies = enemyService.enemies;

                            // initialize

                            vm.enemyClassType = 'enemy' + vm.enemies[ $scope.index ].type;
                            vm.class = 'enemy' + this.type;



                        } ],

                    templateUrl: './app/views/enemy-template.html'

                };

            } )
            .service( 'enemyService', function () {

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
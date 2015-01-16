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
                            vm.enemy = vm.enemies[ $scope.index ];


                            // initialize

                            vm.enemyTypeClass = 'enemy' + vm.enemies[ $scope.index ].type;
                            $scope.positionClass = vm.enemy.position;

                            $scope.$watchCollection( 'vm.enemies', function () {

                                console.log( '\n\n\n\n' + JSON.stringify(vm.enemies) + '\n\n\n\n\n' );

                            });

                            vm.up = vm.enemy.up;

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

            enemy.position = 'down';
            console.log( 'position: ' + enemy.position );

            setTimeout( function () {

                enemy.position = 'up';
                console.log( 'position: ' + enemy.position );

            }, 2000 );

            enemy.up = function () {

                //console.log( 'up!' );

                enemy.position = 'up';
                console.log( 'position: ' + enemy.position );

            };

        }

    }
);
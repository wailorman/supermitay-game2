define(
    [ 'app' ],
    function ( app ) {

        console.log( 'controller: enemy' );


        return app.controller( 'EnemyController',

            [ '$scope', 'tunnelService', 'screenService',

                function ( $scope, enemyService, screenService ) {

                    this.type = $scope.index;

                    this.class = 'enemy' + this.type;

                    this.enemies = enemyService.enemies;

                    this.coords = { x: 0, y: 0 };


                } ] );

    }
);
define(
    [
        'app',
        'enemy'
    ],
    function ( app, Enemy ) {

        console.log( 'tunnel' );

        function getRandomInt( min, max ) {
            return Math.floor( Math.random() * (max - min + 1) ) + min;
        }

        return app
            .controller( 'TunnelController', [ '$scope', '$rootScope', 'tunnelService',
                function ( $scope, $rootScope, tunnelService ) {

                    $scope.tunnels = tunnelService.tunnels;

                    $scope.enemies = tunnelService.enemies;

                    $rootScope.$on( 'updateEnemiesPos', function(){

                        $scope.enemies = tunnelService.enemies;
                        $scope.$apply();
                        //console.log( '1' );
                        
                    }, true );

                    $scope.getStyleByPos = function ( x, y ) {
                        return " top: " + y + "px; left: " + x + "px";
                    };

                } ] )


            .service( 'tunnelService', [ '$rootScope',
                function ( $rootScope ) {

                    function Tunnel( coords ) {

                        this.position = {};
                        this.position.x = coords.x;
                        this.position.y = coords.y;

                        this.enemy = new Enemy();

                        this.hey = '1';

                    }

                    function Enemy() {

                        var enemy = this;

                        enemy.type = parseInt( Math.random() * 2 ) + 1;

                        enemy.position = 'down';

                        enemy.togglePosition = function () {

                            enemy.position = enemy.position == 'down' ? 'up' : 'down';
                            //console.log( 'toggle pos! ' + enemy.position );
                            $rootScope.$broadcast( 'updateEnemiesPos' );

                        };

                        enemy.showInterval = setInterval( function(){

                            enemy.togglePosition();

                        }, getRandomInt( 1300, 3200 ) );


                        enemy.startIntervalAgain = function () {

                            clearInterval( enemy.showInterval );

                            // Time before spawn new enemy
                            setTimeout( function () {

                                enemy.showInterval = setInterval( function(){

                                    enemy.togglePosition();

                                }, getRandomInt( 1300, 3200 ) );

                            }, 2000 );

                        };

                    }

                    this.tunnels = [
                        new Tunnel( { x: 150, y: 250 } ),
                        new Tunnel( { x: 320, y: 140 } ),
                        new Tunnel( { x: 390, y: 298 } ),
                        new Tunnel( { x: 554, y: 185 } )
                    ];

                    this.enemies = [
                        new Enemy(),
                        new Enemy(),
                        new Enemy(),
                        new Enemy()
                    ];

                } ] );


    }
);
define(
    [
        'app',
        'enemy',
        'async'
    ],
    function ( app, Enemy, async ) {

        console.log( 'tunnel' );

        function getRandomInt( min, max ) {
            return Math.floor( Math.random() * (max - min + 1) ) + min;
        }

        return app
            .controller( 'TunnelController', [ '$scope', '$rootScope', 'tunnelService',
                function ( $scope, $rootScope, tunnelService ) {

                    $scope.safeApply = function(fn) {
                        var phase = this.$root.$$phase;
                        if(phase == '$apply' || phase == '$digest') {
                            if(fn && (typeof(fn) === 'function')) {
                                fn();
                            }
                        } else {
                            this.$apply(fn);
                        }
                    };

                    $scope.tunnels = tunnelService.tunnels;

                    $scope.enemies = tunnelService.enemies;

                    $rootScope.$on( 'updateEnemiesData', function(){

                        $scope.enemies = tunnelService.enemies;
                        $scope.safeApply();
                        //console.log( '1' );
                        
                    }, true );

                    $scope.getStyleByPos = function ( x, y ) {
                        return " top: " + y + "px; left: " + x + "px";
                    };

                } ] )


            .service( 'tunnelService', [ '$rootScope',
                function ( $rootScope ) {

                    var tunnelService = this;

                    function Tunnel( coords ) {

                        this.position = {};
                        this.position.x = coords.x;
                        this.position.y = coords.y;

                        this.enemy = new Enemy();

                        this.hey = '1';

                    }

                    function Enemy() {

                        var enemy = this;

                        var timeToMove = 500,
                            timeBeforeStartShooting = 600,
                            timeToShoot = 1000;

                        enemy.type = parseInt( Math.random() * 2 ) + 1;

                        enemy.position = 'down';
                        enemy.laserVisible = false;

                        enemy.availableToMove = true;

                        enemy.togglePosition = function () {

                            enemy.position = enemy.position == 'down' ? 'up' : 'down';
                            //console.log( 'toggle pos! ' + enemy.position );
                            $rootScope.$broadcast( 'updateEnemiesData' );

                        };

                        enemy.look = function() {

                            if ( enemy.availableToMove == false ) return false;

                            var timeToLook = getRandomInt( 1000, 2000 );

                            async.series(
                                [

                                    // go to surface
                                    function( scb ){

                                        if ( ! enemy.availableToMove ) scb( true ); // call error

                                        enemy.availableToMove = false;
                                        enemy.position = 'up';

                                        $rootScope.$broadcast( 'updateEnemiesData' );

                                        setTimeout( scb, timeToMove + timeBeforeStartShooting );

                                    },

                                    // start shooting
                                    function( scb ){

                                        enemy.laserVisible = true;

                                        $rootScope.$broadcast( 'updateEnemiesData' );

                                        setTimeout( scb, timeToShoot );

                                    },

                                    // stop shooting
                                    function ( scb ){

                                        enemy.laserVisible = false;

                                        $rootScope.$broadcast( 'updateEnemiesData' );

                                        scb();

                                    },

                                    // go down
                                    function ( scb ) {

                                        enemy.laserVisible = false;
                                        enemy.position = 'down';

                                        $rootScope.$broadcast( 'updateEnemiesData' );

                                        setTimeout( function () {

                                            enemy.availableToMove = true;

                                            $rootScope.$broadcast( 'updateEnemiesData' );

                                            scb();

                                        }, timeToMove );

                                    }

                                ],
                                function(){}
                            );





                        };

                        setInterval( function(){

                            enemy.look();

                        }, getRandomInt( 2500, 4000 ) );

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
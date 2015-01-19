define(
    [
        'app',
        'enemy',
        'async'
    ],
    function ( app, Enemy, async ) {

        var tunnelBodySize = {
            width: 126,
            height: 240
        };

        var tunnelSize = {
            width: 200,
            height: 240
        };

        console.log( 'tunnel' );

        function getRandomInt ( min, max ) {
            return Math.floor( Math.random() * (max - min + 1) ) + min;
        }

        return app
            .controller( 'TunnelController', [ '$scope', '$rootScope', 'tunnelService',
                function ( $scope, $rootScope, tunnelService ) {

                    $scope.tunnelSize = tunnelSize;

                    $scope.safeApply = function ( fn ) {
                        var phase = this.$root.$$phase;
                        if ( phase == '$apply' || phase == '$digest' ) {
                            if ( fn && (typeof(fn) === 'function') ) {
                                fn();
                            }
                        } else {
                            this.$apply( fn );
                        }
                    };

                    $scope.tunnels = tunnelService.tunnels;

                    $scope.shootZones = tunnelService.shootZones;

                    $scope.enemies = tunnelService.enemies;

                    $rootScope.$on( 'updateEnemiesData', function () {

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

                    function Tunnel ( coords ) {

                        var self = this;
                        var tunnelObject = this;

                        this.position = {};
                        this.position.x = coords.x;
                        this.position.y = coords.y;


                        this.hey = '1';

                        var offset = [
                            {
                                x: 45,
                                y: -90
                            },
                            {
                                x: -45,
                                y: -210
                            }
                        ];

                        this.shootZone = [
                            { // first
                                x: self.position.x + offset[ 0 ].x,
                                y: self.position.y + offset[ 0 ].y
                            },
                            { // second
                                x: self.position.x + tunnelSize.width + offset[ 1 ].x,
                                y: self.position.y + tunnelSize.height + offset[ 1 ].y
                            }
                        ];

                        this.enemy = new Enemy( this );

                    }

                    function Enemy ( parentTunnel ) {

                        var enemy = this;
                        var enemyObject = this;

                        var timeToMove = 500,
                            timeBeforeStartShooting = 350,
                            timeToShoot = 700 + timeBeforeStartShooting;

                        enemy.shootZone = parentTunnel.shootZone;

                        enemy.killedMark = false;

                        enemy.position = 'down';
                        enemy.availableToMove = true;

                        enemy.laserVisible = false;


                        enemy.kill = function ( callback ) {

                            if ( enemy.position != 'up' ) return false;
                            if ( enemy.killedMark == true ) return false;

                            enemy.stopShooting();
                            enemy.killedMark = true;
                            $rootScope.$broadcast( 'updateEnemiesData' );

                            $rootScope.$broadcast( 'enemyWasKilled' );

                            callback();

                        };

                        enemy.reSpawn = function () {

                            enemy.type = getRandomInt( 0, 9 ); // Random enemy type
                            enemy.killedMark = false;

                        };

                        enemy.goUp = function ( callback ) {
                            enemy.move( 'up', callback );
                        };

                        enemy.goDown = function ( callback ) {
                            enemy.move( 'down', callback );
                        };

                        enemy.move = function ( pos, callback ) {

                            if ( !enemy.availableToMove ) return false;

                            enemy.availableToMove = false;
                            enemy.stopShooting();

                            enemy.position = pos;
                            $rootScope.$broadcast( 'updateEnemiesData' );

                            setTimeout( function () {

                                enemy.availableToMove = true;
                                callback();

                            }, timeToMove );

                        };

                        enemy.clearPlayerHitInterval = function () {

                            if ( enemy.playerHitInterval ) return clearInterval( enemy.playerHitInterval );

                        };

                        enemy.startPlayerHitInterval = function () {

                            enemy.playerHitInterval = setInterval( function () {

                                $rootScope.$broadcast( 'laserShootToPlayer' );

                            }, 250 );

                        };

                        enemy.startShooting = function () {

                            if ( enemy.position != 'up' || enemy.killedMark == true ) return false;

                            enemy.availableToMove = false;
                            $rootScope.$broadcast( 'updateEnemiesData' );
                            enemy.laserVisible = true;

                            enemy.startPlayerHitInterval();

                        };

                        enemy.stopShooting = function () {

                            enemy.laserVisible = false;
                            $rootScope.$broadcast( 'updateEnemiesData' );
                            enemy.availableToMove = true;

                            enemy.clearPlayerHitInterval();

                        };

                        var isShootPointInShootZone = function ( shootPoint ) {

                            var shootZone = enemy.shootZone;

                            return shootPoint.x >= shootZone[ 0 ].x && shootPoint.y >= shootZone[ 0 ].y &&
                                shootPoint.x <= shootZone[ 1 ].x && shootPoint.y <= shootZone[ 1 ].y;


                        };

                        /**
                         * Trigger playerShoot event. Call on every shoot even though player not been hit any enemy
                         *
                         * @returns {Function|function()|*}
                         * @param [callOnPlayerKilled]
                         */
                        var createPlayerShootTrigger = function ( callOnPlayerKilled ) {
                            return $rootScope.$on( 'playerShooted', function ( event, shootPoint ) {

                                if ( isShootPointInShootZone( shootPoint ) ) {

                                    enemy.kill( callOnPlayerKilled );

                                }

                            } );
                        };


                        var removePlayerShootTrigger = function () {
                            return createPlayerShootTrigger()();
                        };

                        enemy.look = function () {

                            async.series( [

                                // . Go up
                                function ( scb ) {

                                    enemy.goUp( scb );

                                },

                                // . Shoot!
                                function ( scb ) {

                                    setTimeout( function () {

                                        enemy.startShooting();

                                    }, timeBeforeStartShooting );


                                    // Listen to player shoots
                                    createPlayerShootTrigger( function () {

                                        // player has hit enemy

                                        clearTimeout( shootTimeout );

                                        //enemy.kill();

                                        scb();

                                    } );

                                    // Shoot time is timed out
                                    var shootTimeout = setTimeout( function () {

                                        removePlayerShootTrigger();
                                        scb();

                                    }, timeToShoot );


                                },

                                // . Go down
                                function ( scb ) {

                                    enemy.stopShooting();
                                    enemy.goDown( function () {

                                        // If enemy was killed

                                        if ( enemy.killedMark ) {

                                            enemy.clearLookInterval();

                                            enemy.reSpawn();
                                            enemy.restartLookInterval();

                                        }

                                        scb();

                                    } );

                                }

                            ] );
                        };

                        enemy.restartLookInterval = function () {

                            enemy.lookInterval = setInterval( function () {

                                enemy.look();

                            }, getRandomInt( 2500, 7000 ) );

                        };

                        enemy.clearLookInterval = function () {

                            if ( enemy.lookInterval ) {
                                enemy.stopShooting();
                                clearInterval( enemy.lookInterval );
                            }

                        };

                        // -------------------------------------------------
                        // Constructor
                        // -------------------------------------------------

                        enemy.reSpawn();
                        enemy.restartLookInterval();


                        // -------------------------------------------------

                        // -------------------------------------------------
                        // Destructor
                        // -------------------------------------------------

                        $rootScope.$on( 'stopEnemiesShooting', function () {

                            enemy.clearLookInterval();

                        } );

                        // -------------------------------------------------

                    }

                    this.tunnels = [
                        new Tunnel( { x: 150, y: 250 } ),
                        new Tunnel( { x: 320, y: 140 } ),
                        new Tunnel( { x: 390, y: 298 } ),
                        new Tunnel( { x: 554, y: 185 } )
                    ];

                } ] );


    }
);
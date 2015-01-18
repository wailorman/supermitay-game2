define(
    [
        'app',
        'enemy',
        'async'
    ],
    function ( app, Enemy, async ) {

        var tunnelBodySize = {
            width:  126,
            height: 240
        };

        var tunnelSize = {
            width:  200,
            height: 240
        };

        console.log( 'tunnel' );

        function getRandomInt( min, max ) {
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

                    /*$scope.getShootZoneStyle = function ( tunnelId ) {

                     var shootZonePos = tunnelService.shootZones[ tunnelId ];
                     var tunnelPosition

                     var style = {

                     top:  shootZonePos[ 0 ].y,
                     left: shootZonePos[ 0 ].x,

                     right: shootZonePos[ 1 ].x - tunnelService.tunnels[ tunnelId ].position.x - tunnelSize.x,
                     bottom: shootZonePos[ 1 ].y - tunnelService.tunnels[ tunnelId ].position.y - tunnelSize.y

                     };

                     return "top: "+style.top+"px; " +
                     "left: "+style.left+"px; " +
                     "right: "+style.right+"px; " +
                     "bottom: "+style.bottom+"px";

                     };*/

                } ] )


            .service( 'tunnelService', [ '$rootScope',
                function ( $rootScope ) {

                    var tunnelService = this;

                    function Tunnel( coords ) {

                        var self = this;

                        this.position = {};
                        this.position.x = coords.x;
                        this.position.y = coords.y;

                        this.enemy = new Enemy();

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

                    }

                    function Enemy() {

                        var enemy = this;

                        var timeToMove = 500,
                            timeBeforeStartShooting = 600,
                            timeToShoot = 1000;

                        enemy.type = getRandomInt( 0, 9 );

                        enemy.killed = false;


                        enemy.position = 'up';
                        enemy.availableToMove = true;

                        enemy.laserVisible = false;

                        enemy.kill = function(){

                            enemy.killed = true;
                            $rootScope.$broadcast( 'updateEnemiesData' );

                        };

                        enemy.togglePosition = function () {

                            enemy.position = enemy.position == 'down' ? 'up' : 'down';
                            //console.log( 'toggle pos! ' + enemy.position );
                            $rootScope.$broadcast( 'updateEnemiesData' );

                        };

                        enemy.look = function () {

                            if ( enemy.availableToMove == false ) return false;

                            var timeToLook = getRandomInt( 1000, 2000 );

                            async.series(
                                [

                                    // go to surface
                                    function ( scb ) {

                                        if ( !enemy.availableToMove ) scb( true ); // call error

                                        enemy.availableToMove = false;
                                        enemy.position = 'up';

                                        $rootScope.$broadcast( 'updateEnemiesData' );

                                        setTimeout( scb, timeToMove + timeBeforeStartShooting );

                                    },

                                    // start shooting
                                    function ( scb ) {

                                        enemy.laserVisible = true;

                                        $rootScope.$broadcast( 'updateEnemiesData' );

                                        setTimeout( scb, timeToShoot );

                                    },

                                    // stop shooting
                                    function ( scb ) {

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
                                function () {
                                }
                            );


                        };

                        setInterval( function () {

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
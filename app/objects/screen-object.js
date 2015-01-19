define( [
    'app',
    'tunnel'
], function ( app ) {

    console.log( 'screen' );


    var getCrossBrowserElementCoords = function ( mouseEvent ) {
        var result = {
            x: 0,
            y: 0
        };

        if ( !mouseEvent ) {
            mouseEvent = window.event;
        }

        if ( mouseEvent.pageX || mouseEvent.pageY ) {
            result.x = mouseEvent.pageX;
            result.y = mouseEvent.pageY;
        }
        else if ( mouseEvent.clientX || mouseEvent.clientY ) {
            result.x = mouseEvent.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
            result.y = mouseEvent.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
        }

        if ( mouseEvent.target ) {
            var offEl = mouseEvent.target;
            var offX = 0;
            var offY = 0;

            if ( typeof(offEl.offsetParent) != "undefined" ) {
                while ( offEl ) {
                    offX += offEl.offsetLeft;
                    offY += offEl.offsetTop;

                    offEl = offEl.offsetParent;
                }
            }
            else {
                offX = offEl.x;
                offY = offEl.y;
            }

            result.x -= offX;
            result.y -= offY;
        }

        return result;
    };


    return app
        .controller( 'ScreenController', [ '$scope', '$rootScope', 'gunService', 'tunnelService', 'screenService',
            function ( $scope, $rootScope, gunService, tunnelService, screenService ) {

                $scope.gunPosition = {};

                $scope.isBlackBackground = false;

                $scope.showFail = false;

                $scope.tunnels = tunnelService.tunnels;

                $scope.moveGun = function ( $event ) {

                    var mousePos = getCrossBrowserElementCoords( $event );

                    mousePos = {

                        x: mousePos.x - 13,
                        y: mousePos.y - 13

                    };

                    gunService.setPos( mousePos.x, mousePos.y );

                    $scope.gunPosition = {
                        x: mousePos.x,
                        y: mousePos.y
                    };

                };

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

                $scope.callShootEvent = function () {

                    return gunService.callShootEvent();

                };

                $scope.getShootZoneStyle = function ( tunnelId ) {

                    var shootZonePos = tunnelService.tunnels[ tunnelId ].shootZone;

                    return (
                    'top: ' + shootZonePos[ 0 ].y + 'px; ' +
                    'left: ' + shootZonePos[ 0 ].x + 'px; ' +
                    'width: ' + ( shootZonePos[ 1 ].x - shootZonePos[ 0 ].x ) + 'px; ' +
                    'height: ' + ( shootZonePos[ 1 ].y - shootZonePos[ 0 ].y ) + 'px; '
                    );

                };

                $scope.heals = screenService.heals;

                $scope.score = 0;

                $rootScope.$on( 'showFail', function () {

                    $scope.showFail = true;
                    $scope.safeApply();

                } );

                $rootScope.$on( 'becomeBlack', function () {

                    $scope.isBlackBackground = true;
                    $scope.safeApply();

                } );

                $rootScope.$on( 'enemyWasKilled', function () {

                    $scope.score = screenService.score;

                } );

                $rootScope.$on( 'laserShootToPlayer', function () {

                    $scope.heals = screenService.heals;
                    $scope.isShootedHealsLine = true;
                    $scope.safeApply();

                    setTimeout( function () {

                        $scope.isShootedHealsLine = false;
                        $scope.safeApply();

                    }, 400 );

                } );

                $rootScope.$on( 'healsUpdated', function () {

                    $scope.heals = screenService.heals;

                } );

            } ] )
        .service( 'screenService', [ '$rootScope', '$window',
            function ( $rootScope, $window ) {

                var screenService = this;

                screenService.heals = 100;

                $rootScope.$on( 'laserShootToPlayer', function () {

                    if ( screenService.heals <= 0 ) {
                        screenService.restartLevel();
                    }

                    screenService.heals -= 4;
                    //console.log( 'player hit! ' + screenService.heals );
                    $rootScope.$broadcast( 'healsUpdated' );

                } );

                screenService.restartLevel = function () {
                    console.log( 'goto restart level' );

                    screenService.showFail();
                    $rootScope.$broadcast( 'stopEnemiesShooting' );

                    setTimeout( function(){

                        $window.location.reload();

                    }, 3500 );
                };

                screenService.showFail = function () {

                    $rootScope.$broadcast( 'showFail' );

                };

                screenService.becomeBlack = function () {

                    $rootScope.$broadcast( 'becomeBlack' );

                };

                screenService.goToNextLevel = function () {

                    console.log( 'goto next level' );

                    $rootScope.$broadcast( 'stopEnemiesShooting' );

                    screenService.becomeBlack();

                    setTimeout( function () {

                        $window.location.href = 'http://mircheg.ru/supermitay/video3';

                    }, 5000 );

                };

                screenService.score = 0;

                $rootScope.$on( 'enemyWasKilled', function () {

                    screenService.score += 1;
                    console.log( 'enemy was killed ' + screenService.score );


                    if ( screenService.score === 40 ) {
                        screenService.goToNextLevel();
                    }

                } );

            } ] )
        .service( 'gunService', [ '$rootScope', 'tunnelService',
            function ( $rootScope, tunnelService ) {

                var gunService = this;

                gunService.position = {};

                this.setPos = function ( x, y ) {

                    //console.log( 'X: ' + x + ' | Y: ' + y );

                    gunService.position = {
                        x: x,
                        y: y
                    };

                };

                this.callShootEvent = function () {

                    var shootPoint = gunService.position;

                    $rootScope.$broadcast( 'playerShooted', shootPoint );

                };


            } ] );


} );
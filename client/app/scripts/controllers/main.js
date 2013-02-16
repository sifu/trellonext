'use strict';

angular.module( 'clientApp' )
.controller( 'MainCtrl', function( $scope, $http ) {
  $http.get( '/data' )
  .then( function( result ) {
    $scope.boards = result.data;
    $scope.boards.forEach( function( board ) {
      board.hasCards = ( board.doingCards.length > 0 ) || ( board.nextCards.length > 0 );
    } );
  } );
} );

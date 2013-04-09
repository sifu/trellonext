'use strict';

angular.module( 'clientApp' )
.directive( 'sifuSelector', function( ) {
  return {
    restrict: 'A',
    link: function postLink( scope, element, attrs ) {
      element.on( 'click', function( ) {
        var selection = window.getSelection( );
        var range = document.createRange( );
        range.selectNodeContents( element[ 0 ] );
        selection.removeAllRanges( );
        selection.addRange( range );
      } );
    }
  };
} );

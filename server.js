#!/usr/bin/env node

var express = require( 'express' );
var path = require( 'path' );
var Trello = require( 'node-trello' );

var key = 'afedf2d21b6aec66400a3c639c85d65a';
var token = '26c6a3fc361dc1a61f35de8fd0bdb543074c8dded82e7046612d0bd0fe0d8ef4';
var t = new Trello( key, token );

var app = express( );
app.set( 'view engine', 'jade' );
app.set( 'views', __dirname + '/views' );
app.use( '/app', express.static( path.join( __dirname, 'client', 'app' ) ) );


function boardsWithNextCards( t, cb ) {
  var result = [];
  t.get( '/1/members/0xx0/boards', { lists: 'open' }, function( err, boards ) {
    t.get( '/1/members/0xx0/cards/visible', function( err, cards ) {
      boards.filter( function( b ) { return b.closed === false; } )
      .forEach( function( board ) {

        var doingList = board.lists.filter( function( list ) {
          return list.name.toLowerCase( ) === 'doing';
        } );

        if( doingList.length ) {
          var idListDoing = doingList[ 0 ].id;
          var doingCards = cards.filter( function( card ) {
            return card.idList === idListDoing;
          } );
        } else {
          doingCards = [];
        }

        var nextList = board.lists.filter( function( list ) {
          return list.name.toLowerCase( ) === 'next';
        } );

        if( nextList.length ) {
          var idListNext = nextList[ 0 ].id;
          var nextCards = cards.filter( function( card ) {
            return card.idList === idListNext;
          } );
        } else {
          nextCards = [];
        }

        var values = {
          boardName: board.name,
          boardId: board.id,
          boardUrl: board.url,
          nextCards: nextCards,
          doingCards: doingCards
        };
        result.push( values );

      } );
      cb( null, result );
    } );
  } );
}

app.get( '/token', function( req, res ) {
  res.redirect( 'https://trello.com/1/connect?key=' + key + '&name=MyNextCards&response_type=token' );
} );

app.get( '/data', function( req, res ) {
  boardsWithNextCards( t, function( err, boards ) {
    res.json( boards );
  } );
} );

app.get( '/', function( req, res ) {

  boardsWithNextCards( t, function( err, boards ) {
      res.render( 'index', { boards: boards } );
  } );

} );

app.listen( 3000 );
console.info( 'http://127.0.0.1:3000/' );
console.info( 'http://127.0.0.1:3000/app/' );

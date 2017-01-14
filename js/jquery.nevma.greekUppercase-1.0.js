/**
 * jquery.nevma.greekUppercase - v.1.0
 *
 * @author
 * Created by Nevma.gr http://www.nevma.gr/ with <3
 *
 * @description
 * Takes a bunch of elements and replaces greek characters inside it with their
 * uppercase equivalents, so that the CSS text-transform uppercase rule works
 * smoothly on all browsers. 
 *
 * Makes sure that it does alter the internal DOM structure of each element by
 * acting only on the leaf text nodes of the element and its children.
 *
 * Runs by default on elements with class .greek-uppercase.
 */

/**
 * @copyright
 * Copyright (C) 2016 Nevma.gr
 * 
 * @license 
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free 
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *  
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *  
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function ( $ ) {

    // Define jQuery internal object.

    $.greekUppercase = function( element, options ) {

        // Handy reference to the current object scope.

        var base = this;

        base.TEXT_NODE = 3;

        base.element  = element;
        base.$element = $( element );



        // Hierarchically traverses the children of a DOM node.
        
        base.traverseTree = function( $node ) {

            // If it is a text node then make the replacement.

            if ( $node.get( 0 ).nodeType == base.TEXT_NODE ) {

                base.replaceTextNode( $node );
                return;

            }

            // Otherwise it goes into its children.

            $node.contents().each( function () {
                base.traverseTree( $( this ) );
            });

        };



        // Takes a text node and replaces the necessary characters inside it.

        base.replaceTextNode = function( $node ) {

            var node = $node.get( 0 );

            if ( node.nodeType != base.TEXT_NODE ) {
                return;
            }

            var text = node.nodeValue;

            // Replace usual characters.
            
            var char;

            for ( char in base.options.chars ) {

                while ( text.indexOf( char ) > -1 ) {
                    text = text.replace( char, base.options.chars[char] );
                }

            }

            // Replace characters with diaresis.

            if ( base.options.replaceDiaeresis ) {

                for ( char in base.options.charsDiaeresis ) {

                    while ( text.indexOf( char ) > -1 ) {
                        text = text.replace( char, base.options.charsDiaeresis[char] );
                    }

                }

            }

            node.nodeValue = text;

        };



        // Initialises the object.

        base.initialise = function () {

            base.options = $.extend( {}, $.greekUppercase.options, options );
            
            base.traverseTree( base.$element );

        };

        base.initialise();

    };



    // Default options.
    
    $.greekUppercase.options = {
        runOnDefault     : true,
        defaultSelector  : '.greek-uppercase',
        replaceDiaeresis : true,
        chars: {
            'ά' : 'α',
            'έ' : 'ε',
            'ή' : 'η',
            'ί' : 'ι',
            'ό' : 'ο',
            'ύ' : 'υ',
            'ώ' : 'ω',
            'Ά' : 'Α',
            'Έ' : 'Ε',
            'Ή' : 'Η',
            'Ί' : 'Ι',
            'Ό' : 'Ο',
            'Ύ' : 'Υ',
            'Ώ' : 'Ω',
            'ς' : 'σ'
        },
        charsDiaeresis: {
            'ϊ'   : 'ι',
            'ΐ'   : 'ι',
            "'ι'" : 'ι',
            'ϋ'   : 'υ',
            'ΰ'   : 'υ',
            "'υ'" : 'υ',
            'Ϊ'   : 'Ι',
            '΅Ι'  : 'Ι',
            "'Ι'" : 'Ι',
            'Ϋ'   : 'Υ',
            '΅Υ'  : 'Υ',
            "'Υ'" : 'Υ'
        }
    };



    // Expose a jQuery plugin function.

    $.fn.greekUppercase = function ( options ) {

        // Run on currently selected elements and return them for chaining.
        
        return this.each( function () {
            new $.greekUppercase( this, options );
        });

    };



    // Automatically run on elements with the designated class.
    
    $( function () {

        if ( $.greekUppercase.options.runOnDefault ) {

            $( $.greekUppercase.options.defaultSelector ).each( function () {

                $.greekUppercase( this );
                
            });

        }
        
    });

})( jQuery );
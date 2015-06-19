/**
 * _ JS
 * @author Khaliq Gant
 * @dependencies    jQuery
 */

/* global $ */
/* global jQuery */
/* global window */
/* global document */

'use strict';

var debug = {
    status : ENV ? true : false,

    set : function(change){
        if (typeof change !== 'undefined' && typeof change === 'boolean') {
            debug.status = change;
        } else{
            debug.status = debug.status ? false : true;
        }
        var result = debug.status ? 'on' : 'off';
        console.log('Debug mode set to ' + result);
    }
};

/**
 * Convenience method for debug logging
 */
var app = {
    log : function(message, isObject) {
        if (debug.status) {
            if (isObject) {
                console.log(message);
            } else {
                console.log('DEBUG: ' + message);
            }
        }
    }
};

var _JS_NAME = (function(){

    //selectors on
    var SELECTOR = {
    };


    var _methods = {
        someMethod : function(){
        },
    }; //end methods object

    //invoked on page load and public object
    var _listeners = {
        call : function(){
        } //end call()
    }; //end listeners object

    var methods;
    if (_dev) {
        methods = {
            vars : {},
            listeners: _listeners,
            methods: _methods
        };
    } else{
        methods = {
            listeners: _listeners
        };
    }

    return methods;
})();

$(document).ready(function() {
    _.listeners.call();
});



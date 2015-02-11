/**
 * _ JS
 * @author Khaliq Gant
 * @dependencies    jQuery
 */

/* global $ */
/* global jQuery */
/* global window */
/* global document */
/* global _dev */
/* global vmg_submit_form */

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

(function($, window, document, undefined) {
    var $win = $(window);
    var $doc = $(document);

    $doc.ready(function() {
        _.listeners.call();
    });

})(jQuery, window, document);



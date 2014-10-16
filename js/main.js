require.config({
    baseUrl: "js/libs",
    paths: {
        "jquery":       "jquery/jquery",
        "underscore":   "underscore/underscore-min",
        "backbone":     "backbone/backbone",
        "text":         "requirejs-text/text",
        "tmpl":         "../tmpl",
        "app":          "../app"
    },
    shim: {
        "backbone": {
            deps: ["jquery", "underscore", "text"],
            exports: "Backbone"
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function($, Backbone, Router){
    var router = new Router();
    Backbone.history.start();
    //new App;

});
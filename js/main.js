require.config({
    baseUrl: "js/libs",
    paths: {
        "jquery":       "jquery/jquery",
        "jquery-ui":    "jquery-ui/jquery-ui",
        "underscore":   "underscore/underscore-min",
        "backbone_vendor": "backbone/backbone",
        "backbone":     "../app/backbone",
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
        },
        'jquery-ui': {
          deps: ["jquery"]
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function($, Backbone, Router){
    var router = new Router();
    Backbone.history.start();
});

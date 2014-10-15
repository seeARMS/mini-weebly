require.config({
    baseUrl: "libs",
    paths: {
        "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
                    "jquery/jquery"],
        "underscore": "underscore/underscore-min",
        "backbone": "backbone/backbone-min"
    },
    shim: {
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        }
    },
    waitSeconds: 10
});

require(['jquery', 'underscore', 'backbone', 'app/router'], function(jquery, _, Backbone, Router){
    var router = new Router();
    Backbone.history.start();
    //new App;

});

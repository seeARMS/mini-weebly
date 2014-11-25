define(function (require) {

    "use strict";

    var $           = require('jquery'),
        HomeView    = require('app/views/home');

    return Backbone.Router.extend({

        routes: {
            "": "home"
        },

        home: function () {
            var homeView = new HomeView({ el: $('#main') });

            homeView.delegateEvents();
            homeView.render();
        },

    });

});

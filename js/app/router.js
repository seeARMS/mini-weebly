define(function (require) {

    "use strict";

    var $           = require('jquery'),
        HomeView    = require('app/views/home'),

        $main = $('#main'),

		homeView = new HomeView({el: $main});

    return Backbone.Router.extend({

        routes: {
            "": "home"
        },

        home: function () {
            homeView.delegateEvents();
            homeView.render();
        },

    });

});

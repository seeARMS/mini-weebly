define(function (require) {

    "use strict";

    var $           = require('jquery'),
        HomeView    = require('app/views/Home'),
		
		homeView = new HomeView({el: $content});

	
    return Backbone.Router.extend({

        routes: {
            "": "home"
        },

        home: function () {
            homeView.delegateEvents();
            homeView.render();
            shellView.selectMenuItem('home-menu');
        },

    });

});
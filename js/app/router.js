define(function (require) {

    "use strict";

    var $           = require('jquery'),
        HomeView    = require('app/views/home'),
		
        $body = $('body'),
		homeView = new HomeView({el: $body});

	
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

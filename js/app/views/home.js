define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        main                = require('text!tmpl/home.html'),
        SidebarView         = require('app/views/sidebar'),

        template = _.template(main),

        $sidebar = $('#sidebar'),

        sidebarView = new SidebarView({el: $sidebar});

    return Backbone.View.extend({

        initialize: function() {},

        render: function () {
            this.$el.html(template());
            return this;
        },


    });

});

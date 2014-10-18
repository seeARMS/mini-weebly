define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        content             = require('text!tmpl/sidebar.html'),


        template = _.template(content);

    return Backbone.View.extend({

        render: function () {
            this.$el.html(template());

            return this;
        }

    });

});
define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        btn_page            = require('text!tmpl/btn_page.html'),

        $page_buttons       = $('#page-buttons'),

        //template = _.template(content),
        btn_template = _.template(btn_page);

    return Backbone.View.extend({

        events: {
            "mouseover .btn-page": "mouseover",
            "click .btn-page": "click",
        },



        render: function () {
            //this.$el.html(template());
            $page_buttons.html(btn_template());

            return this;
        },

        mouseover: function() {
            console.log(this);
            console.log('hover!');
        },

        click: function() {
            console.log('click!');
        }



    });

});
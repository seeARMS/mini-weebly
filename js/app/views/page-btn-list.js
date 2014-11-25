define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),

        PageBtnView         = require('app/views/page-btn');

    return Backbone.View.extend({

        events: {
            "mouseover .btn-plus": "mouseoverPlus",
            "mouseleave .btn-plus": "mouseleavePlus",
            "click .btn-plus": "clickPlus",
        },

        initialize: function() {
          _.bindAll(this, "renderItem");
        },

        renderItem: function(model) {

          // Create a view for the model and render it
          var pageBtnView = new PageBtnView({ model: model });
          pageBtnView.render();

          // Add this view to the DOM and fade in
          $(pageBtnView.el).hide();
          this.$('#page-container').append(pageBtnView.el);
          $(pageBtnView.el).fadeIn();

          pageBtnView.delegateEvents();
        },

        render: function () {

          // Render all models in the collection
          this.collection.each(this.renderItem);
          return this;
        },

        mouseoverPlus: function(event) {
          var $elem = $(event.currentTarget);

          $elem.addClass('hover-plus');

        },

        mouseleavePlus: function(event) {
          var $elem = $(event.currentTarget);

          $elem.removeClass('hover-plus');

        },


        clickPlus: function(event) {
          var textInput = $('.btn-add :input');
          var pageName = textInput.val();

          var self = this;

          // Create a new page, and when it's saved to the server, render it
          var newPage = this.collection.create({name: pageName}, {
            success: function() {
              self.renderItem(newPage);
            }
          });

          textInput.val('');
        },


    });

});

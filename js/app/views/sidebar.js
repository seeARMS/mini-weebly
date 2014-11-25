define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        ui                  = require('jquery-ui'),

        PageBtnListView     = require('app/views/page-btn-list'),
        PageCollection      = require('app/collections/Pages');


    return Backbone.View.extend({

        events: {
            "mouseenter .element-container": "enterElemContainer",
            "mouseleave .element-container": "leaveElemContainer"
        },

        initialize: function() {
          var pageCollection = new PageCollection();

          // When the collection gets retrieved from the server, render it
          this.listenTo(pageCollection, 'reset', this.render);
          pageCollection.fetch({reset: true});

          // Create the view holding the collection of pages
          this.pageBtnListView = new PageBtnListView({
            collection: pageCollection,
            el: $('#page-buttons')
          });

          this.$('.element').draggable();

        },

        render: function () {
          // Render the view holding the collection of pages
          this.pageBtnListView.render();
          return this;
        },

        mouseenter: function(event) {
          var $btn = $(event.currentTarget);

          $btn.addClass('btn-page-hover');
        },

        enterElemContainer: function(event) {
          var $elem = $(event.currentTarget);

          $elem.addClass('hover');
        },

        leaveElemContainer: function(event) {
          var $elem = $(event.currentTarget);

          $elem.removeClass('hover');
        }

    });

});

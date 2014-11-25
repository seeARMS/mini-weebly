define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        btn_page            = require('text!tmpl/btn_page.html'),

        btn_template = _.template(btn_page);

    var numClicks = 0;

    return Backbone.View.extend({

        className: "btn btn-page",

        events: {
            "mouseenter": "mouseover",
            "mouseleave": "mouseleave",

            "click": "click",
            "click .btn-edit": "edit",
            "click .btn-delete": "delete",

        },


        initialize: function() {
          this.model.on('destroy', this.removeView, this);

        },

        render: function () {
          this.$el.html(btn_template(this.model.attributes));

          // Create the top page button as well
          var $elem = $('<div class="btn btn-page">').html(this.model.get('name'));
          $elem.attr('data-id', this.model.id);

          $('#home-pages').append($elem);

          return this;
        },

        mouseover: function() {
          $(this.el).addClass('btn-page-hover');
        },

        click: function() {
          // Add the styling for the clicked page
          $(this.el).siblings('.btn-page-click').removeClass('btn-page-click');
          $(this.el).toggleClass('btn-page-click');

          // Also style the top page button
          var template = $(".btn-page[data-id='" + this.model.id + "']");
          template.siblings('.btn-page-click').removeClass('btn-page-click');
          template.toggleClass('btn-page-click');
        },

        mouseleave: function(event) {
          $(this.el).removeClass('btn-page-hover');
        },

        delete: function(event) {
          $(this.el).css("background-color", "#D86A65");
          $(this.el).css("border-color", "#D86A65");

          // If delete was pressed twice, destroy the model
          if (++numClicks == 2) {
            this.model.destroy();
            numClicks = 0;
          }


        },

        edit: function(event) {
          var placeholder = $(this.el).children("h2").text();
          var self = this;

          // Create the textbox element
          var text = $('<input class="textbox txt-page-name" type="text" value="' + placeholder + '">');

          // On blur, save the model and replace the textbox with a header
          text.blur(function() {
            var newName = $(this).val();
            self.model.save("name", newName);
            $(self.el).children("input").replaceWith("<h2>" + newName + "</h2>");
            $(".btn-page[data-id='" + self.model.id + "']").html(newName);
          });

          $(this.el).children("h2").replaceWith(text);
        },

        // When the model is destroyed, remove this view from the DOM
        removeView: function() {
          $(".btn-page[data-id='" + this.model.id + "']").fadeOut();
          $(this.el).fadeOut();
        }

    });

});

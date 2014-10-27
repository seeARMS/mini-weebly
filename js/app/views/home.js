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
      /*
      events: {
          "click body": "loseFocus"
      }
      */

        initialize: function() {
          sidebarView.on("pageAdded", this.onPageAdded, this);
          sidebarView.on("pageRemoved", this.onPageRemoved, this);

          //this.listenTo(this.sidebarView, "pageAdded", this.onPageAdded);
        },

        render: function () {
            this.$el.html(template());

            this.$el.droppable({
              accept: ".element",
              activeClass: "ui-state-hover",
              hoverClass: "ui-state-active",
              drop: function( event, ui ) {
                $( this )
                  .addClass( "ui-state-highlight" )
                  .find( "p" )
                    .html( "Dropped!" );
              }
            });

            return this;
        },

        onPageAdded: function(pageModel) {

          var id = pageModel.get('id');
          var name = pageModel.get('name');
          var html = '<div class="btn btn-page" data-id=' + id + '>' + name + '</div>';


          this.$('#home-pages').append(html);
          //console.log("Page added!" + name);
        },

        onPageRemoved: function(id) {
          //console.log('page removed!');
          //var id = pageModel.get('id');
          //console.log(this.$('.btn-page').find("[data-id='" + id + "']"));
          $("#home-pages").find("[data-id='" + id + "']").fadeOut();

        }

    });

});

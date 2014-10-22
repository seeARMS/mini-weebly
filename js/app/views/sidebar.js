define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        //content             = require('text!tmpl/sidebar.html'),
        PageBtnView         = require('app/views/page-btn'),
        btn_page            = require('text!tmpl/btn_page.html'),
        ui                  = require('jquery-ui'),
        $page_buttons       = $('#page-container'),

        //template = _.template(content),
        btn_template = _.template(btn_page);


    var numClicks = 0;

    return Backbone.View.extend({

        events: {
            "mouseover .btn-page": "mouseenter",
            "mouseleave .btn-page": "mouseleave",

            //"click .btn-page": "click",
            "click .btn-delete": "clickDelete",
            "click .btn-add h2": "clickAdd",
            "click .btn-plus": "clickPlus",
            "click .btn-edit": "clickEdit",

            "mouseenter .element-container": "mouseenterElemContainer",
            "mouseleave .element-container": "mouseleaveElemContainer"

          //  "blur .btn-page"
        },



        render: function () {


            //this.$el.html(template());
            this.delegateEvents();
           // $('.btn-page').on('mouseover', 'mouseover', this);

            //$page_buttons.html(btn_template());
            _.bindAll(this, "mouseenter", "mouseleave", "click");

            return this;
        },

        mouseenter: function(event) {
            var $btn = $(event.currentTarget);

            $btn.addClass('btn-page-hover');
        },

        mouseleave: function(event) {
            var $btn = $(event.currentTarget);
            $btn.removeClass('btn-page-hover');
        },

        click: function() {
            console.log('click!');
        },

        clickDelete: function(event) {
          //console.log("Delete!");

          var $btn = $(event.currentTarget).parent();
          //console.log($btn.parent());
          $btn.css("background-color", "#D86A65");
          $btn.css("border-color", "#D86A65");

          numClicks++;

          if (numClicks == 2) {
            numClicks = 0;
            $btn.fadeOut();
            //alert("NICE!");
          }


        },

        clickPlus: function(event) {
          var $btn = $(event.currentTarget);


          var text = $('.btn-add :input').val();

            var variables = { page_title: text };
            //console.log(variables);
            //var template = _.template(btn_page, variables );


            var html = btn_template(variables);

          $('#page-container').append(html).hide().fadeIn();

          //  $(html).appendTo('#page-container').hide().fadeIn(1000);
//$(html).hide().appendTo("#mycontent").fadeIn(1000);

          //console.log($btn.parent().children(":input").val());

        },

        clickAdd: function(event) {
          var $btn = $(event.currentTarget);

          var text = '<input class="textbox txt-page-name" type="text" placeholder="ADD NEW PAGE">';

          //$btn.replaceWith(text);

          //console.log($btn);

        },

        clickEdit: function(event) {
          var $btn = $(event.currentTarget).parent();

          var placeholder = $btn.children("h2").text();
        //  console.log(placeholder);
          var text = '<input class="textbox txt-page-name" type="text" value="' + placeholder + '">';

          $btn.children("h2").replaceWith(text);

          //console.log($btn);

        },

        mouseenterElemContainer: function(event) {
          var $btn = $(event.currentTarget);

          $btn.css("background-color", "#405468");
          $btn.children('.element').draggable({
            cursor: "crosshair",
          });
          //#34485C
        },

        mouseleaveElemContainer: function(event) {
          var $btn = $(event.currentTarget);

          $btn.css("background-color", "#34485c");

          //#34485C
        }




    });

});

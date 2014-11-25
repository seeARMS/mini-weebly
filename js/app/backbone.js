define(function (require) {

  "use strict";

  var $                   = require('jquery'),
      _                   = require('underscore'),
      Backbone            = require('backbone_vendor');

      var backboneSync = Backbone.sync;


      /**
      *
      * We need to override Backbone Sync in order to send the auth token
      * on every request to our API
      *
      */
      Backbone.sync = function (method, model, options) {
        var cookies = document.cookie;
        var cookieName = "token";

        // Retrieve the value of the token from the cookie
        var token = decodeURIComponent(
          cookies.replace(new RegExp("(?:(?:^|.*;)\\s*" + cookieName + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")
        ) || null;

          options.headers = {
              'token': token
          };


           // Call the original Backbone.sync method with our auth token
           // in the header
          backboneSync(method, model, options);
      };


    return Backbone;

});

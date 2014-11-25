define(function (require) {

  "use strict";

  var $                   = require('jquery'),
      _                   = require('underscore'),
      Backbone            = require('backbone'),

      Page                = require('app/models/Page');

  return Backbone.Collection.extend({

    model: Page,
    url: '/mini-weebly/api/pages'

  });

});

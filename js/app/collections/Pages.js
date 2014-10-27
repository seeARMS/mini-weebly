define(function (require) {

  "use strict";

  var $                   = require('jquery'),
      _                   = require('underscore'),
      Backbone            = require('backbone'),

      Page                = require('app/models/Page');

  return Backbone.Collection.extend({
    //  urlRoot: '/api/pages'
    model: Page,
    url: '/api/pages'
  });

});

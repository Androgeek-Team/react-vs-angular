/* global React */
/* global jQuery */
/* global document */
/* global RiskPage */

var EventSystem = (function() {
  var self = this;

  self.queue = {};

  return {
    publish: function (event, data) {
      var queue = self.queue[event];

      if (typeof queue === 'undefined') {
        return false;
      }

      for(var i = 0, _l = queue.length; i < _l; i++) {
        (queue[i])(data);
      }

      return true;
    },
    subscribe: function(event, callback) {
      if (typeof self.queue[event] === 'undefined') {
        self.queue[event] = [];
      }

      self.queue[event].push(callback);
    }
  };
}());

var getHtmlParam = function(param) {
  return jQuery('param[name="' + param + '"]').attr('value');
};

React.renderComponent(
  RiskPage({}),
  document.getElementById('risk-page')
);

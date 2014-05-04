/* global React */
/* global jQuery */
/* global document */
/* global RiskPage */

var getHtmlParam = function(param) {
  return jQuery('param[name="' + param + '"]').attr('value');
};

React.renderComponent(
  RiskPage({}),
  document.getElementById('risk-page')
);

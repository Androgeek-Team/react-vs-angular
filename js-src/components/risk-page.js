/* global React */
/* global RiskList */

var RiskPage = React.createClass({
  render: function() {
    return React.DOM.div({
      children: [
        RiskList({})
      ]
    });
  }
});

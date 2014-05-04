/* global React */

var RiskImpact = React.createClass({
  render: function() {
    return React.DOM.span({
      className: "label label-success"
    }, this.props.impact);
  }
});

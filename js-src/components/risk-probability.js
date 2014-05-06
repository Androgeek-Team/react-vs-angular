/* global React */

var RiskProbability = React.createClass({
  getInitialState: function() {
    return {
      statusList: [
        'label-danger',  // New     - 0
        'label-warning', // Pending - 1
        'label-success'  // Closed  - 2
      ]
    };
  },
  getLabelClass: function(value) {
    if (value < 4) {
      return "label-success";
    } else if (value > 6) {
      return "label-danger";
    } else {
      return "label-warning";
    }
  },
  render: function() {
    return React.DOM.span({
      className: "label " + this.getLabelClass(this.props.probability)
    }, this.props.probability);
  }
});

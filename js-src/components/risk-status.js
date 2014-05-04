/* global React */

var RiskStatus = React.createClass({
  getInitialState: function() {
    return {
      statusList: [
        'label-danger',  // New     - 0
        'label-warning', // Pending - 1
        'label-success'  // Closed  - 2
      ]
    };
  },
  getLabelClass: function(status) {
      if (this.state.statusList.length < (1 + status)) {
        status = 0;
      }
      return this.state.statusList[status];
  },
  render: function() {
    return React.DOM.span({
      className: "label " + this.getLabelClass(this.props.status.id)
    }, this.props.status.name);
  }
});

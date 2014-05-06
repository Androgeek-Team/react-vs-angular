/* global React */
/* global RiskStatus */
/* global RiskImpact */
/* global RiskProbability */

var RiskLine = React.createClass({
  getInitialState: function() {
    return {
      statusList: [
        'danger',  // New     - 0
        'warning', // Pending - 1
        'success'  // Closed  - 2
      ]
    };
  },
  getRowClass: function(status) {
      if (this.state.statusList.length < (1 + status)) {
        return "";
      }
      return this.state.statusList[status];
  },
  render: function() {
    return React.DOM.tr(
      { className: this.getRowClass(this.props.risk.status.id) },
      [
        React.DOM.td({}, this.props.risk.id),
        React.DOM.td({}, this.props.risk.name),
        React.DOM.td({}, this.props.risk.owner.name),

        // Probability
        React.DOM.td(
          { className: "text-center" },
          [
            (this.props.risk.probability < 4) ?
              RiskProbability({probability: this.props.risk.probability}) :
              null
          ]
        ),
        React.DOM.td(
          { className: "text-center" },
          [
            (this.props.risk.probability > 3 && this.props.risk.probability < 7) ?
              RiskProbability({probability: this.props.risk.probability}) :
              null
          ]
        ),
        React.DOM.td(
          { className: "text-center" },
          [
            (this.props.risk.probability > 6) ?
              RiskProbability({probability: this.props.risk.probability}) :
              null
          ]
        ),

        // Impact
        React.DOM.td(
          { className: "text-center" },
          [
            (this.props.risk.impact < 4) ?
              RiskImpact({impact: this.props.risk.impact}) :
              null
          ]
        ),
        React.DOM.td(
          { className: "text-center" },
          [
            (this.props.risk.impact > 3 && this.props.risk.impact < 7) ?
              RiskImpact({impact: this.props.risk.impact}) :
              null
          ]
        ),
        React.DOM.td(
          { className: "text-center" },
          [
            (this.props.risk.impact > 6) ?
              RiskImpact({impact: this.props.risk.impact}) :
              null
          ]
        ),

        React.DOM.td(
          {className: "text-center"},
          this.props.risk.probability * this.props.risk.impact
        ),

        // Areas
        React.DOM.td(
          {className: "impact-area text-center"},
          (this.props.risk.areas.indexOf(0) > -1 ? "X" : "")
        ),
        React.DOM.td(
          {className: "impact-area text-center"},
          (this.props.risk.areas.indexOf(1) > -1 ? "X" : "")
        ),
        React.DOM.td(
          {className: "impact-area text-center"},
          (this.props.risk.areas.indexOf(2) > -1 ? "X" : "")
        ),

        React.DOM.td({}, this.props.risk.plan),

        React.DOM.td({}, RiskStatus({status: this.props.risk.status})),
        React.DOM.td({}, "[action]")
      ]
    );
  }
});

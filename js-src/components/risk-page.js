/* global React */
/* global RiskList */
/* global EventSystem */

var RiskPage = React.createClass({
  updateRiskCount: function(count) {
    this.setState({
      riskCount: count
    });
  },
  componentDidMount: function() {
    EventSystem.subscribe('risk.count.update', this.updateRiskCount);
  },
  getInitialState: function() {
    return {
      riskCount: 0
    };
  },
  render: function() {
    return React.DOM.div({}, [
      React.DOM.button(
        { className: "btn btn-success pull-right" },
        [
          React.DOM.span({
            className: "glyphicon glyphicon-plus"
          }),
          " Add new Risk"
        ]
      ),
      React.DOM.h1(
        { className: "page-header" },
        [
          React.DOM.span({}, "Risk Register "),
          React.DOM.small({}, this.riskCountText())
        ]
      ),
      RiskList({})
    ]);
  },
  riskCountText: function() {
    if (this.state.riskCount < 1) {
      return "";
    }
    if (this.state.riskCount < 2) {
      return this.state.riskCount + " risk";
    }
    return this.state.riskCount + " risks";
  }
});

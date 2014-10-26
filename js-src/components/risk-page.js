/* global React */
/* global RiskList */
/* global EventSystem */
/* global RiskDialog */

var RiskPage = React.createClass({
  updateRiskCount: function(count) {
    this.setState({
      riskCount: count
    });
  },
  openDialogOnEdit: function(risk) {
    this.refs.riskDialog.open(risk);
  },
  componentDidMount: function() {
    var self = this;
    EventSystem.subscribe('risk.count.update', this.updateRiskCount);
    EventSystem.subscribe('open-risk-dialog', this.openDialogOnEdit);
  },
  getInitialState: function() {
    return {
      riskCount: 0
    };
  },
  render: function() {
    return React.DOM.div({}, [
      React.DOM.button(
        {
          className: "btn btn-success pull-right",
          onClick: this.openNewRiskDialog
        },
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
      RiskList({}),
      RiskDialog({ref: "riskDialog"})
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
  },
  openNewRiskDialog: function() {
    this.refs.riskDialog.open();
  }
});

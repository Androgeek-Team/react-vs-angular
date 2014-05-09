/* global React */
/* global RiskLine */
/* global jQuery */
/* global EventSystem */
/* global getHtmlParam */
/* global setTimeout */

var RiskList = React.createClass({
  getInitialState: function() {
    return { risks: [] };
  },
  loadRiskList: function() {
    var that = this;
    jQuery.get(
      getHtmlParam("risks-endpoint"),
      function(data) {
        that.setState({
          risks: data
        });
        setTimeout(that.loadRiskList, 1000);
      },
      'json'
    );
  },
  componentDidMount: function() {
    this.loadRiskList();
  },
  render: function() {
    var rows = this.state.risks
      .map(function(risk) {
        return RiskLine({risk: risk});
      });
    EventSystem.publish('risk.count.update', this.state.risks.length);
    return React.DOM.table({
      className: "table table-hover table-bordered risk-table",
    }, [
      React.DOM.thead({}, [
        React.DOM.tr({}, [
          React.DOM.td({colSpan: 3}),
          React.DOM.td({className: "text-center", colSpan: 3}, "Probability"),
          React.DOM.td({className: "text-center", colSpan: 3}, "Impact"),
          React.DOM.td({}),
          React.DOM.td({className: "text-center", colSpan: 3}, "Impact areas"),
          React.DOM.td({colSpan: 3})
        ]),
        React.DOM.tr({}, [
          React.DOM.td({}),
          React.DOM.td({}, "Source"),
          React.DOM.td({}),

          // Probability
          React.DOM.td({className: "list-section-left"}, "Low"),
          React.DOM.td({className: "list-section-center"}, "Medium"),
          React.DOM.td({className: "list-section-right"}, "High"),

          // Impact
          React.DOM.td({className: "list-section-left"}, "Low"),
          React.DOM.td({className: "list-section-center"}, "Medium"),
          React.DOM.td({className: "list-section-right"}, "High"),

          React.DOM.td({}, "Result"),

          React.DOM.td({className: "list-section-left"}, "Cost"),
          React.DOM.td({className: "list-section-center"}, "Schedule"),
          React.DOM.td({className: "list-section-right"}, "Performance"),

          React.DOM.td({}, "Plan"),
          React.DOM.td({}, "Status"),
          React.DOM.td({})
        ])
      ]),
      React.DOM.tbody({}, rows)
    ]);
  }
});

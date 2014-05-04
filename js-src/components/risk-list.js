/* global React */
/* global RiskLine */
/* global jQuery */

var RiskList = React.createClass({
  getInitialState: function() {
    return { risks: [] };
  },
  componentDidMount: function() {
    var that = this;
    jQuery.get(
      '/risks.json',
      function(data) {
        that.setState({
          risks: data
        });
      },
      'json'
    );
  },
  render: function() {
    var rows = this.state.risks
      .map(function(risk) {
        return RiskLine({risk: risk});
      });

    return React.DOM.table({
      className: "table table-hover table-bordered",
      children: [
        React.DOM.thead({
          children: [
            React.DOM.tr({
              children: [
                React.DOM.td({colSpan: 3}),
                React.DOM.td({className: "text-center", colSpan: 3}, "Probability"),
                React.DOM.td({className: "text-center", colSpan: 3}, "Impact"),
                React.DOM.td({}),
                React.DOM.td({className: "text-center", colSpan: 3}, "Impact areas"),
                React.DOM.td({colSpan: 3})
              ]
            }),
            React.DOM.tr({
              children: [
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
              ]
            })
          ]
        }),
        React.DOM.tbody({
          children: rows
        })
      ]
    });
  }
});

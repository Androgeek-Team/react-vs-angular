/* global React */
/* global Dialog */
/* global TextInput */
/* global Textarea */
/* global SelectDropdown */
/* global CheckboxGroup */
/* global getHtmlParam */
/* global jQuery */

var RiskDialog = React.createClass({
  defaultEmptyRisk: function() {
    if (typeof this.props.risk !== "undefined") {
      return this.props.risk;
    }
    return {
      id: null,
      name: "",
      probability: 1,
      impact: 1,
      areas: [],
      plan: "",
      status: 0
    };
  },
  getInitialState: function() {
    return {
      risk: this.defaultEmptyRisk()
    };
  },
  render: function() {
    var modal = Dialog({
      ref: "riskDialog",
      confirm: "Save",
      cancel: "Cancel",
      extraModalClass: "modal-lg",
      onCancel: this.handleCancel,
      onConfirm: this.handleConfirm,
      title: "Add new Risk",
      children: [
        React.DOM.div({}, [
          React.DOM.div({ className: "row" }, [
            TextInput({
              label: "Risk title",
              placeholder: "Source, summary or something that clearly identifies this risk...",
              name: "name",
              extraClass: "col-md-12",
              onChange: this.changeFormField,
              value: this.state.risk.name
            })
          ]),
          React.DOM.div({ className: "row" }, [
            SelectDropdown({
              label: "Probability of risk source happening",
              name: "probability",
              extraClass: "col-md-6",
              onChange: this.changeFormField,
              value: this.state.risk.probability,
              options: [
                { value: 1, text: "1 (Low)      Almost impossible" },
                { value: 2, text: "2 (Low)      There is a minimal chance" },
                { value: 3, text: "3 (Low)      This can even be done" },
                { value: 4, text: "4 (Medium)   Have a chance" },
                { value: 5, text: "5 (Medium)   We have to deal with this soon" },
                { value: 6, text: "6 (Medium)   This week let's talk about it" },
                { value: 7, text: "7 (High)     We need to talk about it in a few days" },
                { value: 8, text: "8 (High)     We need to talk about it today" },
                { value: 9, text: "9 (High)     We need to talk about it now!" }
              ]
            }),
            SelectDropdown({
              label: "Impact on project if risk source happens",
              name: "impact",
              extraClass: "col-md-6",
              onChange: this.changeFormField,
              value: this.state.risk.impact,
              options: [
                { value: 1, text: "1 (Low)      " },
                { value: 2, text: "2 (Low)      " },
                { value: 3, text: "3 (Low)      " },
                { value: 4, text: "4 (Medium)   " },
                { value: 5, text: "5 (Medium)   " },
                { value: 6, text: "6 (Medium)   " },
                { value: 7, text: "7 (High)     " },
                { value: 8, text: "8 (High)     " },
                { value: 9, text: "9 (High)     " }
              ]
            })
          ]),
          React.DOM.div({ className: "row" }, [
            CheckboxGroup({
              label: "Project Impacts",
              name: "areas",
              extraClass: "col-md-6",
              onChange: this.changeFormField,
              value: this.state.risk.areas,
              options: [
                { value: 0, text: "Cost" },
                { value: 1, text: "Schedule" },
                { value: 2, text: "Performance" }
              ]
            }),
            SelectDropdown({
              label: "Status",
              name: "status",
              extraClass: "col-md-6",
              onChange: this.changeFormField,
              value: this.state.risk.status,
              options: [
                { value: 0, text: "New" },
                { value: 1, text: "Pending" },
                { value: 2, text: "Closed" }
              ]
            })
          ]),
          React.DOM.div({ className: "row" }, [
            Textarea({
              label: "Mitigation / Response plan",
              rows: 5,
              name: "plan",
              extraClass: "col-md-12",
              onChange: this.changeFormField,
              value: this.state.risk.plan
            })
          ])
        ])
      ]
    });
    return modal;
  },
  open: function() {
    this.refs.riskDialog.open();
  },
  handleCancel: function(close) {
    close();
  },
  handleConfirm: function(close) {
    return jQuery.post(
      getHtmlParam("risks-endpoint"),
      this.state.risk,
      function(resp) {
        return close();
      },
      "json"
    );
  },
  changeFormField: function(value, name) {
    this.state.risk[name] = value;
    this.setState({
      risk: this.state.risk
    });
  }
});

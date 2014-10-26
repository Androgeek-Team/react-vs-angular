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
      status: 1
    };
  },
  componentDidMount: function() {
    var self = this;
    jQuery.get(
      getHtmlParam("status-list"),
      function(resp) { self.setState({ statusList: resp }); },
      "json"
    );
    jQuery.get(
      getHtmlParam("area-list"),
      function(resp) { self.setState({ areaList: resp }); },
      "json"
    );
    jQuery.get(
      getHtmlParam("impact-list"),
      function(resp) { self.setState({ impactList: resp }); },
      "json"
    );
    jQuery.get(
      getHtmlParam("probability-list"),
      function(resp) { self.setState({ probabilityList: resp }); },
      "json"
    );

    return true;
  },
  getInitialState: function() {
    return {
      risk: this.defaultEmptyRisk(),
      statusList: [],
      areaList: [],
      impactList: [],
      probabilityList: [],
      error: null
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
      errorMessage: this.state.error,
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
              options: this.state.probabilityList
            }),
            SelectDropdown({
              label: "Impact on project if risk source happens",
              name: "impact",
              extraClass: "col-md-6",
              onChange: this.changeFormField,
              value: this.state.risk.impact,
              options: this.state.impactList
            })
          ]),
          React.DOM.div({ className: "row" }, [
            CheckboxGroup({
              label: "Project Impacts",
              name: "areas",
              extraClass: "col-md-6",
              onChange: this.changeFormField,
              value: this.state.risk.areas,
              options: this.state.areaList
            }),
            SelectDropdown({
              label: "Status",
              name: "status",
              extraClass: "col-md-6",
              onChange: this.changeFormField,
              value: this.state.risk.status,
              options: this.state.statusList
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
  open: function(risk) {
    this.props.risk = risk;
    this.setState({
      risk: this.defaultEmptyRisk(),
      error: null
    });
    this.refs.riskDialog.open();
  },
  handleCancel: function(close) {
    close();
  },
  validateForm: function() {
    if (this.state.risk.name.length < 5) {
      this.setState({ error: "The name must be at least five characters." });
      return false;
    }

    if (this.state.risk.areas.length < 1) {
      this.setState({ error: "If this is a risk, it involves at least one area." });
      return false;
    }

    this.setState({ error: null });
    return true;
  },
  handleConfirm: function(close) {
    var valid = this.validateForm();
    if (valid !== true) {
      return false;
    }
    return jQuery.post(
      getHtmlParam("risks-endpoint"),
      this.state.risk,
      function(resp) {
        EventSystem.publish('risk-data-sent');
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

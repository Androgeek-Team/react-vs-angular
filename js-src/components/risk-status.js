/* global React */

var RiskStatus = React.createClass({
  getInitialState: function() {
    return {
      statusList: [],
    };
  },
  componentWillMount: function() {
    var self = this;
    jQuery.get(
      getHtmlParam("status-list"),
      function(resp) {
        var list = [];
        for(var i = 0, _l = resp.length; i < _l; i++) {
          list[resp[i]._id] = resp[i];
        }
        self.setState({ statusList: list });
      },
      "json"
    );

    return true;
  },
  getStatusProperty: function(property) {
    if (typeof this.state.statusList[this.props.status] !== "undefined") {
      return this.state.statusList[this.props.status][property];
    } else {
      return "";
    }
  },
  render: function() {
    return React.DOM.span({
      className: "label " + this.getStatusProperty('className')
    }, this.getStatusProperty('name'));
  }
});

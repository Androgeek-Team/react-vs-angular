/* global React */
/* global jQuery */

var Dialog = React.createClass({
  componentDidMount: function() {
    jQuery(this.getDOMNode()).modal({
      backdrop: 'static',
      keyboard: true,
      show: false
    });
  },
  componentWillUnmount: function() {
    jQuery(this.getDOMNode()).off('hidden', this.handleHidden);
  },
  close: function() {
    jQuery(this.getDOMNode()).modal('hide');
  },
  open: function() {
    jQuery(this.getDOMNode()).modal('show');
  },
  render: function() {
    var confirmButton = null,
        cancelButton = null;

    if (this.props.confirm) {
      confirmButton = React.DOM.button(
        {
          onClick: this.handleConfirm,
          className: "btn btn-primary"
        },
        this.props.confirm
      );
    }

    if (this.props.cancel) {
      cancelButton = React.DOM.button(
        {
          onClick: this.handleCancel,
          className: "btn"
        },
        this.props.cancel
      );
    }

    if (typeof this.props.extraModalClass === "undefined") {
      this.props.extraModalClass = "";
    } else {
      this.props.extraModalClass = " " + this.props.extraModalClass;
    }

    return React.DOM.div({ className: "modal fade" }, [
      React.DOM.div({ className: "modal-dialog" + this.props.extraModalClass }, [
        React.DOM.div({ className: "modal-content" }, [
          React.DOM.div({ className: "modal-header" }, [
            React.DOM.div(
              {
                className: "close",
                type: "button",
                onClick: this.handleCancel,
                dangerouslySetInnerHTML: {
                  __html: "&times"
                }
              }
            ),
            React.DOM.div(
              { className: "pull-right alert alert-danger" + (this.props.errorMessage === null ? " hidden" : "") },
              this.props.errorMessage
            ),
            React.DOM.h1({}, this.props.title)
          ]),
          React.DOM.div({ className: "modal-body" }, this.props.children),
          React.DOM.div({ className: "modal-footer" }, [
            cancelButton,
            confirmButton
          ])
        ])
      ])
    ]);
  },
  handleCancel: function() {
    if (this.props.onCancel) {
      this.props.onCancel(this.close);
    }
  },
  handleConfirm: function() {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.close);
    }
  }
});

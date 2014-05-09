/* global React */
/* global jQuery */

var GenerateRandomId = function() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for(var i=0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

var TextInput = React.createClass({
  getInitialState: function() {
    return {
      randomId: this.props.name + "-" + GenerateRandomId()
    };
  },
  onChange: function() {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(
        this.refs.field.getDOMNode().value,
        this.props.name
      );
    }
  },
  render: function() {
    if (typeof this.props.extraClass === "undefined") {
      this.props.extraClass = "";
    } else {
      this.props.extraClass = " " + this.props.extraClass;
    }
    return React.DOM.div({
      className: "form-group " + this.props.name + "-line" + this.props.extraClass,
      children: [
        React.DOM.label({ htmlFor: this.state.randomId }, this.props.label),
        React.DOM.input({
          type: "text",
          ref: "field",
          className: "form-control",
          id: this.state.randomId,
          name: this.props.name,
          autoComplete: "off",
          placeholder: this.props.placeholder,
          onChange: this.onChange,
          value: this.props.value
        })
      ]
    });
  }
});

var Textarea = React.createClass({
  getInitialState: function() {
    return {
      randomId: this.props.name + "-" + GenerateRandomId()
    };
  },
  onChange: function() {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(
        this.refs.field.getDOMNode().value,
        this.props.name
      );
    }
  },
  render: function() {
    if (typeof this.props.extraClass === "undefined") {
      this.props.extraClass = "";
    } else {
      this.props.extraClass = " " + this.props.extraClass;
    }
    if (typeof this.props.rows === "undefined") {
      this.props.rows = 3;
    }
    return React.DOM.div({
      className: "form-group " + this.props.name + "-line" + this.props.extraClass,
      children: [
        React.DOM.label({ htmlFor: this.state.randomId }, this.props.label),
        React.DOM.textarea({
          className: "form-control",
          ref: "field",
          id: this.state.randomId,
          rows: this.props.rows,
          name: this.props.name,
          onChange: this.onChange
        }, this.props.value)
      ]
    });
  }
});

var SubmitButton = React.createClass({
  render: function() {
    if (typeof this.props.extraClass === "undefined") {
      this.props.extraClass = "";
    } else {
      this.props.extraClass = " " + this.props.extraClass;
    }
    return React.DOM.button(
      {
        disabled: (this.props.disabled ? "disabled" : ""),
        className: "btn" + this.props.extraClass,
        onClick: this.props.onClick
      },
      this.props.label
    );
  }
});

var SelectDropdown = React.createClass({
  getInitialState: function() {
    return {
      randomId: this.props.name + "-" + GenerateRandomId()
    };
  },
  onChange: function() {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(
        parseInt(
          jQuery(
            'option:selected',
            jQuery(this.refs.field.getDOMNode())
          ).val(),
          10
        ),
        this.props.name
      );
    }
  },
  render: function() {
    if (typeof this.props.extraClass === "undefined") {
      this.props.extraClass = "";
    } else {
      this.props.extraClass = " " + this.props.extraClass;
    }

    var that = this;

    var options = this.props.options.map(function(option) {
      var parameters = {};
      if (that.props.value == option.value) {
        parameters.selected = "selected";
      }
      parameters.value = option.value;
      return React.DOM.option(parameters, option.text);
    });

    return React.DOM.div(
      {
        className: "form-group " + this.props.name + "-line" + this.props.extraClass,
      },
      [
        React.DOM.label({ htmlFor: this.state.randomId }, this.props.label),
        React.DOM.select({
          ref: "field",
          className: "form-control",
          id: this.state.randomId,
          name: this.props.name,
          onChange: this.onChange
        }, options)
      ]
    );
  }
});

var CheckboxGroup = React.createClass({
  onChange: function() {
    if (typeof this.props.onChange === "function") {
      var areas = jQuery('input[type=checkbox]')
        .filter(function(index, item) {
          return jQuery(item).is(':checked');
        })
        .map(function(index, item) {
          return parseInt(jQuery(item).val(), 10);
        }).toArray();

      this.props.onChange(
        areas,
        this.props.name
      );
    }
  },
  render: function() {
    if (typeof this.props.extraClass === "undefined") {
      this.props.extraClass = "";
    } else {
      this.props.extraClass = " " + this.props.extraClass;
    }

    var that = this;

    var checkboxList = this.props.options.map(function(option) {
      if (that.props.value.indexOf(option.value) > -1) {
        option.checked = true;
      }
      option.onChange = that.onChange;
      return Checkbox(option);
    });

    return React.DOM.div(
      {
        className: "form-group " + this.props.name + "-line" + this.props.extraClass,
      },
      [
        React.DOM.label({}, this.props.label),
        React.DOM.div({}, checkboxList)
      ]
    );
  }
});

var Checkbox = React.createClass({
  render: function() {
    return React.DOM.label({
      className: "checkbox-inline",
      children: [
        React.DOM.input({
          type: "checkbox",
          checked: this.props.checked,
          value: this.props.value,
          onChange: this.props.onChange
        }),
        " " + this.props.text
      ]
    });
  }
});

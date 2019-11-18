'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _chevronIcon = require('./chevron-icon');

var _chevronIcon2 = _interopRequireDefault(_chevronIcon);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrowButton = function ArrowButton(_ref) {
  var onPress = _ref.onPress;
  var direction = _ref.direction;
  var style = _ref.style;
  var arrowColour = _ref.arrowColour;
  return _reactNative2.default.createElement(
    _reactNative.TouchableOpacity,
    {
      style: style,
      onPress: onPress },
    _reactNative2.default.createElement(_chevronIcon2.default, {
      direction: direction,
      style: { tintColor: arrowColour }
    })
  );
};

var NumberInput = function (_React$Component) {
  _inherits(NumberInput, _React$Component);

  function NumberInput() {
    _classCallCheck(this, NumberInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberInput).apply(this, arguments));
  }

  _createClass(NumberInput, [{
    key: 'handleOnPress',
    value: function handleOnPress(increment) {
      var _this2 = this;

      return function () {
        var _props = _this2.props;
        var max = _props.max;
        var min = _props.min;
        var onChange = _props.onChange;
        var value = _props.value;
        var step = _props.step;

        var limit = increment ? max : min;
        var number = (0, _util.nextValue)(increment, value, step, limit);
        onChange(number);
      };
    }
  }, {
    key: 'handleChangeText',
    value: function handleChangeText(text) {
      var _props2 = this.props;
      var min = _props2.min;
      var max = _props2.max;
      var value = _props2.value;
      var onChange = _props2.onChange;


      var number = parseFloat(text),
          parsedValue = parseFloat(value),
          increment = number > parsedValue,
          limit = increment ? max : min;

      if (number === parsedValue || isNaN(number)) {
        return onChange(text);
      }

      var newNumber = (0, _util.newValue)(increment, limit, number);
      onChange((0, _util.convertToString)(newNumber));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var style = _props3.style;
      var value = _props3.value;
      var onChange = _props3.onChange;
      var width = _props3.width;
      var height = _props3.height;
      var valueStyle = _props3.valueStyle;
      var arrowStyle = _props3.arrowStyle;
      var decimalPoints = _props3.decimalPoints;
      var arrowColour = _props3.arrowColour;

      var inputProps = _objectWithoutProperties(_props3, ['style', 'value', 'onChange', 'width', 'height', 'valueStyle', 'arrowStyle', 'decimalPoints', 'arrowColour']);

      var number = +parseFloat((0, _util.convertToString)(value)).toFixed(decimalPoints);
      var buttonStyle = [styles.chevron, arrowStyle];

      return _reactNative2.default.createElement(
        _reactNative.View,
        { style: { width: width, height: height } },
        _reactNative2.default.createElement(
          _reactNative.View,
          { style: styles.container },
          _reactNative2.default.createElement(_reactNative.TextInput, _extends({}, inputProps, {
            style: [styles.value, valueStyle],
            value: (0, _util.convertToString)(number),
            keyboardType: 'numeric',
            autoCorrect: false,
            onChangeText: this.handleChangeText.bind(this)
          })),
          _reactNative2.default.createElement(
            _reactNative.View,
            { style: styles.buttons },
            _reactNative2.default.createElement(ArrowButton, {
              style: buttonStyle,
              arrowColour: arrowColour,
              direction: 'top',
              onPress: this.handleOnPress(true)
            }),
            _reactNative2.default.createElement(ArrowButton, {
              style: buttonStyle,
              direction: 'bottom',
              arrowColour: arrowColour,
              onPress: this.handleOnPress(false)
            })
          )
        )
      );
    }
  }]);

  return NumberInput;
}(_reactNative2.default.Component);

var styles = {
  container: {
    flex: 6,
    flexDirection: 'row'
  },
  buttons: {
    flex: 2,
    justifyContent: 'space-between',
    marginLeft: 5
  },
  chevron: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    flex: 4,
    fontSize: 20,
    textAlign: 'center',
    borderColor: '#C4C4C4',
    color: '#333',
    borderRadius: 5,
    borderWidth: 1
  }
};

NumberInput.defaultProps = {
  step: 1,
  value: 0,
  width: 70,
  height: 40,
  arrowColour: '#333',
  arrowStyle: styles.chevron,
  valueStyle: styles.value,
  min: 0,
  max: 100,
  decimalPoints: 2,
  editable: true
};

Number.propTypes = {
  step: _reactNative2.default.PropTypes.number,
  value: _reactNative2.default.PropTypes.oneOfType(['number', 'string']),
  width: _reactNative2.default.PropTypes.number,
  height: _reactNative2.default.PropTypes.number,
  arrowColour: _reactNative2.default.PropTypes.string,
  arrowStyle: _reactNative.View.propTypes.style,
  valueStyle: _reactNative.Text.propTypes.style,
  min: _reactNative2.default.PropTypes.number,
  max: _reactNative2.default.PropTypes.number,
  decimalPoints: _reactNative2.default.PropTypes.number,
  onChange: _reactNative2.default.PropTypes.func.isRequired,
  editable: _reactNative2.default.PropTypes.bool
};

exports.default = NumberInput;
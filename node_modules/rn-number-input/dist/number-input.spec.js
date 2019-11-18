'use strict';

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _numberInput = require('./number-input');

var _numberInput2 = _interopRequireDefault(_numberInput);

var _enzyme = require('enzyme');

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('renders correct width', function (t) {
	var output = (0, _enzyme.shallow)(_reactNative2.default.createElement(_numberInput2.default, { width: 10 }));
	(0, _expect2.default)(output.style.width).toBe(10);
	t.pass('component is a cross icon');
	t.end();
}); // require('react-native-mock/mock');
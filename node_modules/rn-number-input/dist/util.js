'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slice = exports.nextValue = exports.updateValue = exports.newValue = exports.exceedsLimit = exports.convertToString = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertToString = exports.convertToString = function convertToString(str) {
  return typeof value !== 'string' ? str.toString() : str;
};

var exceedsLimit = exports.exceedsLimit = function exceedsLimit(increment, limit, value) {
  return increment ? value >= limit : value <= limit;
};

var newValue = exports.newValue = function newValue(increment, limit, value) {
  return exceedsLimit(increment, limit, value) ? limit : value;
};

var updateValue = exports.updateValue = function updateValue(increment, currentValue, step) {
  currentValue = parseFloat(currentValue);
  return increment ? currentValue + step : currentValue - step;
};

var nextValue = exports.nextValue = function nextValue(increment, currentValue, step, limit) {
  var value = updateValue(increment, currentValue, step);
  return newValue(increment, limit, value);
};

var slice = exports.slice = _ramda2.default.curry(function (startIndex, endIndex, str) {
  return str.slice(startIndex, endIndex);
});
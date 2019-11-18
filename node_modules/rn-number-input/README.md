rn-number-input
=========================

Created as an alternative to the native Picker component, rn-number-input is the number equivalent of `<TextInput />` and behaves and looks very similar to what you see on the web `<input type='number' />`.

Screenshot of `<NumberInput />`

![screenshot of the component](http://puu.sh/nFHud/cc1472e489.png)

## Installation

rn-number-input requires **react-native 0.20 or later.**

```
npm install --save rn-number-input
```

## Example
To build the example locally, clone this repo then run:

```
cd example
npm install
react-native (run-ios|run-android)
```

## Usage
```js
import React from 'react-native';
import NumberInput from 'rn-number-input';

<NumberInput
	value={this.state.chickenWings}
	min={-10}
	max={10}
	onChange={(value) => this.setState({ chickenWings: value })}
	arrowColour='blue'
	width={70}
	height={40}
/>
```

## Available Props

`<NumberInput />` exposes all the props available to the `<TextInput />` plus the following below:

Property  | Type | Default | Description
------------- | ------------- | ------ | --------
step          | number | 1 | amount in which the value is increased or decreased
value         | string or number | 0 | value shown of the input
width         | number | 70 | specifies the width of the component
height        | number | 40 | specifies the height of the component
arrowColour   | string | #333 (dark grey) | `tintColor` for the arrow icon
arrowStyle    | style  | [default styles] | specifies the style for each arrow button
valueStyle    | style  | [default styles] | specifies the style for value within the input
min           | number | 0   | specifies the min value
max           | number | 100 | specifies the max value
decimalPoints | number | 2   | how many decimal points that the value round's to
onChange      | func (required) | undefined | function is called when the value is changed
editable      | boolean | true | whether the input can be edited directly using the keypad


## Todo

- Add Unit Tests


## License

MIT Licensed Copyright (c) Cameron Bourke 2016

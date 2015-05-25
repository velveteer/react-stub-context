# react-stub-context

> Stub context for a component, to be used for testing purposes.

## Installation

```sh
npm install react-stub-context
```

## Usage

```js
var React = require('react';
var createStubbedContextComponent = require('react-stub-context');

var TestComponent = React.createClass({
  render: function() {
    return <h2>{this.context.foo}</h2>
  }
});

var StubbedContextComponent = createStubbedContextComponent(TestComponent, { foo: 'bar' });

React.render(<StubbedContextComponent />, document.body);
```

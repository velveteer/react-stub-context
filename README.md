# react-stub-context [![Build Status](https://travis-ci.org/karlbright/react-stub-context.svg?branch=master)](https://travis-ci.org/karlbright/react-stub-context)

> Stub context for a component, to be used for testing purposes.

## Installation

```sh
npm install react-stub-context
```

## Usage

```js
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var TestHandler = React.createClass({
  getInitialState: function() {
    return {
      text: 'foo' 
    }
  },

  changeText: function() {
    this.setState({ text: 'bar' });
  },

  render: function() {
    return React.createElement(Link, {
      to: 'home',
      onClick: this.changeText
    }, this.state.text);
  }
});

module.exports = TestHandler
```

```js
jest.dontMock('../');

function noop() {}

describe('React Router Context Test', function() {
  var React, Router, TestUtils, stubContext, TestHandler;

  beforeEach(function() {
    React = require.requireActual('react/addons');
    TestUtils = React.addons.TestUtils;
    stubContext = require.requireActual('react-stub-context');
    TestHandler = require('..');
    Router = function() {}
  });

  it('has context correctly', function() {
    Router.makeHref = noop;
    Router.isActive = noop;

    TestHandler = stubContext(TestHandler, { router: Router });

    var render = TestUtils.renderIntoDocument(React.createElement(TestHandler, {}));
    var link = TestUtils.findRenderedDOMComponentWithTag(render, 'a');

    expect(link).toBeDefined();
    expect(link.getDOMNode().innerHTML).toEqual('foo');

    TestUtils.Simulate.click(link);

    expect(link.getDOMNode().innerHTML).toEqual('bar');
  });
});
```


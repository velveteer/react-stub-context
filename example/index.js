var React = require('react');
var createStubbedContext = require('../dist');

var TestComponent = React.createClass({
  render: function() { return React.DOM.h2(null, this.context.foo); }
});

var div = document.createElement('div');

var StubbedComponent = createStubbedContext(TestComponent, { foo: 'bar' });
var stubbedComponentElement = React.render(React.createElement(StubbedComponent), div);

document.body.appendChild(div);

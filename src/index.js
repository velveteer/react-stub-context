var React = require('react');
var assign = require('object-assign');

function stubContext(BaseComponent, context) {
  if(typeof context === 'undefined' || context === null) context = {};

  var _contextTypes = {}, _context = context;

  try {
    Object.keys(_context).forEach(function(key) {
      _contextTypes[key] = React.PropTypes.any;
    });
  } catch (err) {
    throw new TypeError('createdStubbedContextComponent requires an object');
  }

  BaseComponent.contextTypes = assign({}, BaseComponent.contextTypes, _contextTypes);

  var StubbedContextParent = React.createClass({
    childContextTypes: _contextTypes,
    getChildContext() { return _context; },

    render() { 
      return React.Children.only(this.props.children);
    }
  });

  var StubbedContextHandler = React.createClass({
    childContextTypes: _contextTypes,
    getChildContext() { return _context; },

    getWrappedElement() { return this._wrappedElement; },

    render() {
      this._wrappedElement = <BaseComponent {...this.state} {...this.props} />;
      return <StubbedContextParent>{this._wrappedElement}</StubbedContextParent>;
    }
  })

  StubbedContextHandler.getWrappedComponent = function() { return BaseComponent; }

  return StubbedContextHandler;
}

module.exports = stubContext;

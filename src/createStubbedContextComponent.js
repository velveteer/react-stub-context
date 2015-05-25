var React = require('react');

function createStubbedContextComponent(BaseComponent, context) {
  if(typeof context === 'undefined' || context === null) context = {};

  var _contextTypes = {}, _context = context;

  try {
    Object.keys(_context).forEach(function(key) {
      _contextTypes[key] = React.PropTypes.any;
    });
  } catch (err) {
    throw new TypeError('createdStubbedContextComponent requires an object');
  }

  if(BaseComponent.contextTypes) {
    Object.assign(BaseComponent.contextTypes, _contextTypes);
  } else {
    Object.assign(BaseComponent, { contextTypes: _contextTypes });
  }

  var StubbedContextComponent = React.createClass({
    childContextTypes: _contextTypes,
    getChildContext() { return _context; },

    getWrappedComponent() { return this._wrappedComponent; },
    getWrappedElement() { return this._wrappedElement; },

    render() { 
      this._wrappedComponent = BaseComponent;
      this._wrappedElement = <BaseComponent {...this.state} {...this.props} />;
      return this._wrappedElement;
    }
  });

  return StubbedContextComponent;
}

module.exports = createStubbedContextComponent;

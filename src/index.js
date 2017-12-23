import React from 'react';

const METHODS = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'componentDidCatch',
  'render'
];

function wrap(inst) {
  METHODS.forEach(method => {
    let prev = inst[method];
    if (prev) {
      inst[method] = (...args) => {
        return prev.call(inst, inst.props, inst.state, ...args);
      };
    }
  });
}

export class Component extends React.Component {
  constructor(props) {
    super(props);
    wrap(this);
  }

  setState(updater) {
    return new Promise(resolve =>
      super.setState(updater, () => resolve(this.state))
    );
  }
}

export class PureComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    wrap(this);
  }

  setState(updater) {
    return new Promise(resolve =>
      super.setState(updater, () => resolve(this.state))
    );
  }
}

# @thejameskyle/my-react

> Ideas for React APIs

* Built-in React component methods (including `render`) have arguments prepended with `props` and `state`
* `this.setState` returns a promise with the updated state

## Installation

```sh
yarn add @thejameskyle/my-react
```

## Usage

```js
import { Component, PureComponent } from '@thejameskyle/my-react';

class Counter extends Component {
  state = { counter: 0 };

  async tick() {
    while (true) {
      await delay(1000);
      let newState = await this.setState((state, props) => {
        return { counter: state.counter + props.amount };
      });
      console.log(newState); // { counter: 1...2...3... }
    }
  }

  componentDidMount(props, state) {
    console.log(props, state);
    await this.tick();
  }

  render(props, state) {
    return <div>{state.counter}</div>;
  }
}
```

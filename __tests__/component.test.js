// @flow
import React from 'react';
import { Component, PureComponent } from '../src';
import { render } from 'react-dom';

describe('component', () => {
  test('lifecycle methods', async () => {
    class Counter extends Component {
      state = { counter: 0 };

      async tick() {
        return await this.setState((state, props) => ({
          counter: state.counter + props.amount
        }));
      }

      componentWillMount(props, state) {
        expect(props).toEqual({ amount: 1 });
        expect(state).toEqual({ counter: 0 });
      }

      componentDidMount(props, state) {
        expect(props).toEqual({ amount: 1 });
        expect(state).toEqual({ counter: 0 });
      }

      componentWillReceiveProps(props, state, nextProps) {
        expect(props).toEqual({ amount: 1 });
        expect(state).toEqual({ counter: 0 });
        expect(nextProps).toEqual({ amount: 2 });
      }

      shouldComponentUpdate(props, state, nextProps, nextState) {
        expect(props).toEqual({ amount: 1 });
        expect(state).toEqual({ counter: 0 });
        expect(nextProps).toEqual({ amount: 2 });
        expect(nextState).toEqual({ counter: 0 });
        return true;
      }

      componentWillUpdate(props, state, nextProps, nextState) {
        expect(props).toEqual({ amount: 1 });
        expect(state).toEqual({ counter: 0 });
        expect(nextProps).toEqual({ amount: 2 });
        expect(nextState).toEqual({ counter: 0 });
      }

      componentDidUpdate(props, state, prevProps, prevState) {
        expect(props).toEqual({ amount: 2 });
        expect(state).toEqual({ counter: 0 });
        expect(prevProps).toEqual({ amount: 1 });
        expect(prevState).toEqual({ counter: 0 });
      }

      componentWillUnmount(props, state) {
        expect(props).toEqual({ amount: 2 });
        expect(state).toEqual({ counter: 0 });
      }

      render(props, state) {
        return <div>{state.counter}</div>;
      }
    }

    class Wrapper extends Component {
      state = { amount: 1 };

      async updateAmount() {
        await this.setState({ amount: 2 });
      }

      render(props, state) {
        return <Counter amount={state.amount} />;
      }
    }

    let wrapper = render(<Wrapper />, document.createElement('div'));
    await wrapper.updateAmount();
  });

  test('setState', async () => {
    class Counter extends Component {
      state = { counter: 0 };

      async tick() {
        return await this.setState((state, props) => ({
          counter: state.counter + props.amount
        }));
      }

      render(props, state) {
        return <div>{state.counter}</div>;
      }
    }

    let counter = render(<Counter amount={2} />, document.createElement('div'));
    let newState = await counter.tick();
    expect(newState).toEqual({ counter: 2 });
  });
});

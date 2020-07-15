import React from 'react';
import { connect } from 'react-redux';
import { increment as incrementAction } from '../actions';

class App extends React.PureComponent {
  render() {
    const { count, triggerIncrease, appName } = this.props;

    return (
      <div style={{ border: '1px blue solid', padding: '5%' }}>
        <h1>This is the {appName} Stateful App</h1>
        <span>count: {count}</span>
        <button
          type="button"
          onClick={() => {
            triggerIncrease();
          }}
        >
          Increase
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  triggerIncrease: () => dispatch(incrementAction()),
});

const mapStateToProps = (state) => {
  return { count: state.count };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

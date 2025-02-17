export interface CounterState {
  count: number;
}

// Define the action types for the counter reducer
type CounterAction = { type: "INCREMENT" } | { type: "DECREMENT" };

export const initialState = { count: 0 };

export const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 > 0 ? state.count - 1 : 0 };
    default:
      return state;
  }
};

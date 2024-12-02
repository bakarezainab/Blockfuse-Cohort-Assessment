// redux.js (Minimal Redux Implementation)
export function createStore(reducer) {
    let state;
    const listeners = [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }

    dispatch({}); // Initialize state

    return { getState, dispatch, subscribe };
}
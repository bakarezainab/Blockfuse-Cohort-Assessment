// script.js
import { createStore } from './redux.js';
const WS_URL = 'wss://example-websocket-server.com';

// Redux Action Types
const ADD_MESSAGE = 'ADD_MESSAGE';

// Action Creators
function addMessage(event, message) {
    return {
        type: ADD_MESSAGE,
        payload: { event, message },
    };
}

// Reducer
const initialState = { messages: [] };
function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
}

// Create Redux Store
const store = createStore(messagesReducer);

// DOM Elements
const messagesList = document.getElementById('messages');

// Render Function
function render() {
    const { messages } = store.getState();
    messagesList.innerHTML = '';
    messages.forEach((msg) => {
        const li = document.createElement('li');
        li.textContent = `${msg.event}: ${msg.message}`;
        messagesList.appendChild(li);
    });
}

// Subscribe Render to Store Updates
store.subscribe(render);

// WebSocket Connection
const ws = new WebSocket(WS_URL);

ws.onopen = () => {
    console.log('WebSocket connection established');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.event && data.message) {
        store.dispatch(addMessage(data.event, data.message));
    }
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};
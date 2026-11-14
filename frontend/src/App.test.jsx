import React from 'react';
import ReactDOM from 'react-dom';
import { expect, it, vi } from 'vitest';
import App from './App';

vi.mock('axios', () => ({
  default: {
    get: () => new Promise(() => {})
  }
}));

it('renders the todo app with its heading', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  expect(div.querySelector('h1').textContent).toBe('Todo app');
  ReactDOM.unmountComponentAtNode(div);
});

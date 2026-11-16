import React from 'react';
import ReactDOM from 'react-dom';
import { expect, it, vi } from 'vitest';
import axios from 'axios';
import App from './App';

vi.mock('axios', () => ({
  default: {
    get: () => new Promise(() => {}),
    put: vi.fn(() => Promise.resolve())
  }
}));

it('renders the todo app with its heading', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  expect(div.querySelector('h1').textContent).toBe('Um passo de cada vez.');
  expect(div.querySelector('.empty-state h3').textContent).toBe('Tudo certo por aqui');
  ReactDOM.unmountComponentAtNode(div);
});

it('marks a pending task as completed', () => {
  const div = document.createElement('div');
  const app = ReactDOM.render(<App />, div);
  const task = {
    id: 42,
    title: 'Preparar relatório',
    description: '',
    completed: false
  };
  app.setState({ todoList: [task] });

  div.querySelector('.todo-toggle').click();

  expect(axios.put).toHaveBeenCalledWith(
    'http://localhost:8000/api/todos/42/',
    { ...task, completed: true }
  );
  ReactDOM.unmountComponentAtNode(div);
});

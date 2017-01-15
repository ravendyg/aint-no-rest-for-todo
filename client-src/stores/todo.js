'use strict';

import { unixTsp } from '../utils';

var state;
try {
  state = JSON.parse(localStorage.getItem('todo-state') || '[]');
} catch (err) {
  state = [];
}

export var todoStore = {
  state,
  addTodo(text) {
    this.state.push({
      id: unixTsp(),
      text,
      done: false
    });

    localStorage.setItem('todo-state', JSON.stringify(this.state));
  },
  removeTodo(id) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i].id === id) {
        this.state.splice(i, 1);
        break;
      }
    }

    localStorage.setItem('todo-state', JSON.stringify(this.state));
  }
};

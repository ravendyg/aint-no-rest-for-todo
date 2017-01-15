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
    var newItem = {
      id: unixTsp(),
      text,
      done: false
    };

    var i;
    for (i = 0; i < this.state.length; i++) {
      if (this.state[i].text < text) {
        this.state.splice(i, 0, newItem);
        break;
      }
    }
    // handle when should be the last one
    if (i === this.state.length) {
      this.state.push(newItem);
    }

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

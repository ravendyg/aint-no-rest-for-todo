'use strict';

import { unixTsp } from '../utils';

export var todoStore = {
  state: [],
  addTodo(text) {
    this.state.push({
      id: unixTsp(),
      text,
      done: false
    });
  },
  removeTodo(id) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i].id === id) {
        this.state.splice(i, 1);
        break;
      }
    }
  }
};

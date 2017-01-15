'use strict';

export var todoStore = {
  state: [],
  addTodo(item) {
    this.state.push(item);
  }
};

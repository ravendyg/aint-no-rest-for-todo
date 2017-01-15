'use strict';

import { unixTsp } from '../utils';

var _state;
try {
  _state = JSON.parse(localStorage.getItem('todo-state') || '[]');
} catch (err) {
  _state = [];
}

export var todoStore = {
  state: _state,
  addTodo(input) {
    var newItem;
    // this way don't need to destroy existing object
    if (typeof input === 'string') {
      newItem = {
        id: unixTsp(),
        text: input,
        done: false
      };
    } else {
      newItem = input;
    }

    var i;
    for (i = 0; i < this.state.length; i++) {
      if (this.state[i].text < newItem.text) {
        this.state.splice(i, 0, newItem);
        break;
      }
    }
    // handle when should be the last one
    if (i === this.state.length) {
      this.state.push(newItem);
    }

    saveState.call(this);
  },
  removeTodo(id) {
    updateItem(this.state, id, i => {
      this.state.splice(i, 1);
    });
  },
  toggleDone(id) {
    updateItem(this.state, id, i => {
      this.state[i].done = !this.state[i].done;
    });
  },
  updateText(id, newText) {
    updateItem(this.state, id, i => {
      // since need to find it a new place
      var temp = this.state.splice(i, 1)[0];
      temp.text = newText;
      this.addTodo(temp);
    });
  }
};

function updateItem(state, id, callback) {
  for (var i = 0; i < state.length; i++) {
    if (state[i].id === id) {
      callback(i);
      saveState(state);
      break;
    }
  }
}

function saveState(state) {
  localStorage.setItem('todo-state', JSON.stringify(state));
}

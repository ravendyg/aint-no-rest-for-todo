'use strict';

import Vue from 'vue';

import { todoStore } from './../stores/todo';

export default Vue.component(
  'todo-item',
  {
    props: ['item'],
    render(h, context) {
      return (
        <li>
          {this.beingEdited
            ? <div>
                <todo-input />
              </div>
            : <div className='content'>
                <input
                  type='checkbox'
                  checked={this.item.done}
                  onClick={this.toggle.bind(this)}
                />
                <label title='Double click to edit'>
                  {this.item.text}
                </label>
                <button
                  className='delete-btn'
                  onClick={this.remove.bind(this)}
                >X</button>
              </div>
          }
        </li>
      );
    },
    methods: {
      remove() {
        todoStore.removeTodo(this.item.id);
      },
      toggle() {
        todoStore.toggleDone(this.item.id);
      }
    }
  }
);

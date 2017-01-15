'use strict';

import Vue from 'vue';

import { config } from '../config';
import { todoStore } from './../stores/todo';

export default Vue.component(
  'todo-item',
  {
    props: ['item'],
    data() {
      return {
        beingEdited: false,
        waitingSecondClick: false
      }
    },
    render(h, context) {
      return (
        <li>
          {this.beingEdited
            ? <div>
                <todo-input
                  initialVal={this.item.text}
                  watchBlur={true}
                  onReport={this.changeTodo.bind(this)}
                />
              </div>
            : <div className='content'>
                <input
                  type='checkbox'
                  checked={this.item.done}
                  onClick={this.toggle.bind(this)}
                />
                <label
                  title='Double click to edit'
                  onClick={this.checkEdit.bind(this)}
                >
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
      },
      checkEdit() {
        // onDoubleClick doesn't work?
        if (!this.waitingSecondClick) {
          this.waitingSecondClick = true;
          this.timer = setTimeout(
            function () {
              this.waitingSecondClick = false;
            },
            config.DOUBLE_CLICK_TIMEOUT
          );
        } else {
          clearTimeout(this.timer);
          this.waitingSecondClick = false;
          this.beingEdited = true;
        }
      },
      changeTodo(newText) {
        this.beingEdited = false;
        if (newText !== this.item.text) {
          todoStore.updateText(this.item.id, newText);
        }
      }
    }
  }
);

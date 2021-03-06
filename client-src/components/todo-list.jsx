'use strict';

import Vue from 'vue';

import { todoStore } from './../stores/todo';

import * as TodoInput from './todo-input';
import * as TodoItem from './todo-item';

export default Vue.component(
  'todo-list',
  {
    render(h, context) {
      return (
        <div class='todo-app'>
          <div class='todo-header'>
            <todo-input
              onReport={this.addTodo.bind(this)}
              initialVal={''}
            />
          </div>
          <ul class='todo-body'>
            {this.sharedState.map(
              e => <todo-item item={e} />
            )}
          </ul>
        </div>
      );
    },
    data() {
      return {
        sharedState: todoStore.state
      }
    },
    methods: {
      addTodo(text) {
        todoStore.addTodo(text);
      }
    }
  }
);

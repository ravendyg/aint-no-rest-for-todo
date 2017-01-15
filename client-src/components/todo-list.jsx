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
        <div>
          <div className='todo-header'>
            <todo-input onReport={this.addTodo.bind(this)}/>
          </div>
          <ul className='todo-body'>
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

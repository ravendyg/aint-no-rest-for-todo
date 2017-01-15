'use strict';

import Vue from 'vue';

export default Vue.component(
  'todo-item',
  {
    props: ['item', 'remove'],
    render(h, context) {
      return (
        <li>
          {this.beingEdited
            ? <div>
                <todo-input />
              </div>
            : <div className='content'>
                <input type='checkbox' checked={this.item.done}/>
                <label title='Double click to edit'>
                  {this.item.text}
                </label>
                <button
                  className='delete-btn'
                  onClick={this.remove}
                >X</button>
              </div>
          }
        </li>
      );
    }
  }
);

'use strict';

import Vue from 'vue';

const warningStyle = {
  borderColor: 'red'
};

export default Vue.component(
  'todo-input',
  {
    render(h, context) {
      return (
        <div className='todo-input'>
          <form onSubmit={this.submit.bind(this)}>
            <input
              key={this.key}
              type='text'
              placeholder='What needs to be done?'
              onInput={this.input.bind(this)}
              style={this.warning ? warningStyle : {}}
            />
          </form>
        </div>
      );
    },
    data() {
      return {
        text: '',
        dirty: false,
        key: Math.random().toFixed(5).slice(2, 7)
      }
    },
    methods: {
      input(input) {
        this.dirty = true;
        this.text = input.target.value;
      },
      submit(event) {
        event.preventDefault();
        if (!this.warning) {
          this.$emit('report', this.text);
          this.text = '';
          this.dirty = false;
          this.key = Math.random().toFixed(5).slice(2, 7)
        }
      }
    },
    computed: {
      warning() {
        return this.dirty && this.text.length === 0;
      }
    }
  }
);

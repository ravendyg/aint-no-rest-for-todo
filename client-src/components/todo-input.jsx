'use strict';

import Vue from 'vue';

const warningStyle = {
  borderColor: 'red'
};

export default Vue.component(
  'todo-input',
  {
    props: ['watchBlur', 'initialVal'],
    render(h, context) {
      return (
        <div class='todo-input'>
          <form onSubmit={this.submit.bind(this)}>
            <input
              key={this.key}
              ref='inputElement'
              value={this.initialVal}
              type='text'
              placeholder='What needs to be done?'
              onInput={this.input.bind(this)}
              onBlur={this.blur.bind(this)}
              style={this.warning ? warningStyle : {}}
            />
          </form>
        </div>
      );
    },
    data() {
      return {
        text: this.initialVal,
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
        if (event) {
          event.preventDefault();
        }
        if (!this.warning) {
          this.$emit('report', this.text);
          this.text = '';
          this.dirty = false;
          this.key = Math.random().toFixed(5).slice(2, 7);
          // prop mutation (and warning!), but don't care since the component will be removed
          // just to prevent double submit
          if (this.watchBlur) {
            this.watchBlur = false;
          }
        }
      },
      blur() {
        if (this.watchBlur) {
          this.submit();
        }
      }
    },
    computed: {
      warning() {
        return this.dirty && this.text.length === 0;
      }
    },
    mounted() {
      this.$refs.inputElement.focus();
    }
  }
);

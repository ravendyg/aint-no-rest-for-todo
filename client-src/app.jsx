'use strict';


import Vue from 'vue';

import VueRouter from 'vue-router'

import * as TodoList from './components/todo-list';

Vue.use(VueRouter);

require('./styles.less');

var routes = [
  {
    path: '/',
    component: {
      template: '<todo-list></todo-list>'
    }
  }, {
    path: '*', redirect: '/'
  }
];

var router =
  new VueRouter({
    mode: 'history',
    routes
  });

var app =
  new Vue({
    router,
    el: '#app'
  });

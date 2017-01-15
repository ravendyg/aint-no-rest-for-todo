'use strict';


import Vue from 'vue';

import VueRouter from 'vue-router'

import * as MainRoute from './main';

Vue.use(VueRouter);

require('./styles.less');

var routes = [
  {
    path: '/',
    component: {
      template: '<main-route></main-route>'
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

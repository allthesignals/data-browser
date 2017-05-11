import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui','sortable', 'unstackable', 'selectable','compact','table'],
  tagName: 'table'
});

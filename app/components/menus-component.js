import Ember from 'ember';
import { nest } from 'd3-collection';

export default Ember.Component.extend({
  classNames: ['ui','selection','list'],
  groupColumn: 'menu1',
  subRoute: 'categories.sub-categories',
  model: null,
  primary: Ember.computed('model', function() {
    let model = this.get('model');
    let groupColumn = this.get('groupColumn');
    let grouped = nest()
      .key((d) => d.get(groupColumn))
      .entries(model.toArray());
    return grouped;
  }),
  actions: {
    routeTo(category) {
      let subRoute = this.get('subRoute');
      this.get('router').transitionTo(subRoute, category);
    }
  }
});

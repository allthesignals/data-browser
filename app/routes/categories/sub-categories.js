import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let parent = this.modelFor('categories');
    return parent.filterBy('menu1', params.id);
  }
});

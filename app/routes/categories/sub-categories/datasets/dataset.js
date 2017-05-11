import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.modelFor('categories.sub-categories.datasets').findBy('id', params.dataset_id);
  }
});

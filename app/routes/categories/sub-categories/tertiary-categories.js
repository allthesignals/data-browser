import Ember from 'ember';

export default Ember.Route.extend({
  selectedTags: Ember.inject.service(),
  model({ id2 }) {
    this.set('selectedTags.menu2', id2);
  }
});

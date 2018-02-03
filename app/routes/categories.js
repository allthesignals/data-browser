import Ember from 'ember';

export default Ember.Route.extend({
  selectedTags: Ember.inject.service(),
  model() {
    const selectedTags = this.get('selectedTags');
    selectedTags.setProperties({
      menu1: null,
      menu2: null,
    })
    return this.modelFor('application');
  }
});

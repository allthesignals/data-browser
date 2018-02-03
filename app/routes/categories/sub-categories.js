import Ember from 'ember';

export default Ember.Route.extend({
  selectedTags: Ember.inject.service(),
  model(params) {
    let parent = this.modelFor('categories');
    this.set('selectedTags.menu1', params.id);
    return parent.filterBy('menu1', params.id);
  },

  actions: {
    selectTag(selection) {
      this.set('selectedTags.menu2', selection);
    },
  },
});

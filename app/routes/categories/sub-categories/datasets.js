import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let parent = this.modelFor('categories.sub-categories');
    return parent.filterBy('menu2', params.parentcategory_id);
  }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  selectedTags: Ember.inject.service(),
  filtered: Ember.computed('selectedTags.tags.[]', function() {
    const selectedTags = this.get('selectedTags.tags');
    const datasets = this.get('model');

    if (selectedTags.length == 0) {
      return datasets;
    }

    return datasets
      .filter(
        dataset =>
          selectedTags.any(
            tag => dataset.get('tagsValues').includes(tag)
          )
      );
  }),
});

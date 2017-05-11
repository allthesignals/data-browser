import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['selectedCategory'],
  selectedCategory: null,
  primaryCount: 0,
  searchables: Ember.computed('model', function() {
    let model = this.get('model');
    let structured = [];

    model.forEach(function(dataset) {
      structured.push({ title: dataset.get('menu3'), 
                        id: dataset.get('id')       });
    });

    return structured;
  })
});

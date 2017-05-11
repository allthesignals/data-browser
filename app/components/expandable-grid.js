import Ember from 'ember';
import groupBy from 'ember-group-by';
const PER_ROW = 4;

export default Ember.Component.extend({
  model: null,
  selectedCategory: null,
  perRow: PER_ROW,
  selectedItems: Ember.computed('selectedCategory', function() {
    let { selectedCategory, primary } = this.getProperties('selectedCategory', 'primary');
    
    return primary.findBy('value', selectedCategory);
  }),
  selectedPosition: Ember.computed('selectedCategory', function() {
    let { selectedCategory, primary } = this.getProperties('selectedCategory', 'primary');

    return primary.mapBy('value').indexOf(selectedCategory);
  }),
  selectedPositionRow: Ember.computed('selectedPosition', function() {
    let { selectedPosition, primary } = this.getProperties('selectedPosition', 'primary'),
          interval                    = PER_ROW;

    return Math.floor(selectedPosition / interval);
  }),

  primary: groupBy('model','menu1'),

  actions: {
    selectCategory(category, items) {
      this.set('selectedCategory', category);
    }
  }
});

import Ember from 'ember';
import { nest } from 'd3-collection';

const { get } = Ember;

export default Ember.Component.extend({
  model: [],
  selected: Ember.A([]),

  classNames: ['ui', 'grid', 'categories-subcategories'],

  // returns [{ key: 'x', count: 1 }, ...]
  uniqueTags: Ember.computed('model', 'selected.[]', function() {
    const datasets = this.get('model');
    const selected = this.get('selected');
    const uniqueTags = flattenedAndDistinct(datasets);

    return countOfEach(uniqueTags, datasets, selected)
      .sortBy('key')
      .reverse()
      .sortBy('selected')
      .reverse()
  }),

  filteredItems: Ember.computed('selected.[]', function() {
    const selectedTags = this.get('selected');

    return this
      .get('model')
      .filter(
        dataset =>
          selectedTags.any(
            tag => dataset.get('tagsValues').includes(tag)
          )
      );
  }),

  filteredTags: Ember.computed('filteredItems', 'selected.[]', function() {
    const selected = this.get('selected');
    const filteredItems = this.get('filteredItems');
    const secondaryTags =
      flattenedAndDistinct(filteredItems)
        .filter(tag => !selected.includes(tag));
    return countOfEach(secondaryTags, filteredItems, selected);
  }),

  actions: {
    toggleTag({ key }) {
      const selected = this.get('selected');

      if (selected.includes(key)) {
        selected.removeObject(key);
      } else {
        selected.pushObject(key);
      }
    },
  },
});

// returns [{ key: 'x', count: 1 }, ...]
function countOfEach(uniqueTags, datasets, selected = []) {
  return uniqueTags.map(tag => ({
    key: tag,
    selected: selected.includes(tag),
    count: datasets
      .reduce(
        (acc, curr) =>
          acc + curr.get('tagsValues')
            .filter((tagEl) => tagEl == tag)
            .length,
        0,
      )
    })
  );
}

function flattenedAndDistinct(array) {
  return array
    .reduce(
      (acc, curr) =>
        acc.concat(get(curr, 'tagsValues')),
      [],
    )
    .uniq();
}

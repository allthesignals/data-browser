import Ember from 'ember';
import config from '../config/environment';
import Loader from '../utils/loader';
import RSVP from 'rsvp';

const { dataBrowserIndex } = config;
const MAX_DATASETS = 300;
const TAG_META_SEPARATOR = ':';

const { Promise } = RSVP;
const Dataset = Ember.Object.extend({
  menu1: '',
  menu2: '',
  menu3: '',
  table_name: '',
  themeid: '',
  schemaname: '',
  active: '',
  yearcolumn: '',
  source: '',
  description: '',
  tags: [],
  tagsValues: Ember.computed('tags.[]', function() {
    return this.get('tags').map(tag => {
      const split = tag.split(TAG_META_SEPARATOR);
      const { length } = split;
      return split.objectAt(length - 1);
    });
  }),
  hasYears: Ember.computed('yearcolumn', function() {
    return !!this.get('yearcolumn');
  }),
  isMunicipal: Ember.computed('menu3', function() {
    let table_name = this.get('menu3');
    return /(Municipal)/.test(table_name);
  }),
});

export default Ember.Route.extend({
  model({endpoint}) {
    let url = `${dataBrowserIndex}/api/v1/viz/?page=1&type=table&exclude_shared=false&per_page=${MAX_DATASETS}&locked=&tags=&shared=yes&only_liked=false&order=updated_at&exclude_raster=true&callback=vizjson&show_stats=false&show_permission=false&show_table=false&show_likes=false`;
    if (endpoint) {
      url = `${endpoint}/api/v1/viz/?page=1&type=table&exclude_shared=false&per_page=${MAX_DATASETS}&locked=&tags=&shared=yes&only_liked=false&order=updated_at&exclude_raster=true&callback=vizjson&show_stats=false&show_permission=false&show_table=false&show_likes=false`;
    }

    Loader.loadScript(url);

    let promise = new Promise(function(resolve, reject) {
      // on success
      window.vizjson = (data) => {
        const { visualizations } = data;
        const datasets = visualizations.map(meta => {
          return Dataset.create(meta);
        });

        // rename properties
        datasets.forEach(dataset => {
          const [tag1 = 'uncategorized', tag2 = 'uncategorized'] = dataset.get('tagsValues');
          dataset.set('menu1', tag1.capitalize());
          dataset.set('menu2', tag2.capitalize());
          dataset.set('menu3', dataset.name.replace(/_/g, ' ').capitalize());
          dataset.set('table_name', dataset.name);
        });

        resolve(
          Ember.A(datasets)
        );
      };
    });

    return promise;
  },

  actions: {
    selectDataset(dataset) {
      this.transitionTo('datasets', dataset.id);
    }
  }
});

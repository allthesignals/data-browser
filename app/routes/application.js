import Ember from 'ember';
import config from '../config/environment';
import Loader from '../utils/loader';
import RSVP from 'rsvp';

const MAX_DATASETS = 300;

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
  hasYears: Ember.computed('yearcolumn', function() {
    return !!this.get('yearcolumn');
  }),
  isMunicipal: Ember.computed('menu3', function() {
    let table_name = this.get('menu3');
    return /(Municipal)/.test(table_name);
  }),
});

export default Ember.Route.extend({
  metadata: Ember.inject.service(),
  model() {
    Loader.loadScript(`https://nycplanning-web.carto.com/u/planninglabs/api/v1/viz/?page=1&type=table&exclude_shared=false&per_page=${MAX_DATASETS}&locked=&tags=&shared=yes&only_liked=false&order=updated_at&exclude_raster=true&callback=vizjson&show_stats=false&show_permission=false&show_table=false&show_likes=false`);

    let promise = new Promise(function(resolve, reject) {
      // on success
      window.vizjson = (data) => {
        const { visualizations } = data;

        visualizations.forEach(meta => {
          const [tag1 = 'Uncategorized', tag2 = 'Uncategorized', tag3 = 'Uncategorized'] = meta.tags;
          meta.menu1 = tag1;
          meta.menu2 = tag2;
          meta.menu3 = meta.name;
          meta.table_name = meta.name;
        });

        let wrappedViz = 
          Ember.A(
            visualizations.map(meta => {
              return Dataset.create(meta);
            }),
          );

        resolve(wrappedViz);
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

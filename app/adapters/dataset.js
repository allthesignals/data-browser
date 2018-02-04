import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';
import Loader from '../utils/loader';

const { set } = Ember;
const { dataBrowserIndex } = config;
const MAX_DATASETS = 300;

export default DS.RESTAdapter.extend({
  findAll(store, type, sinceToken) {
    let url = `${dataBrowserIndex}/api/v1/viz/?page=1&type=table&exclude_shared=false&per_page=${MAX_DATASETS}&locked=&tags=&shared=yes&only_liked=false&order=updated_at&exclude_raster=true&callback=vizjson&show_stats=false&show_permission=false&show_table=false&show_likes=false`;

    Loader.loadScript(url);

    let promise = new Promise(function(resolve, reject) {
      // on success
      window.vizjson = (data) => {
        const { visualizations } = data;

        // rename properties
        visualizations.forEach(dataset => {
          set(dataset, 'menu3', dataset.name.replace(/_/g, ' ').capitalize());
          set(dataset, 'table_name', dataset.name);
        });

        resolve(
          visualizations
        );
      };
    });

    return promise;
  }
});

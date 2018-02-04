import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';
import Loader from '../utils/loader';

const { set } = Ember;
const { dataBrowserIndex } = config;
const MAX_DATASETS = 300;
const API_PATH = function(index) {
  return `/api/v1/viz/?page=1&type=table&exclude_shared=false&per_page=${MAX_DATASETS}&locked=&tags=&shared=yes&only_liked=false&order=updated_at&exclude_raster=true&callback=vizjson${index}&show_stats=false&show_permission=false&show_table=false&show_likes=false`
}

export default DS.RESTAdapter.extend({
  findAll(store, type, sinceToken) {
    // accept an array or string
    const endpoints = dataBrowserIndex.toString().split(',');

    const promises = endpoints.map((endpoint, index) => {
      let url = `${endpoint}${API_PATH(index)}`;

      Loader.loadScript(url);

      return new Promise(function(resolve, reject) {
        // on success, dynamic callback for multiple
        window[`vizjson${index}`] = (data) => {
          const { visualizations } = data;

          // rename properties
          visualizations.forEach(dataset => {
            set(dataset, 'menu3', dataset.name.replace(/_/g, ' ').capitalize());
            set(dataset, 'table_name', dataset.name);
            set(dataset, 'endpoint', endpoint);
          });

          resolve(
            visualizations
          );
        };
      });
    });

    return Promise.all(promises)
      .then(promises => {
        return promises.reduce(
          (acc, curr) => {
            return acc.concat(curr);
          },
          []
        )
      });
  }
});

import Ember from 'ember';
import RSVP from 'rsvp';
import config from '../config/environment';
import { isAjaxError } from 'ember-ajax/errors';
import imputeSpatiality from '../utils/impute-spatiality';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model(params, { queryParams: { endpoint } }) {
    let dataset = this.modelFor('application').findBy('id', params.dataset_id);
    let yearcolumn = dataset.get('yearcolumn');
    console.log(endpoint);
    // SQL queries
    let url = `${config.dataBrowserEndpoint}select * from ${dataset.get('table_name')} `;
    if (endpoint) {
      url = `${endpoint}/api/v2/sql?q=select * from ${dataset.get('table_name')} `;
    }

    if (dataset.get('isMunicipal') && dataset.get('hasYears')) {
      url += `where ${yearcolumn}=(select max(${yearcolumn}) from ${dataset.get('table_name')}) order by municipal ASC;`;
    } else {
      url += ' LIMIT 50;';
    }

    // fetch raw data for dataset
    let raw_data = this.get('ajax').request(url).then(function(raw_data) {
      return imputeSpatiality(raw_data);
    }).catch(handleErrors);

    return RSVP.hash({
      dataset,
      raw_data,
    });
  },

  afterModel(model) {
    if (!isAjaxError(model.raw_data)) {
      let fields = model.raw_data.fields;

      delete fields['the_geom'];
      delete fields['the_geom_webmercator'];
      delete fields['cartodb_id'];
    }
  },

  actions: {
    transitionTo(category) {
      this.get('router').transitionTo('categories.sub-categories.datasets', category);
    },
    willTransition() {
      let datasetsController = this.controllerFor('datasets');
      datasetsController.set('years', Ember.A);
    }
  }
});

function handleErrors(error) {
  if(isAjaxError(error)) {
    // handle all other AjaxErrors here
    return error;
  }

  // other errors are handled elsewhere
  throw error;
}

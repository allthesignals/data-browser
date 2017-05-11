import Ember from 'ember';
import RSVP from 'rsvp';
import config from '../config/environment';
import { isAjaxError } from 'ember-ajax/errors';
import imputeSpatiality from '../utils/impute-spatiality';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model(params) {
    let dataset = this.modelFor('application').findBy('id', params.dataset_id);
    let yearcolumn = dataset.get('yearcolumn');

    // SQL queries
    let url = `${config.dataBrowserEndpoint}select * from ${dataset.get('table_name')} `;

    if (dataset.get('isMunicipal') && dataset.get('hasYears')) {
      url += `where ${yearcolumn}=(select max(${yearcolumn}) from ${dataset.get('table_name')}) order by municipal ASC;`;
    } else {
      url += ' LIMIT 50;';
    }

    let meta_url = `${config.dataBrowserEndpoint}select * from meta_${dataset.get('table_name')}`;
    let years_url = `${config.dataBrowserEndpoint}select distinct(${yearcolumn}) from ${dataset.get('table_name')} limit 50`;
    
    // models
    let raw_data = this.get('ajax').request(url).then(function(raw_data) {
      return imputeSpatiality(raw_data);
    }).catch(handleErrors);

    let metadata = this.get('ajax').request(meta_url).then(function(metadata) {
      return metadata;
    }).catch(handleErrors);

    let years_available = this.get('ajax').request(years_url).then(function(years) {
      if (dataset.get('hasYears')) {
        let keys = years.rows.mapBy(yearcolumn).sort();
        let obj = keys.map((el) => { return Ember.Object.create({ year: el, selected: true }); });
        return obj;
      } else {
        return Ember.A([]);
      }
    }).catch(handleErrors);

    return RSVP.hash({
      dataset,
      raw_data,
      metadata,
      years_available
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

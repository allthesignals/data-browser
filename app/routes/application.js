import Ember from 'ember';
import config from '../config/environment';
import Loader from '../utils/loader';
import RSVP from 'rsvp';
import xmlToJs from 'npm:xml-js';

export default Ember.Route.extend({
  model({endpoint}) {
    this.store.findAll('s3');
    return this.store.findAll('dataset');
  },

  actions: {
    selectDataset(dataset) {
      this.transitionTo('datasets', dataset.id);
    }
  }
});

import Ember from 'ember';
import config from '../config/environment';
import RSVP from 'rsvp';

const { merge } = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      carto: this.store.findAll('dataset'),
      s3: this.store.findAll('s3'),
    })
      .then(({ carto, s3 }) => {
        const stream = Ember.A();
        stream.pushObjects(carto.toArray());
        stream.pushObjects(s3.toArray());
        return stream;
      });
  },

  actions: {
    selectDataset(dataset) {
      this.transitionTo('datasets', dataset.id);
    }
  }
});

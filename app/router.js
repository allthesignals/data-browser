import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('categories', { path: '/' }, function() {
    this.route('sub-categories', { path: '/:id' }, function() {
      this.route('datasets', { path: '/:parentcategory_id' }, function() {});
    });
  });
  this.route('datasets', { path: 'datasets/:dataset_id' });
});

export default Router;

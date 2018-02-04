import Ember from 'ember';
import DS from 'ember-data';
import convert from 'npm:xml-js';
import config from '../config/environment';

const { s3endpoint } = config;

export default DS.JSONAPIAdapter.extend({
  findAll(store, type, sinceToken) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(s3endpoint, function(data) {
        resolve(
          convert.xml2js(data, { compact: true })
        )
      }, 'text');
    });
  }
});

import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  queryParams: ['min', 'max'],
  years: [],

  min: 0,
  max: 50,
  perPage: 50,
  page: Ember.computed('min','max', function() {
    let { perPage, max } = this.getProperties('perPage', 'max');
    return Math.round(max/perPage);
  }),

  download_link: Ember.computed('model', function() {
    return `${this.get('model.dataset.endpoint')}/api/v2/sql?q=select * from ${this.get('model.dataset.table_name')}&format=csv&filename=${this.get('model.dataset.table_name')}`;
  }),

  download_link_shapefile: Ember.computed('model', 'model.years_available.@each.selected', function() { return this.spatial_query('shp') }),
  download_link_geojson: Ember.computed('model', 'model.years_available.@each.selected', function() { return this.spatial_query('geojson') }),
  download_link_visualize: Ember.computed('model', 'model.years_available.@each.selected', function() {
    let download_link_geojson = encodeURIComponent(this.get('download_link_geojson'));
    return `http://oneclick.cartodb.com/?file=${download_link_geojson}&provider=MAPC&logo=http://data.mapc.org/img/mapc-color.png`;
  }),

  actions: {
    toggle(year) {
      year.toggleProperty('selected');
    },

    next() {
      let { min, max, perPage } = this.getProperties('min', 'max', 'perPage');
      this.set('min', min + perPage);
      this.set('max', max + perPage);
    },

    previous() {
      let { min, max, perPage } = this.getProperties('min', 'max', 'perPage');
      this.set('min', min - perPage);
      this.set('max', max - perPage);
    }
  }
});

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

  download_link: Ember.computed('model', 'model.years_available.@each.selected', function() {
    let yearsSelected = this.get('model.years_available') || [];
    if (!yearsSelected.errors) {
      yearsSelected = yearsSelected.filterBy('selected', true);
    }

    let filterToken = '';
    if (this.get('model.dataset.hasYears') && yearsSelected[0]) {  
      let str = yearsSelected.map((el) => { return el.year }).join("','");
      filterToken = ` WHERE ${this.get('model.dataset.yearcolumn')} IN ('${str}')`;
    }

    return `${config.dataBrowserEndpoint} select * from ${this.get('model.dataset.table_name')} ${filterToken}&format=csv&filename=${this.get('model.dataset.table_name')}`;
  }),

  download_link_metadata: Ember.computed('model', function() { return this.metadata_query('csv') }),

  metadata_query(format) {
    format = format || 'json';
    return `${config.dataBrowserEndpoint} select * from meta_${this.get('model.dataset.table_name')}&format=${format}&filename=meta_${this.get('model.dataset.table_name')}`;
  },

  spatial_query(format) {
    let spatial_meta = this.get('model.raw_data.spatialMetaData');
    let tabular = this.get('model.dataset.table_name');
    let fields = Ember.keys(this.get('model.raw_data.fields')).map((el) => { return `a.${el}` });
    let where = '';
    if (this.get('model.dataset.hasYears')) {  
      let yearsSelected = this.get('model.years_available').filterBy('selected', true);
      let latest = yearsSelected[yearsSelected.length-1];
      where = ` WHERE a.${this.get('model.dataset.yearcolumn')} IN ('${latest.year}')`;
    }

    let select = `SELECT ${fields}, b.the_geom, b.the_geom_webmercator `;
    // SELECT *, b.the_geom, b.the_geom_webmercator, a.cartodb_id, a.muni_id, 

    let from = `FROM ${tabular} a `;
    // FROM "mapc-admin".demo_projections_pop_ages_65p_view a 

    let inner_join = `INNER JOIN ${spatial_meta.table} b ON a.${spatial_meta.field} = b.${spatial_meta.field}`;
    // INNER JOIN "mapc-admin".ma_municipalities b ON a.muni_id = b.muni_id
    let sql = encodeURIComponent(`${select} ${from} ${inner_join}${where}`);
    let url=`${config.dataBrowserEndpoint}${sql}&format=${format}&filename=${tabular}`;
    return url;
  },

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

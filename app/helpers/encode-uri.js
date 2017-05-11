import Ember from 'ember';

export function encodeUri(params) {
  let string = params[0];

  // 'http://oneclick.cartodb.com/?file=' + encodeURIComponent('https://mapc-admin.carto.com/api/v2/sql?q=%20SELECT%20a.seq_id,a.muni_id,a.municipal,a.geoid,a.logrecno,a.acs_year,a.pop_est,a.pop_me,a.inpov,a.inpov_me,a.inpov_p,a.inpov_mep,%20b.the_geom,%20b.the_geom_webmercator%20%20FROM%20b17001_poverty_by_population_acs_m%20a%20%20INNER%20JOIN%20ma_municipalities%20b%20ON%20a.muni_id%20=%20b.muni_id%20WHERE%20a.acs_year%20IN%20(%272011-15%27)%20%20&format=geojson') + '&filename=b17001_poverty_by_population_acs_m&provider=MAPC&logo=http://data.mapc.org/img/mapc-color.png'
  return encodeURIComponent(params);
}

export default Ember.Helper.helper(encodeUri);

import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.dataBrowserIndex,
  urlForFindAll(id, modelName, snapshot) {
    return config.dataBrowserIndex;
  }
});

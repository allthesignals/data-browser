import config from '../config/environment';

export default function imputeSpatiality(cartoTable) {
  // Ember.keys is deprecated, but Object.keys still needs a polyfill...
  let spatialField = Ember.keys(cartoTable.fields).find(function(item) {
    return config.spatialJoinFields.isAny('field', item);
  });

  if(spatialField) {
    let spatialMetaData = config.spatialJoinFields.findBy('field', spatialField);
    cartoTable.spatialMetaData = spatialMetaData;
  } else {
    cartoTable.spatialMetaData = false;
  }

  return cartoTable;
}

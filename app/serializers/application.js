import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  keyForAttribute(key) {
    return Ember.String.decamelize(key);
  },
  primaryKey: 'cartodb_id',
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = payload.rows;
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});

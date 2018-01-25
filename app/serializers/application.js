import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  keyForAttribute(key) {
    return Ember.String.decamelize(key);
  },
  primaryKey: 'id',
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const newPayload = payload.map((row, i) => {
      const mutatedRow = row;
      mutatedRow.id = i;
      return mutatedRow;
    });

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  }
});

import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  filename: DS.attr('string'),
});

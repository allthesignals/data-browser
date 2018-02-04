import { moduleForModel, test } from 'ember-qunit';

moduleForModel('s3', 'Unit | Serializer | s3', {
  // Specify the other units that are required for this test.
  needs: ['serializer:s3']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});

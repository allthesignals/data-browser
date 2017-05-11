import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-visibility-sticky', 'Integration | Component | ui visibility sticky', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-visibility-sticky}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-visibility-sticky}}
      template block text
    {{/ui-visibility-sticky}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

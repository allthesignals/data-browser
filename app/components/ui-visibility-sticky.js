import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui-visibility-sticky'],
  didInsertElement() {
    Ember.run.next(this, () => {
      this.$()
        .visibility({
          type   : 'fixed',
          offset : 100
        })
      ;
    })
  }
});

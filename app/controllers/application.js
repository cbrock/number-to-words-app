import Ember from 'ember';
import Controller from '@ember/controller';

export default Controller.extend({
  defaultNumber: 0
});

Ember.TextField.reopen({
  attributeBindings: ['data-test-selector']
});
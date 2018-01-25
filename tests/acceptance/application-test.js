import { test } from 'qunit';
import moduleForAcceptance from 'number-to-words-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | application');

test('visiting /', function(assert) {
  assert.expect(3);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });

  andThen(function() {
    const defaultNumber = find('.app-number-input').val();
    assert.equal(defaultNumber, '0', 'default input value is 0');

    // TODO modify component to accept `data-*` attributes.
    // Falling back to class selector in the meantime.
    const defaultWord = find('.app-word-output').text();
    assert.equal(defaultWord.trim(), 'zero', 'default word output is 0');
  })
});

test('modifying input updates word output', function(assert) {
  assert.expect(5);

  visit('/');

  const NUMBER_SELECTOR = '.app-number-input';
  const WORD_SELECTOR = '.app-word-output'; 

  const TEST_DATA = [
    {
      'in': 13,
      'out': 'thirteen'
    },
    {
      'in': 85,
      'out': 'eighty five'
    },
    {
      'in': 5237,
      'out': 'five thousand two hundred and thirty seven'
    },
    {
      'in': 10001,
      'out': 'ten thousand and one'
    },
    {
      'in': 12345678,
      'out': 'twelve million three hundred and forty five thousand six hundred and seventy eight'
    }
  ];

  TEST_DATA.forEach(function(obj) {
    fillIn(NUMBER_SELECTOR, obj.in);

    andThen(function() {
      assert.equal(find(WORD_SELECTOR).text().trim(), obj.out, `when input value is ${obj.in}, word is ${obj.out}`);
    });
  });
});
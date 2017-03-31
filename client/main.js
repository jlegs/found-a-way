import { Cards } from './../imports/api/cards';

Cards.insert({
  name: 'testName',
  cardText: 'newNote'
});

console.log(Cards.find().fetch());

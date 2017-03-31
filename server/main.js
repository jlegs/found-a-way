import { Meteor } from 'meteor/meteor';
import { Cards } from './../imports/api/cards';

Meteor.startup(() => {
  // code to run on server at startup
  console.log(Cards.find().fetch());
});

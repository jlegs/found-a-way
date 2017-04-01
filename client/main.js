import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Cards } from './../imports/api/cards';

const renderCards = (cards) => {
  return cards.map((card) => {
    return (
      <div key={card._id}>
        <div>
          Username: {card.username}
        </div>
        <div>
          Card Text: {card.data}
        </div>
        <hr />
      </div>
    )
  });
};

const submitNote = (e) => {
  e.preventDefault();
  let cardText = e.target.cardInput.value;
  Cards.insert({
    username: 'Anonymous',
    data: cardText
  });
  e.target.cardInput.value = '';
}

Meteor.startup(() => {
  Tracker.autorun(() => {
    let cards = Cards.find().fetch();
    let mainTemplate = (
      <div>
        <h1>I found a way too...</h1>
        <form onSubmit={submitNote}>
          <input type="text" name="cardInput" placeholder="Enter text here."></input>
        </form>
        {renderCards(cards)}
      </div>
    );
    ReactDOM.render(mainTemplate, document.getElementById('app'));
  });
});

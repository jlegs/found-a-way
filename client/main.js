import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { trim } from 'lodash';

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
        <div>
          Likes: {card.likes}
        </div>
        <div>
          Delete Card:&nbsp;
          <button onClick={() => Cards.remove({_id: card._id})}>X</button>
        </div>
        <div>
          Vote up:&nbsp;
          <button onClick={() => {
            Cards.update(card._id, {$inc: {likes: 1}
            });
          }}>+1
          </button>
        </div>
        <div>
          Vote down:&nbsp;
          <button onClick={() => {
            Cards.update(card._id, {$inc: {likes: -1}
            });
          }}>-1
          </button>
        </div>
        <hr />
      </div>
    )
  });
};

const submitNote = (e) => {
  e.preventDefault();
  let cardText = trim(e.target.cardInput.value);
  let username = trim(e.target.username.value);
  if (cardText && username) {
    Cards.insert({
      username: username,
      data: `I found a way to ${cardText}`,
      likes: 0
    });
    e.target.cardInput.value = '';
    e.target.username.value = '';
  };
};

Meteor.startup(() => {
  Tracker.autorun(() => {
    let cards = Cards.find().fetch();
    let mainTemplate = (
      <div>
        <h1>User Submissions:</h1>
        <p>(Both fields must be filled out for a submission to go through.)</p>
        <form onSubmit={submitNote}>
          <input type="text" name="username" placeholder="Enter name here."></input>
          <input type="text" name="cardInput" placeholder="Enter text here."></input>
          <input type="submit" value="Submit"></input>
        </form>
        <hr />
        {renderCards(cards)}
      </div>
    );
    ReactDOM.render(mainTemplate, document.getElementById('app'));
  });
});

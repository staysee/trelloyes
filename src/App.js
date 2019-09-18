import React from 'react';
import List from './List';
import STORE from './store'

import './App.css';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends React.Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  }

  state = {
    store: STORE
  }

  handleDeleteCard = (cardId) =>{
    console.log('handle delete card', {cardId})

    const { lists, allCards } = this.state.store;

    //map through each list and filter out the deleted card
    const newLists = lists.map( list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }))

    const newCards = omit(allCards, cardId)

    //update the state
    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  }

  handleAddCard = (listId) => {
    console.log('handle add card', {listId})

    const newCard = newRandomCard()
    
    //map through the lists and add a card to the list that matches the new card id
    const newLists = this.state.store.lists.map( list => {
      if (list.id === listId){
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        }
      }
      return list
    })

    //update the state
    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  }

  render() {
    const { store } = this.state;
    return (
      <main className='App'>
  
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
  
        <div className="App-list">
          {store.lists.map(list =>
            <List 
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onClickDelete={this.handleDeleteCard}
              onClickAdd={this.handleAddCard}
            />
          )}
        </div>
      </main>
    );
  }

}

export default App;
jQuery(() => {


  $.ajax({
    url: 'https://deckofcardsapi.com/api/deck/new/'
  }).then(
    (deck) => {
      // console.log(deck);
      getDeck(deck.deck_id);
  },
  (error) => {
    console.log('error');
  })


  const getDeck = (deckID) => {
    $.ajax({
      url: `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52` //draws 52 cards from deck with unique deckID
    }).then(
      (data) => {
        deck = data // creates global deck variable
        // console.log(data);
    },
    () => {
      console.log('error');
    })
  }

  $('#shuffle').on('click',() => {
      let shuffledDeck = []
      for (var i = (deck.cards).length; i > 0; i--) {
      const cardNum = Math.floor(Math.random() * i)
      shuffledDeck.push(deck.cards.splice(cardNum, 1))
    }

    for (var i = 0; i < shuffledDeck.length; i++) {
      console.log(shuffledDeck[i][0].code);
      const $card = $('<img>').attr('src', shuffledDeck[i][0].image)
      $('#userContainer').append($card)
    }




  })

  // $('#cardBack').on('click',() => {
  //   console.log(deck.cards);
  //   const cardNum = Math.floor(Math.random() * 52)
  //   const $card = $('<img>').attr('src', deck.cards[cardNum].image).attr('alt',deck.cards[cardNum].code).attr('class','card')
  //   $('#userContainer').append($card)
  // })





})

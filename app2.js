jQuery(() => {

  $.ajax({
    url: 'https://deckofcardsapi.com/api/deck/new/'
  }).then(
    (deck) => {
      console.log('works');
      getDeck(deck.deck_id);
  },
  (error) => {
    console.log('error');
  })

  let deck = {
    cards: []
  }

  const getDeck = (deckID) => {
    $.ajax({
      url: `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52` //draws 52 cards from deck with unique deckID

    }).then(
      (data) => {
       // creates global deck variable
      deck.cards = data.cards
      console.log(deck, 'initial deck');

    },
    () => {
      console.log('error');
    })
  }
  const shuffle = (array) => {
    // shuffledDeck.cards = []
    // console.log(shuffledDeck);
    // for (let i = deck.cards.length; i > 0; i--) {
    //   const cardNum = Math.floor(Math.random() * i)
    //   shuffledDeck.cards.push(deck.cards[cardNum])
    //   deck.cards.splice(cardNum, 1)
    // }
    // for (let i = deck.length; i > 0 ; i--) {
    //   let j = Math.floor(Math.random() * (i))
    //   [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]]
    // }
    // Durstenfeld shuffle http://thenewcode.com/1095/Shuffling-and-Sorting-JavaScript-Arrays :
    $('#cardBack').addClass('cardBackShuffle').delay(1001).queue(() => {
      $('#cardBack').removeClass('cardBackShuffle').dequeue()
    })
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    console.log(deck,'shuffled')
    return array;
  }
  const dealCards = (num) => {
    $('#userContainer').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', deck.cards[0].image).attr('id', deck.cards[0].code)
      $('#userContainer').append($card)
      deck.cards.splice(0, 1)
    }
    console.log(deck);
  }

  $('#shuffle').on('click',() => {shuffle(deck.cards)})

  $('#cardBack').on('click', () => {
    let num = 1
    dealCards(num)
  })

  $('#dealCards').on('click', () => {
    let num = prompt('How many cards do you want to deal?', 'enter a number')
    dealCards(num)
  })

  $('#userContainer').on('click', $('.card'), (event) => {
    const $discardPile = $('#discardPile').css('display', 'flex')
    $discardPile.prepend($(event.target).removeClass('card').addClass('cardDiscard'))
  })



})

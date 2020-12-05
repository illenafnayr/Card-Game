jQuery(() => {
//.ajax junk:
  $.ajax({
    url: 'https://deckofcardsapi.com/api/deck/new/'
  }).then(
    (deck) => {
      // console.log('works');
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
       // creates global deck variable
      deck.cards = data.cards
      console.log(deck, 'initial deck');

    },
    () => {
      console.log('error');
    })
  }


//Deck Piles:
  let deck = {
    cards: []
  }
  let discardPile = {
    cards: []
  }

//Functions:
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
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  const dealCards = (num) => {
    $('#userContainer').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', deck.cards[0].image).attr('id', deck.cards[0].code)
      $('#userContainer').append($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0])//since .splice returns array and only splilcing one object use [0] to select that object
    }
    console.log(deck, 'deck remaining');
  }
  const addPlayer = () => {

  }

//Event Handlers:
  $('#shuffle').on('click',() => {
    $('#cardBack').addClass('cardBackShuffle').delay(1001).queue(() => {
      $('#cardBack').removeClass('cardBackShuffle').dequeue()
      })
    shuffle(deck.cards)
    console.log(deck, 'deck shuffled')
  }) // shuffle deck
  $('#cardBack').on('click', () => {
    let num = 1
    dealCards(num)
  }) // deal individual card to user
  $('#dealCards').on('click', () => {
    let num = prompt('How many cards do you want to deal?', 'enter a number')
    dealCards(num)
  }) //deal x amount of cards to user
  $('#userContainer').on('click', (event) => {
    $('#discardPile').css('display', 'flex')
    const $discardPile = $('#discardPileSub')
    console.log(discardPile, 'disccardPile');
    $discardPile.prepend($(event.target).removeClass('card').addClass('cardDiscard'))
    if ($('#buttons').children().eq(2).length === 0) {
      $('#buttons').append('<button type="button" name="button" id="shuffleDiscard" class="button">Shuffle Discard Pile</button>')
    } else {
      return
    }

  }) //discard selected card from user container
  $('#buttons').on('click','#shuffleDiscard', () => {
    // $('#cardBack').addClass('cardBackShuffle').delay(1001).queue(() => {
    //   $('#cardBack').removeClass('cardBackShuffle').dequeue()
    //   })

    shuffle(discardPile.cards)//shuffle discard array
    $('#discardPileSub').children().remove()//remove imgs from discard pile
    for (let i = 0; i < discardPile.cards.length; i++) { //append shuffled array imgs to discard pile
      const $discardPile = $('#discardPileSub')
      $discardCard = $('<img>').attr('src', discardPile.cards[i].image).attr('id', discardPile.cards[i].code)
      $discardPile.prepend($discardCard)
    }
    console.log(discardPile.cards, 'discard shuffled');
  }) //shuffle discard pile and re append shuffled imgs
})

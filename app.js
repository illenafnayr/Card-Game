jQuery(() => {
//.ajax junk:
  $.ajax({
    url: 'https://deckofcardsapi.com/api/deck/new/'
  }).then(
    (deck) => {
      // console.log(deck.deck_id);
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
  const dealCardsComputer = (num) => {
    $('#computer').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', deck.cards[0].image).attr('id', deck.cards[0].code)
      $('#computer').append($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0])//since .splice returns array and only splilcing one object use [0] to select that object
    }
  }
  
  const dealCardsUser = (num) => {
    $('#user').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', deck.cards[0].image).attr('id', deck.cards[0].code)
      $('#user').append($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0])//since .splice returns array and only splilcing one object use [0] to select that object
    }
    console.log(deck, 'deck remaining');
  }
  const discard = (event) => {
    $('#discardPile').css('display', 'flex')
    const $discardPile = $('#discardPileSub')
    console.log(discardPile, 'disccardPile');
    $discardPile.prepend($(event.target).removeClass('card').addClass('cardDiscard'))
    if ($('#buttons').children().eq(2).length === 0) {
      $('#buttons').append('<button type="button" name="button" id="shuffleDiscard" class="button">Shuffle Discard Pile</button>')
    } else {
      return
    }}
//Event Handlers
    // shuffle deck
  $('#shuffle').on('click',() => {
    $('#cardBack').addClass('cardBackShuffle').delay(1001).queue(() => {
      $('#cardBack').removeClass('cardBackShuffle').dequeue()
      })
    shuffle(deck.cards)
    console.log(deck, 'deck shuffled')
  })
    // deal individual card to user
  $('#cardBack').on('click', (event) => {
    let num = 1
    dealCardsUser(num)
  })
    //deal x amount of cards to user
  $('#dealCards').on('click', () => {
    let num = prompt('How many cards do you want to deal?', 'enter a number')
    dealCardsUser(num)
    dealCardsComputer(num)
  })
    //discard selected card from user container
  $('#user').on('click','.card', () => {
    discard(event)
  })
    //discard selected card from computer container
  $('#computer').on('click','.card', () => {
    discard(event)
  })
    //shuffle discard pile and re append shuffled imgs
  $('#buttons').on('click','#shuffleDiscard', () => {
    shuffle(discardPile.cards)//shuffle discard array
    $('#discardPileSub').children().remove()//remove imgs from discard pile
    for (let i = 0; i < discardPile.cards.length; i++) { //append shuffled array imgs to discard pile
      const $discardPile = $('#discardPileSub')
      $discardCard = $('<img>').attr('src', discardPile.cards[i].image).attr('id', discardPile.cards[i].code).addClass('cardDiscard')
      $discardPile.prepend($discardCard)
    }
    console.log(discardPile.cards, 'discard shuffled')
  })
    //right click to deal top card to computer
  $('#cardBack').on('contextmenu', (event) => {
    event.preventDefault()
    let num = 1
    dealCardsComputer(num)
  })
})

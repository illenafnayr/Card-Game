jQuery(() => {



  $('#cardBack').on('click',() => {
    $.ajax({
      url: 'https://deckofcardsapi.com/api/deck/new/'

    }).then(
      (deck) => {
        const deckID = deck.deck_id;//creates new deck id
        $.ajax({
          url: `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52` //draws 52 cards from deck with unique deckID
        }).then((data) => {
          console.log(data.cards);
          const cardNum = Math.floor(Math.random() * 52)// creates random number betweeb 0 and 51 to use to choose from array of cards.
          const $card = $('<img>').attr('src', data.cards[cardNum].image).attr('alt',data.cards[cardNum].code).attr('class','card')
          $('.user').append($card)
        },
        () => {
          console.log('error');
        })
    },
    (error) => {
      console.log('error');
    })
  })

  $('#addPlayer').on('click',() => {
    const $userDiv = $('<div class = "user">')
    $('#userContainer').append($userDiv)
  })

  $('#endHand').on('click',() => {
    $('.dealerFunctions').append('<input type="button" name="" value="Discard to Discard Pile">')
    $('.dealerFunctions').append('<input type="button" name="" value="Redistrbute Player Cards">')
    $('.dealerFunctions').append('<input type="button" name="" value="Discard to bottom of Deck">')
  })



})

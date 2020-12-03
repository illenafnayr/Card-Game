jQuery(() => {

  $.ajax({
    url: 'https://deckofcardsapi.com/api/deck/new/'

  }).then(
    (deck) => {
      const deckID = deck.deck_id;//creates new deck id

      $.ajax({
        url: `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52` //draws 52 cards from deck with unique deckID
      }).then((data) => {
        // console.log(data.cards);
        // const cardNum = Math.floor(Math.random() * 52)// creates random number betweeb 0 and 51 to use to choose from array of cards.
        // const $card = $('<img>').attr('src', data.cards[cardNum].image).attr('alt',data.cards[cardNum].code)
        // $('body').append($card)
      },
      () => {
        console.log('error');
      })
  },
  (error) => {
    console.log('error');
  })

  // const $cardBack = $('<img>').attr('src', 'https://www.pngkey.com/png/full/349-3492792_card-back.png').attr('alt', 'card back').css({'width': '226px', 'height': '314'})
  // $('body').append($cardBack)








})

jQuery(() => {
//.ajax junk:
  const run = () => {
    $.ajax({
      url: 'https://deckofcardsapi.com/api/deck/new/'
    }).then(
      (deckinit) => {
        // console.log(deck.deck_id);
        getDeck(deckinit.deck_id);
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
  }
//Deck Piles (Global):
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
  const dealCardsUser = (num) => {
    $('#user').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', deck.cards[0].image).attr('id', deck.cards[0].code).attr('srcimg', deck.cards[0].image)
      $('#user').append($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0]);//since .splice returns array and only splilcing one object use [0] to select that object
      removeDeckImg()
    }
  }
  const dealCardsComputer = (num) => {
    $('#computer').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue).attr('id', deck.cards[0].code).attr('srcimg', deck.cards[0].image)
      $('#computer').append($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0]);//since .splice returns array and only splilcing one object use [0] to select that object
      removeDeckImg()
    }
  }
  const dealCards = (num, user, image, srcimg) => {
    $(user).css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', image).attr('srcimg', srcimg)
      $(user).append($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0]);//since .splice returns array and only splilcing one object use [0] to select that object
      window.forDealing
      removeDeckImg()
    }
  }
  const removeDeckImg = () => {
    if (discardPile.cards.length === 52) {
      $('#cardzz').children().eq(0).remove()
      console.log('asdfasd');
    }
  }
  const discard = (event) => {
    $('#discardPile').css('display', 'flex')
    const $discardPile = $('#discardPileSub')
    // console.log(discardPile, 'disccardPile');
    $discardPile.prepend($(event.target).removeClass('card').addClass('cardDiscard'))
    if ($('#buttons').children().eq(2).length === 0) {
      $('#buttons').append('<button type="button" name="button" id="shuffleDiscard" class="button">Shuffle Discard Pile</button>')
    } else {
      return
    }
  }
  const openModal = () => {
    $('#modal').css('display', 'flex')
  }
  const initGoFish = () => {
    if ($('#computer').children().length === 7 && $('#user').children().length === 7) {
      $('#goFishModal').css('display', 'flex')
      console.log('init go fish');
    }
  }
  const playGoFish = () => {
    console.log('Play Go fish!');
  }

//Event listeners
    // open modal on click
  $('#openModal').on('click', openModal)
    // close modal and select deck on click
  $('#selectDeck').on('click', () => {
    $('#modal').css('display', 'none')
  })
    // shuffle deck
  $('#shuffle').on('click',() => {
    $('#cardBack').addClass('cardBackShuffle').delay(1001).queue(() => {
      $('#cardBack').removeClass('cardBackShuffle').dequeue()
      })
    shuffle(deck.cards)
    console.log(deck, 'deck shuffled')
  })
    // deal individual card to user on click
  $('#cardBack').on('click', (event) => {
    let num = 1
    dealCards(num, $('#user'), deck.cards[0].image, deck.cards[0].image )
    initGoFish()
  })
  // right click to deal top card to computer
  $('#cardBack').on('contextmenu', (event) => {
  event.preventDefault()
  let num = 1
  dealCards(num, $('#computer'), $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue, deck.cards[0].image);
  initGoFish()
})
    // deal x amount of cards to user
  $('#dealCards').on('click', () => {
    let num = prompt('How many cards do you want to deal?', 'enter a number')
    // dealCards(num, $('#user'), deck.cards.splice(0, 1)[0], deck.cards.splice(0, 1)[0].image)
    // console.log(deck.cards[0].image);
    // debugger;
    // dealCards(num, $('#computer'), $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue, deck.cards.splice(0, 1)[0].image)
    dealCardsUser(num)
    dealCardsComputer(num)
    initGoFish()
  })
    // discard selected card from user container
  $('#user').on('click','.card', () => {
    discard(event)
    $(event.target).css('transform', 'none')
  })
    // discard selected card from computer container
  $('#computer').on('click','.card', () => {
    discard(event)
    $(event.target).css('transform', 'none')
    $(event.target).attr('src', $(event.target).attr('srcimg'))
  })
    // shuffle discard pile and re append shuffled imgs
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
    // scale cards on hover
  $('.mainContainer').on('mouseenter', '.card', (event) => {
    $(event.target).css('transform', 'scale(1.10)')
  })
    // makes cards scale(1.1x) on hover
  $('.mainContainer').on('mouseleave', '.card', (event) => {
    $(event.target).css('transform', 'none')
  })
    // reset deck
  $('#reset').on('click',() => {
    $('#user').children().remove()
    $('#computer').children().remove()
    $('#discardPileSub').children().remove()
    $('#discardPile').css('display', 'none')
    discardPile.cards = []
    deck.cards = []
    console.log(discardPile);
    console.log(deck);
    run()
  })
    //Carousel event listeners
    let currentImgIndex = 0;
    let lastImgIndex = $('#carousel-images').children().length -1
    const display = (display) => {
      $('#carousel-images').children().eq(currentImgIndex).css('display', display)
    }
  $('#next').on('click', () => {
    display('none')
    if (currentImgIndex < lastImgIndex) {
      currentImgIndex ++
    } else {
      currentImgIndex = 0
    }
    display('block')
  })
  $('#previous').on('click', () => {
    display('none')
    if (currentImgIndex > 0) {
      currentImgIndex --
    } else {
      currentImgIndex = lastImgIndex
    }
    display('block')
  })
    //select deck img
  $('#selectDeck').on('click',() => {
    const src = $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue
    $('#cardzz').children().eq(0).removeAttr('src')
    $('#cardzz').children().eq(0).attr('src', src)
    $('#computer').children().attr('src', src)
  })
    //Choose to play go Fish
  $('#goFishYes').on('click', () => {
    $('#goFishModal').css('display', 'none')
    playGoFish()
  })
    //Choose NOT to play go Fish
  $('#goFishNo').on('click', () => {
    $('#goFishModal').css('display', 'none')
  })
  // On Load
  run()
})

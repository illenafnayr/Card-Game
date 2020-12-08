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
  const drawCardUser = (num) => {
    $('#user').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', deck.cards[0].image).attr('id', deck.cards[0].code).attr('srcimg', deck.cards[0].image)
      $('#user').prepend($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0]);//since .splice returns array and only splilcing one object use [0] to select that object
      removeDeckImg()
    }
  }
  const drawCardComputer = (num) => {
    $('#computer').css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue).attr('id', deck.cards[0].code).attr('srcimg', deck.cards[0].image)
      $('#computer').prepend($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0]);//since .splice returns array and only splilcing one object use [0] to select that object
      removeDeckImg()
    }
  }
  const dealCards = (num, user, image, srcimg) => {
    $(user).css('visibility', 'visible')
    for (let i = 0; i < num; i++) {
      const $card = $('<img class = "card">').attr('src', image).attr('srcimg', srcimg).attr('id', deck.cards[0].code)
      $(user).prepend($card)
      discardPile.cards.push(deck.cards.splice(0, 1)[0]);//since .splice returns array and only splilcing one object use [0] to select that object in the array
      removeDeckImg()
    }
  }
  const removeDeckImg = () => {
    if (discardPile.cards.length === 52) {
      $('#cardzz').children().eq(0).css('display','none')
      console.log('asdfasd');
    }
  }
  const discard = (event) => {
    $('#discardPile').css('display', 'flex')
    const $discardPile = $('#discardPileSub')
    // console.log(discardPile, 'disccardPile');
    $discardPile.prepend($(event.target).removeClass('card').addClass('cardDiscard').css('position', 'static').css('z-index', '0'))
    if ($('#buttons').children().eq(2).length === 0) {
      $('#buttons').append('<button id="shuffleDiscard" class="button">Shuffle Discard Pile</button>')
    } else {
      return
    }
  }
  const openModal = () => {
    $('#modal').css('display', 'flex')
  }
  const initGoFish = () => {
    if ($('#computer').children().length === 7 && $('#user').children().length === 7 && discardPile.cards.length === 14) {
      $('#goFishModal').css('display', 'flex')
      console.log('init go fish');
    }
  }
  const playGoFish = () => {
    const userTurn = () => {
      console.log('Play Go fish!');
      $('#askForModal').css('display', 'flex')
      $('#user').children().clone().removeClass().addClass('option').appendTo($('#askForOptions'))
      $('#askForOptions').on('click', '.option', (event) => {
        console.log($(event.target)[0].id.charAt(0));
        for (let i = 0; i < $('#computer').children().length; i++) {
          if ($('#computer').children().eq(i)[0].id.charAt(0) === $(event.target)[0].id.charAt(0)) {
            // console.log($('#computer').children().eq(i)[0].id.charAt(0), 'computer id');
            // console.log($(event.target)[0].id.charAt(0), 'event target id');
            $('#user').prepend($('#computer').children().eq(i).removeAttr('src').attr('src', $('#computer').children().eq(i)[0].attributes.srcimg.nodeValue ))
            $('#askForModal').css('display', 'none')
            console.log('its a match');
            return
          } else {
              $('#askForModal').css('display', 'none')
              $('#computerSaysModal').css('display', 'flex')
              $('#computerSaysModalSub').text('Go Fish!')
              $('#goFish').on('click', () => {
                drawCardUser(1)
                $('#computerSaysModal').css('display', 'none')
                computerTurn()
              })
              break
          }
        }
      })
    }
    const computerTurn = () => {
      let randomIndexNum = Math.floor(Math.random() * $('#computer').children().length-1)
      let choice = $('#computer').children().eq(randomIndexNum)[0].id.charAt(0)
      $('#computerTurnModal').css('display', 'flex')
      $('#computerTurnModalSub').append($('<h1>').text(choice))
      $('#give').on('click', () => {
        for (let i = 0; i < $('#user').children().length; i++) {
          if (choice === $('#user').children().eq(i)[0].id.charAt(0)) {
              $('#computer').prepend($('#user').children().eq(i))
              $('#computerTurnModal').css('display', 'none')
              // $('#computer').children().eq(0).removeAttr('src').attr('src', $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue)
              return
          } else {
            $('#computerTurnModal').css('display', 'none')
            $('#noMatch').css('display', 'flex')
            $('#beginTurn').on('click', () => {
              drawCardComputer(1)
              $('#noMatch').css('display', 'none')
            })
            break
          }

        }
      })
    }
    userTurn()
}
  const initWar = () => {
    if ($('#computer').children().length === 26 && $('#user').children().length === 26) {
      $('#warModal').css('display', 'flex')
      console.log('init go fish');
    }
  }
  const playWar = () => {
    console.log('play war!');
    const userCard = $('#user').children().eq(0)
    const computerCard = $('#computer').children().eq(0)
    $('#war').on('click', () => {
      $('#userWar').append(userCard)
      userCard.css('width', '85%').css('height', 'auto').css('z-index','0').css('position','static').attr('src', $('#userWar').children().eq(1)[0].attributes[3].nodeValue)

      $('#computerWar').append(computerCard)
      computerCard.css('width', '85%').css('height', 'auto').css('z-index','0').css('position','static').attr('src', $('#computerWar').children().eq(1)[0].attributes[3].nodeValue)
    })
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
    initWar()
  })
  // right click to deal top card to computer
  $('#cardBack').on('contextmenu', (event) => {
  event.preventDefault()
  let num = 1
  dealCards(num, $('#computer'), $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue, deck.cards[0].image);
  initGoFish()
  initWar()
})
    // deal x amount of cards to user
  $('#dealCards').on('click', () => {
    let num = prompt('How many cards do you want to deal?', 'enter a number')
    // dealCards(num, $('#user'), deck.cards.splice(0, 1)[0], deck.cards.splice(0, 1)[0].image)
    // console.log(deck.cards[0].image);
    // debugger;
    // dealCards(num, $('#computer'), $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue, deck.cards.splice(0, 1)[0].image)
    drawCardUser(num)
    drawCardComputer(num)
    initGoFish()
    initWar()
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
    $('#user').css('position', 'static')
    $('#computer').css('position', 'static')
    $('#discardPileSub').children().remove()
    $('#discardPile').css('display', 'none')
    $('#shuffleDiscard').remove()
    $('#cardzz').children().eq(0).css('display','inline')
    $('*').css('background-image', 'none')
    $('.modal-box').css('background-color', 'white')
    $('#warHeader').remove()
    $('#dealCards').css('display','inline-block')
    $('#shuffle').css('display', 'inline-block')
    $('#openModal').css('display', 'inline-block')
    $('#battlefield').css('display', 'none')
    $('#war').css('display','none')
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

//////////Go Fish Initiation////////////////////
    //Choose to play go Fish
  $('#goFishYes').on('click', () => {
    $('#goFishModal').css('display', 'none')
    playGoFish()
  })
    //Choose NOT to play go Fish
  $('#goFishNo').on('click', () => {
    $('#goFishModal').css('display', 'none')
  })

  //////////War Initiation////////////////////
      //Choose to play WAR!
    $('#warYes').on('click', () => {
      $('#warModal').css('display', 'none')
      $('#user').css('position', 'relative')
      $('#computer').css('position', 'relative')
      $('*').css('background-color', 'none')
      $('*').css('background-image', 'url("https://cdn.pixabay.com/photo/2013/07/13/12/05/army-159125_1280.png")')
      $('button').css('background-image', 'none').css('background-color', '#fffff1')
      $('body').prepend($('<h1 id = "warHeader">WAR!!!</h1>'))
      $('#dealCards').css('display','none')
      $('#shuffle').css('display', 'none')
      $('#openModal').css('display', 'none')
      $('#battlefield').css('display', 'flex')
      $('#war').css('display','inline-block')
      for (let i = 0; i < 26; i++) {
        $('#user').children().eq(i).css('z-index', i.toString()).css('position', 'absolute').attr('src', $('#carousel-images').children().eq(currentImgIndex)[0].attributes[0].nodeValue)
        $('#computer').children().eq(i).css('z-index', i.toString()).css('position', 'absolute')
      }
      playWar()
    })
      //Choose NOT to war
    $('#warNo').on('click', () => {
      $('#warModal').css('display', 'none')
    })
  // On Load
  run()
})

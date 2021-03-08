# Card-Game
https://illenafnayr.github.io/Card-Game/

I made a list of things I wanted to achieve:
AS A USER I WANT TO BE ABLE TO:
  -shuffle at any point during program
  -deal any amount of cards cards
  -discard
  -shuffle discard pile
  -reset the deck
  -select deck image
  -play a game
After a succesful (my first) AJAX request, I began to manipulate the data to be able to select a single card. Once I was able to do that, I began to figure out a way to move that card.
I realized that I would create different divs for every place that that card could go. I created a div for the user, the deck its self, and three other players. I quickly removed the 3 other players because I realized that it would be no fun to play a game if every user is sharing one screen and can see everyone elses cards. I will wait until I learn more back-end to do something like this. This led me to think that I could create a computer div, whos cards would be hidden. I did this by changing the img source, using javascript to match the img of the card back image that I had chosen. This made me realize that I could allow the user to make an option to choose the image they want, so i implemented a carousel that showed up on a modal when you cclick a button that says select your deck. 

I was determined to figure out a shuffling algorithm and became very close to having a working one. But I was wasting precious time so I caved and looked up a solution. I came across the durstenfield shuffle, and found that my algorithm shared many similarities. Once I had a deck that shuffled I moved on to making a discard pile. 

The discard pile appears only once the first card becomes discarded, and since I had the shuffling function, I said hey, why not make the discard pile be able to shuffle as well. 

with all this in place I was ready to write some game logic. I first wrote go fish, that initaites only when the user happens to deal 7 cards to themself, 7 cards to the computer and there is nothing in the discard pile. When these conditions were met, the user has the option to apply the go fish logic. In the future I will revisit this game. I can successfully play one round, but after that the code breaks. Again, I was spending valuable time on it and wanted to have a functioning game to submit. I then moved on to writing WAR, which initates if each player has 26 cards dealt to them. The game works as intended, BUT some of the values of the cards do not work properly. For example a Queen is higher than a King becuse Q > K. Again, I plan to revisit and correct this. I also got carried away with restyling the game for when war is intiated and I am not happy with the result. Again, I will revisit the styling. 

Update: 3 months later and its INSANE to see the improvement in my development skills. Im tempted to not update this much, just to show a comparison between then and now.

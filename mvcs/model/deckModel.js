var DeckModel = function()
{
	this.deck = [];

	this.removeCards = function(cardsList)
	{
	}
	
	this.drawCard = function()
	{
		var res;
	
		var randomId = this.getRandomId();
		res = this.deck[randomId];
		this.deck.splice(randomId, 1);
		return res;
	}
	
	this.getRandomId = function()
	{
		return (Math.floor(Math.random() * this.deck.length));
	}

	this.resetDeck = function()
	{
		var cardsVals = ["A","K","Q","J","T","9","8","7","6","5","4","3","2" ];
		var cardsTypes = ["s","d","c","h"];
		this.deck = [];

		var i,j;
		for (i=0; i<cardsVals.length; i++) 
		{
			for (j=0; j<cardsTypes.length; j++) 
			{	
				this.deck.push(cardsVals[i]+cardsTypes[j]);
			}
		}
	}	
}
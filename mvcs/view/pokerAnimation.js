var PokerAnimation = function(view)
{
	this.view = view;
	this.previousState;
	this.ticker = 0;
	this.delta = 0;
	this.deckX = 860;
	this.deckY = 20;
//-------------------------------------------------------------------	
	this.animationTicker = function(delta)
	{
		this.delta = delta;
		this.ticker = (this.previousState == this.view.animationState)?(this.ticker + delta):(0);
		this.previousState = this.view.animationState;
	
		if (this.view.animationState == 1)
		{
			this.scenario1();
		} else
		if (this.view.animationState == 5)
		{
			this.scenario5();
		} 
	}
//-------------------------------------------------------------------		
	this.animationTween = function(object,param,startCount,duration,startValue,finalValue)
	{
		var endCount = startCount + duration;
		var step = (finalValue-startValue)/duration;
	
		if ((this.ticker>startCount)&&(this.ticker<endCount)) { 
			object[param] += step*this.delta; 
		} else 
		if (this.ticker>=endCount) 
		{
			object[param] = finalValue;
		} else 
		if	(this.ticker<=startCount) 
		{
			object[param] = startValue;
		}
	}
//-------------------------------------------------------------------
	this.flyFromDeck = function(object,startCount,duration,finalX,finalY)
	{
		this.animationTween(object, "y", startCount, duration, this.deckY, finalY);
		this.animationTween(object, "x", startCount, duration, this.deckX, finalX);			
	}		
//-------------------------------------------------------------------	
	this.scenario1 = function()
	{
		this.flyFromDeck(this.view.cards[5],  1, 40, (128 + 25)*0 + 5, 550)
		this.flyFromDeck(this.view.cards[6], 11, 40, (128 + 25)*0 +70, 550)
		
		this.flyFromDeck(this.view.cards[7], 21, 40, (128 + 25)*1 + 5, 550)
		this.flyFromDeck(this.view.cards[8], 31, 40, (128 + 25)*1 +70, 550)

		this.flyFromDeck(this.view.cards[9], 41, 40, (128 + 25)*2 + 5, 550)
		this.flyFromDeck(this.view.cards[10],51, 40, (128 + 25)*2 +70, 550)

		this.flyFromDeck(this.view.cards[11],61, 40, (128 + 25)*3 + 5, 550)
		this.flyFromDeck(this.view.cards[12],71, 40, (128 + 25)*3 +70, 550)

		this.flyFromDeck(this.view.cards[13],81, 40, (128 + 25)*4 + 5, 550)
		this.flyFromDeck(this.view.cards[14],91, 40, (128 + 25)*4 +70, 550)		
		
		this.flyFromDeck(this.view.cards[4],161, 20, 650, 100);
		this.flyFromDeck(this.view.cards[3],151, 20, 550, 100);
		this.flyFromDeck(this.view.cards[2],141, 20, 450, 100);
		this.flyFromDeck(this.view.cards[1],131, 20, 350, 100);
		this.flyFromDeck(this.view.cards[0],121, 20, 250, 100);
	}
//-------------------------------------------------------------------
	this.scenario5 = function()
	{
		this.animationTween(this.view.cards[15], "alpha",  1, 50 ,0 ,0.5);
		this.animationTween(this.view.cards[16], "alpha", 21, 50 ,0 ,0.5);
		this.animationTween(this.view.cards[17], "alpha", 41, 50 ,0 ,0.5);
		this.animationTween(this.view.cards[18], "alpha", 51, 50 ,0 ,0.5);
		this.animationTween(this.view.cards[19], "alpha", 81, 50 ,0 ,0.5);
	}
}
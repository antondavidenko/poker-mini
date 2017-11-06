var PokerAnimation = function()
{
	this.view;
	this.previousState;
	this.ticker = 0;
	this.delta = 0;
	this.deckX = 860;
	this.deckY = 20;
//-------------------------------------------------------------------	
	this.animationTicker = function(delta, view)
	{
		if (view !== undefined)
		{
			this.view = view;
		
			this.delta = delta;
			this.ticker = (this.previousState == this.view.animationState)?(this.ticker + delta):(0);
			this.previousState = this.view.animationState;
		
			if (this.view.animationState == 1)
			{
				this.scenario1();
			} else
			if (this.view.animationState == 2)
			{
				this.scenario2();
			} 			
			if (this.view.animationState == 5)
			{
				this.scenario5();
			} 
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
		this.flyFromDeck(this.view.scene["card6"],  1, 40, (128 + 25)*0 + 5, 550)
		this.flyFromDeck(this.view.scene["card7"], 11, 40, (128 + 25)*0 +70, 550)
		
		this.flyFromDeck(this.view.scene["card8"], 21, 40, (128 + 25)*1 + 5, 550)
		this.flyFromDeck(this.view.scene["card9"], 31, 40, (128 + 25)*1 +70, 550)

		this.flyFromDeck(this.view.scene["card10"], 41, 40, (128 + 25)*2 + 5, 550)
		this.flyFromDeck(this.view.scene["card11"],51, 40, (128 + 25)*2 +70, 550)

		this.flyFromDeck(this.view.scene["card12"],61, 40, (128 + 25)*3 + 5, 550)
		this.flyFromDeck(this.view.scene["card13"],71, 40, (128 + 25)*3 +70, 550)

		this.flyFromDeck(this.view.scene["card14"],81, 40, (128 + 25)*4 + 5, 550)
		this.flyFromDeck(this.view.scene["card15"],91, 40, (128 + 25)*4 +70, 550)		
		
		this.flyFromDeck(this.view.scene["card1"],161, 20, 650, 100);
		this.flyFromDeck(this.view.scene["card2"],151, 20, 550, 100);
		this.flyFromDeck(this.view.scene["card3"],141, 20, 450, 100);
		this.flyFromDeck(this.view.scene["card4"],131, 20, 350, 100);
		this.flyFromDeck(this.view.scene["card5"],121, 20, 250, 100);
	}
//-------------------------------------------------------------------	
	this.setXY = function(obj, x, y)
	{
		obj.x = x;
		obj.y = y;
	}

	this.scenario2 = function()
	{
		if (this.ticker<3)
		{
			this.setXY(this.view.scene["card1"], 650, 100);
			this.setXY(this.view.scene["card2"], 550, 100);
			this.setXY(this.view.scene["card3"], 450, 100);
			this.setXY(this.view.scene["card4"], 350, 100);
			this.setXY(this.view.scene["card5"], 250, 100);
				
			this.setXY(this.view.scene["card6"], 5, 550);
			this.setXY(this.view.scene["card7"], 70, 550);
				
			this.setXY(this.view.scene["card8"], 158, 550);
			this.setXY(this.view.scene["card9"], 223, 550);
				
			this.setXY(this.view.scene["card10"], 311, 550);
			this.setXY(this.view.scene["card11"], 376, 550);

			this.setXY(this.view.scene["card12"], 464, 550);
			this.setXY(this.view.scene["card13"], 529, 550);

			this.setXY(this.view.scene["card14"], 617, 550);
			this.setXY(this.view.scene["card15"], 682, 550);
		}
	}	
//-------------------------------------------------------------------
	this.scenario5 = function()
	{
		this.animationTween(this.view.scene["card16"], "alpha",  1, 50 ,0 ,0.5);
		this.animationTween(this.view.scene["card17"], "alpha", 21, 50 ,0 ,0.5);
		this.animationTween(this.view.scene["card18"], "alpha", 41, 50 ,0 ,0.5);
		this.animationTween(this.view.scene["card19"], "alpha", 51, 50 ,0 ,0.5);
		this.animationTween(this.view.scene["card20"], "alpha", 81, 50 ,0 ,0.5);
	}
}
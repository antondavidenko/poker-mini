var GameModel = function()
{
	this.hand = {pockets:[], table:[]}
	this.buttonStates = ["deal","check","check","check","redeal"];
	this.stepStates = ["","Pre-flop","Flop","Turn","River",""]; //Showdown
	this.currentState = 0;
	this.currentHand = 0;
	
	this.winnerId;	
	this.strongest;
	this.handComboId;
	this.handPower;
	
	this.choseStep = false;
	
	this.predifined = [];
	
	this.getRandomHand = function()
	{
		var deck = new DeckModel();
		var tmpPocket;
		deck.resetDeck()
		this.hand.table = [];
		this.hand.pockets = [];
		var i;
		
		for(i=0; i<5; i++)
		{
			this.hand.table.push(deck.drawCard());
		}
		for(i=0; i<5; i++)
		{
			tmpPocket = [];
			tmpPocket.push(deck.drawCard());
			tmpPocket.push(deck.drawCard());
			this.hand.pockets.push(tmpPocket);
		}	
	}
	
	this.setupGame = function()
	{
		if (this.predifined[this.currentHand] === undefined)
		{
			this.getRandomHand();
		} else {
			this.hand.pockets = this.predifined[this.currentHand].pockets;
			this.hand.table = this.predifined[this.currentHand].table;
		}
		
		var hu = new HandUtils();
		var strongestData = hu.getStrongestPossibleHand(this.hand, 5);

		this.winnerId = strongestData.winnerId;
		this.strongest = strongestData.hand;
		this.handComboId = strongestData.comboId;
		this.handPower = strongestData.comboPower;
	}
	
	this.getCurerntStepPockets = function()
	{
		var res=[[],[],[],[],[]];
	
		if (this.currentState>0)
		{	
			res = this.hand.pockets;
		}
		
		return res;
	}
	
	this.getCurerntStepTable = function()
	{
		var res=[]
	
		if (this.currentState==2)
		{
			res = [this.hand.table[0],this.hand.table[1],this.hand.table[2]];	
		} else
		if (this.currentState==3)
		{
			res = [this.hand.table[0],this.hand.table[1],this.hand.table[2],this.hand.table[3]];	
		} else	
		if (this.currentState>3)
		{
			res = this.hand.table;	
		}		

		return res;
	}
	
	this.getViewData = function()
	{
		res = {}
		res.pockets = this.getCurerntStepPockets();
		res.winnerId = this.winnerId;	
		res.table = this.getCurerntStepTable();
		res.strongest = this.strongest;
		res.handComboId = this.handComboId;
		res.handPower = this.handPower;
		res.buttonState = this.buttonStates[this.currentState];
		res.handNum = (this.currentHand+1);
		res.stateNum = (this.currentState+1);
		res.stateLabel = this.stepStates[this.currentState];
		res.choseStep = this.choseStep;
		return res;
	}	
}
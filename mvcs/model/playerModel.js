var PlayerModel = function()
{
	this.selectedId = -1;
	this.ranksLabels = ["GAMER","EXPERT","SHARK"];
	this.wins = 0;
	this.winsInARow = 0;
	
	this.getPlayerInfo = function()
	{
		var res= {};
		res.selectedId = this.selectedId;
		res.wins = this.wins;
		res.winsInARow = this.winsInARow;
		
		if (this.winsInARow>5)
		{
			this.rankId = 2;
		} else 
		if (this.winsInARow>2)
		{
			this.rankId	= 1;		
		} else 
		{
			this.rankId = 0;
		}

		res.rankId = this.rankId;
		res.rankLabel = this.ranksLabels[res.rankId];
		
		return res;
	}
}
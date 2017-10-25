var HandUtils = function()
{
//------------------------------------------------------------------------------------
	this.getStrongestCombo = function(combo)
	{
		var pu = new PokerUtils();
		var maximumHand = ["As","Ks","Qs","Js","Ts"];
		var comboValue;
		var res;
	
		if (combo.length == 5) {
			comboValue = pu.getComboValue(combo);
			res = {"hand":combo, "comboId":comboValue.combo, "comboPower":comboValue.number};
		} else {
			comboValue = pu.getComboValue(maximumHand);
			res = {"hand":maximumHand, "comboId":comboValue.combo, "comboPower":comboValue.number};
		}
	
		return res;
	}
//------------------------------------------------------------------------------------
	this.getStrongestResult = function(table,pocket)
	{
		var res = this.getStrongestCombo(table);

		var i,j;		
		var tmpRes = [];

		// 1st card any pos
		for (i=0; i<table.length; i++) 
		{
			tmpRes = table.slice();
			tmpRes[i] = pocket[0];
			res = this.getStrongestHand(res, this.getStrongestCombo(tmpRes));
		}
		
		// 2nd card any pos
		for (i=0; i<table.length; i++) 
		{
			tmpRes = table.slice();
			tmpRes[i] = pocket[1];
			res = this.getStrongestHand(res, this.getStrongestCombo(tmpRes));
		}		
		
		// two cards any pos
		for (i=0; i<table.length; i++) 
		{
			for (j=0; j<table.length; j++) 
			{	
				if(i!=j)	
				{
					tmpRes = table.slice();
					tmpRes[i] = pocket[1];
					tmpRes[j] = pocket[0];
					res = this.getStrongestHand(res, this.getStrongestCombo(tmpRes));
				}
			}
		}		
		
		return res;
	}
//------------------------------------------------------------------------------------
	this.getStrongestHand = function(res1, res2)
	{
		return (res1.comboPower>res2.comboPower)?res1:res2;
	}
//------------------------------------------------------------------------------------
	this.getStrongestPossibleHand = function(hand, step)
	{	
		var res;
		var i;
		var tmpRes = [];
		
		if (step == 5) 
		{
			for (i=0; i<hand.pockets.length; i++) 
			{
				tmpRes.push(this.getStrongestResult(hand.table,hand.pockets[i]));
			}
			
			res = tmpRes[0];
			res.winnerId = 1;
				
			for (i=0; i<tmpRes.length-1; i++) 
			{
				if (res.comboPower < tmpRes[i+1].comboPower)
				{
					res = tmpRes[i+1];
					res.winnerId = (i+2);
				} else
				if (res.comboPower == tmpRes[i+1].comboPower)
				{
					res.winnerId += ","+(i+2);
				}
			}
		} else {
			res = {hand:[],comboId:"",comboPower:0,winnerId:0};
		}

		return res;
	}
}
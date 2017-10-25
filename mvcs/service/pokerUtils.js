var PokerUtils = function()
{
	this.comboIsSequence = function(combo)
	{
		var sequencesList = [	"TJQKA",
								"2JQKA",
								"23QKA",
								"234KA",
								"2345A",
								"9TJQK",
								"89TJQ",
								"789TJ",
								"6789T",
								"56789",
								"45678",
								"34567",
								"23456"];
								
		var i;
		var res = -1;
		for (i=0; i<sequencesList.length; i++) 
		{	
			if (combo == sequencesList[i])
			{
				res = i;
			}
		}

		return res+1;
	}
//------------------------------------------------------------------------------------
	this.comboStrSort = function(combo)
	{
		var cardsPower = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];
		var res = '';
		var i,j,k;

		for (j=0; j<combo.length; j++) 
		{	
			for (i=0; i<cardsPower.length; i++) 
			{
				if (combo.indexOf(cardsPower[i])>=0)
				{
					res += cardsPower[i];
					combo = combo.replace(cardsPower[i],"0");
					break;
				}
			}
		}

		return res;
	}
//------------------------------------------------------------------------------------
	this.comboToStr = function(combo)
	{
		var i;
		var res = "";
		for (i=0; i<combo.length; i++) 
		{	
			res += combo[i][0];
		}	
		return res;
	}
//------------------------------------------------------------------------------------
	this.comboTypesToStr = function(combo)
	{
		var i;
		var res = "";
		for (i=0; i<combo.length; i++) 
		{	
			res += combo[i][1];
		}	
		return res;
	}
//------------------------------------------------------------------------------------
	this.comboIsSameType = function(comboTypes)
	{
		return ((comboTypes=='ccccc')||(comboTypes=='ddddd')||(comboTypes=='hhhhh')||(comboTypes=='sssss'));
	}
//------------------------------------------------------------------------------------
	this.repeatCount = function(combo)
	{
		var res = [];
		var tmpObj = {symbol:0, repeat:1};
		var i,j,k;
		
		for (j=0; j<combo.length-1; j++)
		{	
			for (i=0; i<combo.length-1; i++) 
			{
				if ((combo[j] == combo[i+1])&&(combo[j] != "0")&&(j != (i+1)))
				{
					tmpObj.symbol = combo[j];
					tmpObj.repeat++;
				}
			}
			if (tmpObj.symbol != 0) {
				res.push(tmpObj);
				var regex = new RegExp(tmpObj.symbol, "g");		
				combo = combo.replace(regex, "0");
				tmpObj = {symbol:0, repeat:1};			
			}		
		}

		tmpObj.symbol = this.comboStrSort(combo);
		if (res.length == 0)
		{
			res.push(tmpObj);
			res.push(tmpObj);
		} else 
		{
			res.push(tmpObj);	
		}
		
		return res;
	}
//------------------------------------------------------------------------------------
	this.getCardPower = function(cardId)
	{
		var values = "23456789TJQKA";
		return values.indexOf(cardId);
	}
//------------------------------------------------------------------------------------
	this.getExtraDigital = function(s1,s2,s3,s4,s5)
	{
		return (this.getCardPower(s1)/100)+(this.getCardPower(s2)/10000)+(this.getCardPower(s3)/1000000)+(this.getCardPower(s4)/100000000)+(this.getCardPower(s5)/10000000000);
	}
//------------------------------------------------------------------------------------
	this.getHighCard = function(combo)
	{
		var number = (this.getCardPower(combo[4])-4)+this.getExtraDigital(combo[3],combo[2],combo[1],combo[0],0);
		return {'number':number, 'combo':'HighCard'};
	}

	this.isOnePair = function(info)
	{
		return (info[0].repeat == 2);
	}
	
	this.getOnePair = function(info)
	{
		var number = 9 + this.getExtraDigital(info[0].symbol, info[1].symbol.charAt(2), info[1].symbol.charAt(1), info[1].symbol.charAt(0),0);
		return {'number':number, 'combo':'One Pair'} 
	}

	this.isTwoPair = function(info)
	{
		return ((info[0].repeat == 2)&&(info[1].repeat == 2));
	}

	this.getTwoPair = function(info)
	{
		var number = 10 + this.getExtraDigital(info[1].symbol, info[0].symbol, info[2].symbol, 0,0);
		return {'number':number, 'combo':'Two Pair'}
	}	
	
	this.isSet = function(info)
	{
		return (info[0].repeat == 3);	
	}

	this.getSet = function(info)
	{
		var number = 11 + this.getExtraDigital(info[0].symbol, info[1].symbol.charAt(1), info[1].symbol.charAt(0), 0,0);		
		return {'number':number, 'combo':'Set'};	
	}	
	
	this.isStraight = function(isSequence)
	{
		return isSequence;
	}
	
	this.getStraight = function(isSequence)
	{
		var number = 12 + (13-isSequence)/100;			
		return {'number':number, 'combo':'Straight'};
	}	

	this.isFlush = function(isSameType)
	{
		return isSameType;
	}

	this.getFlush = function(combo)
	{
		var number = 13 + this.getExtraDigital(combo[4],combo[3],combo[2],combo[1],combo[0]);
		return {'number':number, 'combo':'Flush'};
	}	
	
	this.isFullHouse = function(info)
	{
		return (((info[0].repeat == 3)&&(info[1].repeat == 2))||((info[0].repeat == 2)&&(info[1].repeat == 3)));	
	}
	
	this.getFullHouse = function(info)
	{
		var number = (info[0].repeat == 3)?(14+this.getExtraDigital(info[0].symbol, info[1].symbol, 0,0,0)):(14+this.getExtraDigital(info[1].symbol, info[0].symbol, 0,0,0)) ;
		return {'number':number, 'combo':'Full House'};	
	}

	this.isQuads = function(info)
	{
		return (info[0].repeat == 4);		
	}

	this.getQuads = function(info)
	{
		var number = 15 + this.getExtraDigital(info[0].symbol, info[1].symbol, 0,0,0);			
		return {'number':number, 'combo':'Quads'};		
	}	
	
	this.isStraightFlush = function(combo)
	{
		return(combo)
	}
	
	this.getStraightFlush = function(combo)
	{
		var number = 16 + this.getExtraDigital(combo[4],combo[3],combo[2],combo[1],combo[0]);		
		return {'number':number, 'combo':'Straight Flush'};
	}

	this.isRoyalFlush = function(combo, sameType)
	{
		return ((combo == "TJQKA")&&(sameType))
	}
//------------------------------------------------------------------------------------	
	this.getComboValue = function(combo)
	{
		var res;
		var comboStr = this.comboStrSort(this.comboToStr(combo));
		var repeatInfo = this.repeatCount(comboStr);
		var isSameType = this.comboIsSameType(this.comboTypesToStr(combo))
		var isSequence = this.comboIsSequence(comboStr);

		if (this.isRoyalFlush(comboStr, isSameType))
		{
			res = {'number':17, 'combo':'Royal Flush'} //16 NO NEED DIGITS !!!
		} else 		
		if (this.isStraightFlush(isSameType&&isSequence))
		{
			res = this.getStraightFlush(comboStr)//16 +5 digits
		} else 
		if (this.isQuads(repeatInfo))
		{
			res = this.getQuads(repeatInfo) //15 +2 digits
		} else 		
		if (this.isFullHouse(repeatInfo))
		{
			res = this.getFullHouse(repeatInfo);//14 +2 digits
		} else 	
		if (this.isFlush(isSameType))
		{
			res = this.getFlush(comboStr); //13 +5 digits
		} else 		
		if (this.isStraight(isSequence))
		{
			res = this.getStraight(isSequence); //12 +1 digits
		} else 	
		if (this.isSet(repeatInfo))
		{
			res = this.getSet(repeatInfo); //11 +3 digits
		} else 
		if (this.isTwoPair(repeatInfo))
		{
			res = this.getTwoPair(repeatInfo); //10 +3 digits
		} else 
		if (this.isOnePair(repeatInfo))
		{
			res = this.getOnePair(repeatInfo); //9 +4 digits
		} else 
		{
			res = this.getHighCard(comboStr); // 1 - 8 +4 digits
		}
		return res;
	}
}
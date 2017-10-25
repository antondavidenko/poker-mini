var PokerView = function()
{
	this.animationState = 0;
	this.cards = [];
	this.qmarks = [];
	this.button;
	this.chosenId = -1;
	this.frame;
//-----------------------------------------------------------------------------
	this.drawCard = function(cont,id,x,y,alpha)
	{
		if (alpha === undefined) {
			alpha = 1;
		}
		var card = PIXI.Sprite.fromImage(id);
		card.y = y;  
		card.x = x;
		card.scale.x *= 1/2;
		card.scale.y *= 1/2;
		card.alpha = alpha;	
		cont.addChild(card);
		
		return card;
	}	
//-----------------------------------------------------------------------------	
	this.getCardId = function(cardId)
	{
		res = cardId;
		
		if (cardId === undefined) {
			cardId = "card-back-red";
		}
		
		return cardId+".png";
	}
//-----------------------------------------------------------------------------	
	this.drawAvatars = function(container, renderData)
	{
		var emotions = [];
		if (renderData.stateNum == 5)
		{
			emotions = ["","lose","lose","lose","lose","lose"];
			for (i=1; i<=5; i++)
			{
				if (renderData.winnerId.toString().indexOf(i)>-1)
				{
					emotions[i] = "win";
				}
			}
		}
		else
		{
			emotions = ["","ingame","ingame","ingame","ingame","ingame"];
		}
	
		var i;
		for (i=1; i<=5; i++)
		{
			var avatar = PIXI.Sprite.fromImage(i+emotions[i]+'.jpg');
			avatar.x = 10+(128+25)*(i-1);
			avatar.y = 420;
			container.addChild(avatar);
		}
	}		
//-----------------------------------------------------------------------------	
	this.drawFrames = function(container, renderData, playerData)
	{
		var frame;
		var frameId;
		this.qmarks = [];
		
		if (renderData.choseStep)
		{		
			for (i=1; i<=5; i++)
			{
				frame = PIXI.Sprite.fromImage('qmark.png');
				frame.x = 10-13+(128+25)*(i-1);;
				frame.y = 420-13;		
				frame.interactive = true;
				frame.buttonMode = true;
				frame.on('pointerdown', onQmarkClick);
				frame.nameId = i;
				frame.viewContext = this;
				container.addChild(frame);
				this.qmarks.push(frame);

				frame = PIXI.Sprite.fromImage('empty.png');
				frame.x = 10-13+(128+25)*(i-1);;
				frame.y = 420-13;		
				frame.interactive = true;
				frame.buttonMode = true;
				frame.on('pointerdown', onQmarkClick);
				frame.nameId = i;
				frame.viewContext = this;
				container.addChild(frame);
			}		
		} else 
		if (renderData.stateNum == 5)
		{
			frameId = (renderData.winnerId.toString().indexOf(playerData.selectedId)>-1)?"selectedg":"selectedr";
			frame = PIXI.Sprite.fromImage(frameId+'.png');
			frame.x = 10-13+(128+25)*(playerData.selectedId-1);;
			frame.y = 420-13;		
			container.addChild(frame);
		} 
		else if (playerData.selectedId>0) 
		{
			frame = PIXI.Sprite.fromImage('selectedw.png');
			frame.x = 10-13+(128+25)*(playerData.selectedId-1);
			this.chosenId = playerData.selectedId;
			frame.y = 420-13;		
			container.addChild(frame);
		}			

		function onQmarkClick() 
		{
			if (this.viewContext.frame == undefined ) {
				this.viewContext.frame = PIXI.Sprite.fromImage('selectedw.png');
				this.viewContext.frame.y = 420-13;		
			}
			this.viewContext.frame.x = 10-13+(128+25)*(this.nameId-1);
			container.addChild(this.viewContext.frame);

			this.viewContext.button.interactive = true;
			this.viewContext.button.buttonMode = true;
			this.viewContext.button.alpha = 1;
			this.viewContext.chosenId = this.nameId;
			
			var i;
			for (i=0; i<5; i++)
			{
				this.viewContext.qmarks[i].visible = false;
			}				
		}
	}
//-----------------------------------------------------------------------------	
	this.drawWinner = function(container, renderData)
	{
		var winner;
		if (renderData.stateNum == 5)
		{		
			for (i=1; i<=5; i++)
			{
				if (renderData.winnerId.toString().indexOf(i)>-1)
				{
					winner = PIXI.Sprite.fromImage('winner.png');
					winner.x = 10-13+(128+25)*(i-1);;
					winner.y = 420-13;
					container.addChild(winner);						
				}
			}		
		}
	}
//-----------------------------------------------------------------------------	
	this.drawAllCards = function(container, renderData)
	{
		this.drawCard(container,this.getCardId(undefined),860,20)		

		this.cards.push(this.drawCard(container,this.getCardId(renderData.table[4]),650,100));
		this.cards.push(this.drawCard(container,this.getCardId(renderData.table[3]),550,100));
		this.cards.push(this.drawCard(container,this.getCardId(renderData.table[2]),450,100));
		this.cards.push(this.drawCard(container,this.getCardId(renderData.table[1]),350,100));
		this.cards.push(this.drawCard(container,this.getCardId(renderData.table[0]),250,100));	

		for (i=0; i<5; i++)
		{
			this.cards.push(this.drawCard(container,this.getCardId(renderData.pockets[i][0]),(128 + 25)*i + 5,550));	
			this.cards.push(this.drawCard(container,this.getCardId(renderData.pockets[i][1]),(128 + 25)*i + 70,550));			
		}
		
		if (renderData.stateNum == 5)
		{
			this.cards.push(this.drawCard(container,this.getCardId(renderData.strongest[4]),650,230, 0.5));
			this.cards.push(this.drawCard(container,this.getCardId(renderData.strongest[3]),550,230, 0.5));
			this.cards.push(this.drawCard(container,this.getCardId(renderData.strongest[2]),450,230, 0.5));
			this.cards.push(this.drawCard(container,this.getCardId(renderData.strongest[1]),350,230, 0.5));
			this.cards.push(this.drawCard(container,this.getCardId(renderData.strongest[0]),250,230, 0.5));
			
			var basicText = new PIXI.Text(renderData.handComboId+"\n                                                           ",{fill:0xFFFFFF, align:'center'});
			basicText.x = 270;
			basicText.y = 200;
			container.addChild(basicText);			
		}
	}	
//-----------------------------------------------------------------------------	
	this.renderTable = function(renderData, playerData, btn_callback)
	{
		this.chosenId = -1;

		this.animationState = renderData.stateNum;
		this.cards = [];
		
		var container = new PIXI.Container();
		app.stage.addChild(container);	
	
		var table = PIXI.Sprite.fromImage('img/table_blank.png');
		table.scale.x *= 2;
		table.scale.y *= 2;	
		container.addChild(table);
		
		this.button =  PIXI.Sprite.fromImage('img/btn_'+renderData.buttonState+'.png');
		this.button.x = 790;
		this.button.y = 550;	
		container.addChild(this.button);	
		
		this.drawWinner(container, renderData);
		
		this.drawAvatars(container, renderData);
		
		this.drawAllCards(container, renderData);
		
		this.drawFrames(container, renderData, playerData);
		
		var basicText = new PIXI.Text('GAME '+renderData.handNum+'\n'+renderData.stateLabel,{fill:0xFFFFFF, align:'center'});
		basicText.x = 800;
		basicText.y = 480;
		container.addChild(basicText);
		
		var basicText = new PIXI.Text('WIN IN A ROW: '+playerData.winsInARow+'\nRANK: '+playerData.rankLabel,{fill:0xFFFFFF, align:'left'});
		basicText.x = 10;
		basicText.y = 10;
		container.addChild(basicText);		

		if (renderData.choseStep)
		{		
			this.button.alpha = 0.5;
		} else 
		{
			this.button.interactive = true;
			this.button.buttonMode = true;			
		}
		this.button.on('pointerdown', onClick);
		this.button.viewContext = this;

		function onClick () 
		{
			btn_callback.call(this, this.viewContext.chosenId);
			container.removeChildren();
			container.destroy();
		}
	}
}
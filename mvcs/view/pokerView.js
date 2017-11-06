var PokerView = function()
{
	this.animationState = 0;
	this.chosenId = -1;
//-----------------------------------------------------------------------------	
	this.updateAllCards = function(renderData)
	{
		this.scene["card1"].texture = this.getCardTexture(renderData.table[4]);
		this.scene["card2"].texture = this.getCardTexture(renderData.table[3]);
		this.scene["card3"].texture = this.getCardTexture(renderData.table[2]);
		this.scene["card4"].texture = this.getCardTexture(renderData.table[1]);
		this.scene["card5"].texture = this.getCardTexture(renderData.table[0]);
	
		this.scene["card6"].texture = this.getCardTexture(renderData.pockets[0][0]);
		this.scene["card7"].texture = this.getCardTexture(renderData.pockets[0][1]);

		this.scene["card8"].texture = this.getCardTexture(renderData.pockets[1][0]);
		this.scene["card9"].texture = this.getCardTexture(renderData.pockets[1][1]);

		this.scene["card10"].texture = this.getCardTexture(renderData.pockets[2][0]);
		this.scene["card11"].texture = this.getCardTexture(renderData.pockets[2][1]);

		this.scene["card12"].texture = this.getCardTexture(renderData.pockets[3][0]);
		this.scene["card13"].texture = this.getCardTexture(renderData.pockets[3][1]);

		this.scene["card14"].texture = this.getCardTexture(renderData.pockets[4][0]);
		this.scene["card15"].texture = this.getCardTexture(renderData.pockets[4][1]);

		if	(renderData.stateNum != 5)
		{
			this.scene["card16"].visible = false;
			this.scene["card17"].visible = false;
			this.scene["card18"].visible = false;
			this.scene["card19"].visible = false;
			this.scene["card20"].visible = false;
		} else {
			this.scene["card16"].visible = true;
			this.scene["card17"].visible = true;
			this.scene["card18"].visible = true;
			this.scene["card19"].visible = true;
			this.scene["card20"].visible = true;

			this.scene["card16"].texture = this.getCardTexture(renderData.strongest[0]);
			this.scene["card17"].texture = this.getCardTexture(renderData.strongest[1]);
			this.scene["card18"].texture = this.getCardTexture(renderData.strongest[2]);
			this.scene["card19"].texture = this.getCardTexture(renderData.strongest[3]);
			this.scene["card20"].texture = this.getCardTexture(renderData.strongest[4]);
		}		
	}
	
	this.getCardTexture = function(id)
	{
		id = (id !== undefined)?id:"card-back";
		return this.textures[id];
	}
//-----------------------------------------------------------------------------
	this.updateFrames = function(renderData, playerData)
	{
		var frame;
		var textureId;
		
		for (i=1; i<=5; i++)
		{
			frame = this.scene["qmark"+i];
			frame.visible = renderData.choseStep;
			if (renderData.choseStep) 
			{
				frame.texture = this.textures["qmark"];
			}
		}
		
		this.scene["frame"].visible = (playerData.selectedId>0);
		if (renderData.stateNum == 5)
		{
			textureId = (renderData.winnerId.toString().indexOf(playerData.selectedId)>-1)?"selectedg":"selectedr";
			this.scene["frame"].texture = this.textures[textureId];
		}		
	}
//-----------------------------------------------------------------------------
	this.updateAvatars = function(renderData)
	{
		var frame;
		var textureId;
		
		for (i=1; i<=5; i++)
		{
			frame = this.scene["avatar"+i];
			if (renderData.stateNum == 5) 
			{
				textureId = (renderData.winnerId.toString().indexOf(i)>-1)?"win":"lose";			
				frame.texture = this.textures[i+textureId];
			} else {
				frame.texture = this.textures[i+"ingame"];
			}
		}
	}
//-----------------------------------------------------------------------------
	this.updateWinner = function(renderData)
	{
		var frame;
	
		for (i=1; i<=5; i++)
		{	
			frame = this.scene["winner"+i];
			if	(renderData.stateNum != 5)
			{
				frame.visible = false;
			} else {
				frame.visible = (renderData.winnerId.toString().indexOf(i)>-1);
			}
		}
	}	
//-----------------------------------------------------------------------------	
	this.initQmarks = function()
	{
		var frame;
		
		for (i=1; i<=5; i++)
		{
			frame = this.scene["qmark"+i];
			frame.interactive = true;
			frame.buttonMode = true;
			frame.on('pointerdown', onQmarkClick);
			frame.nameId = i;
			frame.viewContext = this;
		}		

		function onQmarkClick() 
		{
			this.viewContext.scene["frame"].visible = true;
			this.viewContext.scene["frame"].texture = this.viewContext.textures["selectedw"];
			this.viewContext.scene["frame"].x = 10-13+(128+25)*(this.nameId-1);

			this.viewContext.scene["button"].interactive = true;
			this.viewContext.scene["button"].buttonMode = true;
			this.viewContext.scene["button"].alpha = 1;
			this.viewContext.chosenId = this.nameId;
			
			var i;
			for (i=1; i<=5; i++)
			{
				this.viewContext.scene["qmark"+i].texture = this.viewContext.textures["empty"];
			}
		}
	}	
//-----------------------------------------------------------------------------
	this.init = function(btn_callback)
	{
		app.stage.addChild(this.container);

		this.initQmarks();
		
		this.scene["button"].interactive = true;
		this.scene["button"].buttonMode = true;		
		this.scene["button"].on('pointerdown', onClick);
		this.scene["button"].viewContext = this;

		function onClick () 
		{
			btn_callback.call(this, this.viewContext.chosenId);
		}
	}
//-----------------------------------------------------------------------------
	this.renderTable = function(renderData, playerData)
	{
		this.chosenId = (playerData.selectedId>0)?playerData.selectedId:-1;

		this.animationState = renderData.stateNum;
		
		this.updateWinner(renderData);
		this.updateAvatars(renderData);
		this.updateAllCards(renderData);
		this.updateFrames(renderData, playerData);			

		this.scene["button"].texture = this.textures[renderData.buttonState];
		this.scene["bottomText"].text = 'GAME '+renderData.handNum+'\n'+renderData.stateLabel;
		this.scene["topText"].text = 'WIN IN A ROW: '+playerData.winsInARow+'\nRANK: '+playerData.rankLabel;
		this.scene["comboText"].text = (renderData.stateNum == 5)?renderData.handComboId+"\n                                                           ":"";
		
					
		if (renderData.choseStep)
		{		
			this.scene["button"].alpha = 0.5;
			this.scene["button"].interactive = false;
			this.scene["button"].buttonMode = false;				
		} else 
		{
			this.scene["button"].interactive = true;
			this.scene["button"].buttonMode = true;			
		}
	}
}
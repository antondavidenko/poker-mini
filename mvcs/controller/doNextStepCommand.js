doNextStepCommand = function (gameModel,playerModel,selectedId)
{
	playerModel.selectedId = selectedId;
	gameModel.currentState++;
	
	if ( ((gameModel.currentState == 1)&&(playerModel.rankId == 2)) || 
		 ((gameModel.currentState == 2)&&(playerModel.rankId == 1)) ||
	     ((gameModel.currentState == 3)&&(playerModel.rankId == 0)) )
	{
		gameModel.choseStep = true;
	} else 
	{
		gameModel.choseStep = false;
	}

	if (gameModel.currentState >= 5)
	{
		gameModel.currentState=0;
		gameModel.currentHand++;
		gameModel.setupGame();
		playerModel.selectedId = -1;
	}
	
	if (gameModel.currentState == 4)
	{
		playerModel.winsInARow = (gameModel.winnerId.toString().indexOf(playerModel.selectedId)>-1)?(playerModel.winsInARow+1):(0);
	}	
}
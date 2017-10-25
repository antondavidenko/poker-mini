doNextStepCommand = function (gm,pm,selectedId)
{
	pm.selectedId = selectedId;
	gm.currentState++;
	
	if ( ((gm.currentState == 1)&&(pm.rankId == 2)) || 
		 ((gm.currentState == 2)&&(pm.rankId == 1)) ||
	     ((gm.currentState == 3)&&(pm.rankId == 0)) )
	{
		gm.choseStep = true;
	} else 
	{
		gm.choseStep = false;
	}

	if (gm.currentState >= 5)
	{
		ga('send', 'event', 'MINI-POKER-V3', 'PLAY', 'START-GAME');
		gm.currentState=0;
		gm.currentHand++;
		gm.setupGame();
	}
	
	if (gm.currentState == 4)
	{
		pm.winsInARow = (gm.winnerId.toString().indexOf(pm.selectedId)>-1)?(pm.winsInARow+1):(0);
		ga('send', 'event', 'MINI-POKER-V3', 'PLAY', 'WIN-IN-A-ROW-'+pm.winsInARow);
	}	
}
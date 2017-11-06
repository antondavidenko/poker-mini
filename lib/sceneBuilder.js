var sceneBuilder = function(viewObj, sceneJSON)
{
	var container = new PIXI.Container();
	var textures = {};
	var scene = [];

	this.createSprite = function(spriteData)
	{
		var sprite;
		if (spriteData.image) {sprite= new PIXI.Sprite.fromImage(spriteData.image);}
		if (spriteData.texture) {sprite= new PIXI.Sprite(textures[spriteData.texture]);}
		if (spriteData.scalex) {sprite.scale.x *= spriteData.scalex;}
		if (spriteData.scaley) {sprite.scale.y *= spriteData.scaley;}
		if (spriteData.setx) {sprite.x = spriteData.setx;}
		if (spriteData.sety) {sprite.y = spriteData.sety;}
		if (spriteData.alpha) {sprite.alpha = spriteData.alpha;}		
		container.addChild(sprite);
		scene[spriteData.name] = sprite;
	}	
	
	this.createText = function(textData)
	{
		var text = new PIXI.Text(textData.text, textData.params);
		if (textData.setx) {text.x = textData.setx;}
		if (textData.sety) {text.y = textData.sety;}
		container.addChild(text);
		scene[textData.name] = text;
	}	
	
	var i;
	for (i=0; i<sceneJSON.textures.length; i++)
	{
		textures[sceneJSON.textures[i].name] = PIXI.Texture.fromImage(sceneJSON.textures[i].img);
	}	
	
	for (i=0; i<sceneJSON.scene.length; i++)
	{
		if (sceneJSON.scene[i].type == "sprite") 
		{
			this.createSprite(sceneJSON.scene[i]);
		} else
		if (sceneJSON.scene[i].type == "text") 
		{
			this.createText(sceneJSON.scene[i]);
		}
	}
	
	viewObj.scene = scene;
	viewObj.container = container;
	viewObj.textures = textures;
	
	return viewObj;
}
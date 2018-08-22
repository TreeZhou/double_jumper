class MushroomSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        // console.log('123');
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'mushroom_up':'mushroom1_png',
            'mushroom_down':'mushroom2_png'
        }
    }
}
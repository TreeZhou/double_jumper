class SticketSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'soilStick':'soilStick_png',
            'stoneStick':'stoneStick_png',
            'leafStick':'leafStick_png',
            'cloudDefault':'cloud_default_png'
        }
    }
}
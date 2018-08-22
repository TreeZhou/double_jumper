class SpideWebSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'spideWeb':'spiderWeb_png'
        }
    }
}
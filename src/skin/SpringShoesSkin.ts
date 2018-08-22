class SpringShoeSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'springShoeSkin':'springShoe_png'
        }
    }
}
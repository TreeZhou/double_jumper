class MagicWangSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'magicWang':'magicWang_png'
        }
    }
}
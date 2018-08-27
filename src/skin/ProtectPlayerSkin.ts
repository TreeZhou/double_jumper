class ProtectPlayerSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'protectionCover':'protectionCover_png'
        }
    }
}
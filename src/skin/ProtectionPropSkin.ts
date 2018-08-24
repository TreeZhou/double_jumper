class ProtectionPropSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'protectionProp':'protection_stage_default_png'
        }
    }
}
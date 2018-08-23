class MonsterSkin extends BaseSkin {
    public constructor(skinObjName:string) {
		super();
        this.createSkinImg(skinObjName);
	}
    public skinList:Object = {
        'default':{
            'greenBigMonster':'bigGreenMonster_png',
            'purpleSmallMonster':'smallPurpleMonster_png'
        }
    }
}
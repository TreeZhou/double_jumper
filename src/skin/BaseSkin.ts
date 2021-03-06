class BaseSkin extends  eui.Component implements  eui.UIComponent { 
	public constructor() {
		super();
	}
	public baseImg:egret.Bitmap;
	public skinType:string='default';
	public skinList:Object = {
        'default':{
    
        }
    }
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	
	}

	
	public setSkinSource(skinImg){
		this.baseImg = new egret.Bitmap();
		this.baseImg.texture = RES.getRes(skinImg);
		this.width = this.baseImg.width;
		this.height = this.baseImg.height;
		this.addChild(this.baseImg);
	}
	public changeSkinTexture(skinImg) {
		this.baseImg.texture = RES.getRes(skinImg);
		this.width = this.baseImg.width;
		this.height = this.baseImg.height;
	}
	public getSkinID(skinObjName){
        let skinID = this.skinList[this.skinType][skinObjName];
        return skinID;
    }


    public createSkinImg(skinObjName){
        let skinID = this.getSkinID(skinObjName);
        this.setSkinSource(skinID);
    }
    public changeBaseImg(skinObjName){
        let skinID = this.getSkinID(skinObjName);
        this.changeSkinTexture(skinID);
    }
	public getSkinID2(skinObjName,sideName){
        let skinID = this.skinList[this.skinType][skinObjName][sideName];
        return skinID;
    }
    public createSkinImg2(skinObjName,sideName){
        let skinID = this.getSkinID2(skinObjName,sideName);
        this.setSkinSource(skinID);
    }
    public changeBaseImg2(skinObjName,sideName){
        let skinID = this.getSkinID2(skinObjName,sideName);
        this.changeSkinTexture(skinID);
    }
}
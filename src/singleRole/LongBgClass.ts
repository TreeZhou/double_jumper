class LongBgClass extends eui.Component {
    constructor(){
        super();
        this.createrLongSkin();
        this.setLongBgSkin('longBg_default');
        this.setInitSkinPosition();
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
	}
    // public bmp1:egret.Bitmap;
    // public bmp2:egret.Bitmap;
    public bmpSkin1:LongBgSkin;
    public bmpSkin2:LongBgSkin;
    public bgHeight:number;

    public createrLongSkin(){
        this.bmpSkin1 = new LongBgSkin('longBg_default');
        this.bmpSkin2 = new LongBgSkin('longBg_default');
        this.addChild(this.bmpSkin1);
        this.addChild(this.bmpSkin2);
    }

    /**
     * 改变皮肤
     * @param skinName
     */
    public setLongBgSkin(skinName:string):void {
        this.bmpSkin1.changeBaseImg(skinName);
        this.bmpSkin2.changeBaseImg(skinName);
        this.bgHeight = this.bmpSkin1.height;
    } 
    /**
     * 初始化设置皮肤的位置
     */
    public setInitSkinPosition(){
        this.bmpSkin1.$y = 0;
        this.bmpSkin2.$y = -this.bgHeight;
    }
    /**
     * 序列帧移动
     */
    public run(_moveNum){
        if(this.bmpSkin1.$y>this.bgHeight) {
            this.bmpSkin1.$y = this.bmpSkin2.$y - this.bgHeight;
        }
        if(this.bmpSkin2.y >this.bgHeight) {
            this.bmpSkin2.y = this.bmpSkin1.y - this.bgHeight;
        }
        this.bmpSkin1.y += _moveNum;
        this.bmpSkin2.y += _moveNum;
    }
    /**
     * 游戏结束时的移动
     */
    public runDown(_moveNum){
        if(this.bmpSkin1.$y<-this.bgHeight) {
            this.bmpSkin1.$y = this.bmpSkin2.$y+this.bgHeight;
        }
        if(this.bmpSkin2.y <-this.bgHeight) {
            this.bmpSkin2.y = this.bmpSkin1.y+this.bgHeight;
        }
        this.bmpSkin1.y -= _moveNum;
        this.bmpSkin2.y -= _moveNum;
    }
}
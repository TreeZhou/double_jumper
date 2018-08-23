class BaseProps extends BasePage {
    constructor(){
        super();
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        this.caculateJumpDistance();

	}
    public mySkinObj:any; // 生成的皮肤
    public JUMP_DISTANCE:number = 120;
    private setPropsXY(referStick:any) {
		let randomNum = Math.random();
		let itemX =0;

		if(randomNum>0.5) {
			itemX = 10;
		}else {
			itemX = referStick.width-this.width-10;
		}
		return itemX;
	}
    public setChildXY(sticketObj){
        this.x = this.setPropsXY(sticketObj);
        this.y = -this.height;

    }
    private caculateJumpDistance(){
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    }
    /**
     * 生成道具皮肤
     */
    public createPropSkin(cliClass,skinName){
        this.mySkinObj = new cliClass(skinName);
        this.addChild(this.mySkinObj);
        this.width = this.mySkinObj.width;
        this.height = this.mySkinObj.height;
    }
    /**
     * 每个道具各自的技能点
     */
    public sticketSelfSkill(){
        
    }
    
}
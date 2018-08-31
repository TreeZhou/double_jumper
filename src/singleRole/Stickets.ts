class Stickets extends BasePage  {
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
        this.setInitData();
	}

    public HIT_TYPE = 'sticket';


    public MOVE_STATUS:string = 'fixation';
    public MOVE_FIXATION:string = 'fixation'; // 固定不动
    public MOVE_HORZONTAL:string = 'horzontal'; //  水平移动
    public MOVE_VERTICAL:string = 'vertical';  // 垂直移动

    private addSpeed:number=2; //左右恒定的加速度 
	private nowSpeed:number=2; //左右的速度

    private verAddSpeed:number=2;  // 垂直恒定加速度
    private verNowSpeed:number=2; // 垂直速度
    public  verDistance:number=150; // 垂直的位移
    public JUMP_DISTANCE:number = 80;

    public myClipSkinObj:any;
    public mySticketSkin:any;


    private setInitData(){
        this.setInitHorzontalData();
        this.caculateJumpDistance();
    }
    private setInitHorzontalData() {
		let random = Math.random();
		if(random>0.5) {
			this.nowSpeed = this.addSpeed;
            this.verNowSpeed = this.verAddSpeed;
		}else {
			this.nowSpeed = -this.addSpeed;
            this.verNowSpeed = -this.verAddSpeed;
		}
	}
    private caculateJumpDistance(){
        this.JUMP_DISTANCE = this.changeToPixel(this.JUMP_DISTANCE);
    }
    /**
     * 水平移动
     */
    public horzontalMove(){ 
        if(this.MOVE_STATUS === this.MOVE_HORZONTAL) {
            if(this.x+this.width>=this.stage.$stageWidth) {
                this.nowSpeed = -this.addSpeed;
            }else if(this.x<=0){
                this.nowSpeed = this.addSpeed;
            }
            this.x = this.x+this.nowSpeed;
        }
    }
    /**
     * 垂直移动
     */
    public verticalMove(){ 
        let item = this.$children[0];
        if(this.MOVE_STATUS ===  this.MOVE_VERTICAL) {
            if(item.$y>=this.verDistance) {
                this.verNowSpeed = - this.verAddSpeed;
            }else if(item.$y<=0) {
                this.verNowSpeed = this.verAddSpeed;
            }
            item.$y = item.$y+this.verNowSpeed;
    
        }
    }
    /**
     * 设置运动的状态
     */
    public setStickNormalMoveStatus(moveStatus){  
        switch(moveStatus){
            case this.MOVE_VERTICAL:
            this.MOVE_STATUS = this.MOVE_VERTICAL;
            break;
            case this.MOVE_HORZONTAL:
            this.MOVE_STATUS = this.MOVE_HORZONTAL;
            break;
            default:
            this.MOVE_STATUS = this.MOVE_FIXATION;
            break;
        }
    } 
    
    /**
     * 生成无序列帧跳板皮肤
     */
     public createSticketSkin(skinName){
        this.mySticketSkin = new SticketSkin(skinName);
        this.addChild(this.mySticketSkin);
        this.width = this.mySticketSkin.width;
        this.height = this.mySticketSkin.height;
     }
    /**
      * 生成有序列帧的跳板水皮肤
      */
    public createMovieClipSticket(cliClass){
        this.myClipSkinObj = new cliClass();
        this.addChild(this.myClipSkinObj);
        this.width = this.myClipSkinObj.width;
        this.height = this.myClipSkinObj.height;
    }
    /**
     * 每个跳板各自的技能点
     */
    public sticketSelfSkill(){
        
    }
    /**
     * 各自重置数据的函数
     */
    public resertData(){
        this.visible = true;
    }
}
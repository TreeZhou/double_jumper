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
    public MOVE_STATUS:string = 'fixation';
    public MOVE_FIXATION:string = 'fixation'; // 固定不动
    public MOVE_HORZONTAL:string = 'horzontal'; //  水平移动
    public MOVE_VERTICAL:string = 'vertical';  // 垂直移动

    private addSpeed:number=2; //左右恒定的加速度 
	private nowSpeed:number=2; //左右的速度

    private verAddSpeed:number=3;  // 垂直恒定加速度
    private verNowSpeed:number=3; // 垂直速度
    public  verDistance:number=50; // 垂直的位移
    private initY:number; // 垂直移动时的初始位置
    public JUMP_DISTANCE:number = 80;

    public myClipSkinObj:any;


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
        if(this.MOVE_STATUS ===  this.MOVE_VERTICAL) {
            if(!this.initY && this.initY!==0) {
                this.initY = this.y;
            }
            if((this.y+this.height)>=(this.initY+this.verDistance)) {
                this.verNowSpeed = - this.verAddSpeed;
            }else if(this.y<=(this.initY-this.verDistance)) {
                this.verNowSpeed = this.verAddSpeed;
            }
            this.y = this.y+this.verNowSpeed;
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
        let sticket = new SticketSkin(skinName);
        this.addChild(sticket);
        this.width = sticket.width;
        this.height = sticket.height;
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
}
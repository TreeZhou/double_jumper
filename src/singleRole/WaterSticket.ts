class WaterSticket extends Stickets {
    constructor(){
        super();
        this.createMovieClipSticket(WaterSticketSkin);
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        this.randomStatus();
      
	}
    public resertData(){
        this.visible = true;
        this.myClipSkinObj.movePesticide.gotoAndStop(1);

    }
    private randomStatus(){
        let random = Math.random();
        if(random>0.6) {
            this.setStickNormalMoveStatus(this.MOVE_HORZONTAL);
        }else {
            this.setStickNormalMoveStatus(this.MOVE_FIXATION);
        }
    }
    public TYPE_NAME = 'waterSticket';
    public sticketSelfSkill(){
        let self = this;
        this.myClipSkinObj.movePesticide.play();
        this.myClipSkinObj.movePesticide.addEventListener('complete',function(){
            self.visible = false;
		},this)
    }
}
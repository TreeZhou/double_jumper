class WoodSticket extends Stickets {
    constructor(){
        super();
        this.createMovieClipSticket(WoodSticketSkin);
    }

    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        this.setStickNormalMoveStatus(this.MOVE_FIXATION);
	}
    public TYPE_NAME = 'woodSticket';
    public resertData(){
        this.visible = true;
        this.myClipSkinObj.movePesticide.gotoAndStop(1);
    }
    public sticketTimeSelfSkill(){
        let self = this;
        this.myClipSkinObj.movePesticide.play();
        this.myClipSkinObj.movePesticide.addEventListener('complete',function(){
            self.visible = false;
		},this)
    }
}
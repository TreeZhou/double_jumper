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
    public sticketSelfSkill(){
        this.myClipSkinObj.movePesticide.play();
        this.myClipSkinObj.movePesticide.addEventListener('complete',function(){
			console.log('完成啦2');
		},this)
    }
}
class CloudSticket extends Stickets {
    constructor(){
        super();
        this.createSticketSkin('cloudDefault');
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
    public TYPE_NAME = 'cloudSticket';

    public sticketSelfSkill(){
        this.visible = false;
    }
}
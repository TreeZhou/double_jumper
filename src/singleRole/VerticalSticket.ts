class VerticalSticket extends Stickets {
    constructor(){
        super();
        this.createSticketSkin('leafStick');
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();
        this.setStickNormalMoveStatus(this.MOVE_VERTICAL);
	}
    public TYPE_NAME = 'verticalSticket';
}
class LeafSticket extends Stickets {
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
        this.setStickNormalMoveStatus(this.MOVE_HORZONTAL);
	}
    public TYPE_NAME = 'leafSticket';
}
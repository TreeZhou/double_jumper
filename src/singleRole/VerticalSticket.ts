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
        this.setSkinPosition();
	}
    public TYPE_NAME = 'verticalSticket';
    public setSkinPosition(){
        let positionY = Math.random()*this.verDistance;
        this.mySticketSkin.$y = positionY;
    }
}
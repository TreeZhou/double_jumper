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
        let randomY = Math.random();
        let positionY;

        this.verAddSpeed = Math.random()*this.verAddSpeed+this.verAddSpeed/2;
        this.verNowSpeed =  this.verAddSpeed;
        if(randomY>0.5) {
            positionY = Math.random()*this.verDistance;
        }else {
            positionY = this.verDistance;
        }
        this.mySticketSkin.$y = positionY;
    }
}
class NormalSticket extends Stickets {
    constructor(){
        super();
        this.createNormalSticket();
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
    private sticketName = ['soilStick','stoneStick'];
    public TYPE_NAME = 'normalSticket';

    private createNormalSticket(){
        let random = Math.random();
        let skinName = null;
        let skinObj = null;

        if(random > 0.5) {
            skinName = this.sticketName[0];
        }else {
            skinName = this.sticketName[1];
        }
        this.createSticketSkin(skinName);
    }
}
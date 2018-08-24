class Rocket extends BaseProps {
    constructor(sticketObj){
        super();
        this.createPropSkin(RocketSkin,'rocket');
        this.setChildXY(sticketObj);
    }
    protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
    protected childrenCreated():void
	{
		super.childrenCreated();

	}
    public TYPE_NAME = 'rocketProp';
    public JUMP_DISTANCE:number = 1500;
}